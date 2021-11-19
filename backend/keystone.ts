import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { extendGraphqlSchema } from './mutations/index';
import { User } from './schemas/User';
import { Entry } from './schemas/Entry';
import { Tag } from './schemas/Tag';

const databaseUrl =
  process.env.DATABASE_URL || 'mongodb://localhost/activities-journals';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // todo add in initial roles here
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseUrl,
      // todo add data seeding here
      async onConnect(keystone) {
        console.log('connected to db');
      },
    },
    lists: createSchema({
      // schema items go in here
      User,
      Entry,
      Tag,
    }),
    // extendGraphqlSchema,
    ui: {
      // show ui only for people who pass this test
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        !!session?.data,
    },
    // todo add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id',
    }),
  })
);

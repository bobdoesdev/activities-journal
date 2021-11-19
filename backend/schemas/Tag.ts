import { text, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Tag = list({
  fields: {
    name: text({
      isRequired: true,
    }),
    user: relationship({
      ref: 'User.tags',
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'user'],
    },
  },
});

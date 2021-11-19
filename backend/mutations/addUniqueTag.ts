import { KeystoneContext } from '@keystone-next/types';
import { TagCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

async function addUniqueTag(
  root: any,
  { name }: { name: string },
  { user }: { user: ID },
  context: KeystoneContext
): Promise<TagCreateInput> {
  const sesh = context.session as Session;
  console.log(sesh);

  // 1 query current user and see if signed in
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }

  // 2 see if tag already exists associated with user
  const allUserTags = await context.lists.Tag.findMany({
    where: {
      user: { id: sesh.itemId },
      name: { name },
    },
  });

  const [existingUserTag] = allUserTags;
  if (existingUserTag) {
    console.log('tag already exists');
    return await context.lists.Tag;
  }

  // 3 if not, create
  return await context.lists.Tag.createOne({
    data: {
      name,
      user: { connect: { id: sesh.itemId } },
    },
    resolveFields: 'name, user',
  });
}

export default addUniqueTag;

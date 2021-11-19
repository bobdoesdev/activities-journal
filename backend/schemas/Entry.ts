import { text, timestamp, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Entry = list({
  // todo
  // access:

  fields: {
    title: text({
      isRequired: true,
    }),
    actualDate: timestamp({
      isRequired: true,
    }),
    notes: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    tag: relationship({
      ref: 'Tag',
      //   ui: displayMode
    }),
    user: relationship({
      ref: 'User.entries',
      ui: {
        // createView: { fieldMode: 'hidden' },
        // itemView: { fieldMode: 'read' },
      },
    }),
  },
  //   ui: {
  //     listView: {
  //       initialColumns: [ 'actualDate', 'user', 'tags'],
  //     },
  //   },
});

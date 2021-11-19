// import { useMutation, useQuery } from '@apollo/client';
// import gql from 'graphql-tag';
// import getIsoDate from '../lib/getIsoDate';
// import useForm from '../lib/useForm';
// import DisplayError from './ErrorMessage';
// import Form from './styles/Form';
// import { useUser } from './User';
// import { ALL_TAGS_QUERY } from './CreateEntry';
// import ButtonList from './styles/ButtonList';
// import CreateTag from './CreateTag';

// const SINGLE_ENTRY_QUERY = gql`
//   query SINGLE_ENTRY_QUERY($id: ID!) {
//     Entry(where: { id: $id }) {
//       id
//       title
//       notes
//       actualDate
//       tags {
//         id
//         name
//       }
//     }
//   }
// `;

// const UPDATE_PRODUCT_MUTATION = gql`
//   mutation UPDATE_PRODUCT_MUTATION(
//     $id: ID!
//     $title: String!
//     $notes: String
//     $tag: ID!
//   ) {
//     updateEntry(
//       id: $id
//       data: { title: $title, notes: $notes, tags: { connect: { id: $tag } } }
//     ) {
//       id
//       title
//       notes
//     }
//   }
// `;

// export default function UpdateEntry({ id }) {
//   const { id: userId } = useUser();

//   // get existing product
//   const { data, error, loading } = useQuery(SINGLE_ENTRY_QUERY, {
//     variables: {
//       id,
//     },
//   });

//   // get mutation to update product
//   const [
//     updateEntry,
//     { data: updateData, error: updateError, loading: updateLoading },
//   ] = useMutation(UPDATE_PRODUCT_MUTATION);

//   const { inputs, handleChange, clearForm } = useForm({
//     title: data?.Entry.title,
//     notes: data?.Entry.notes,
//     actualDate: data?.Entry.actualDate,
//     user: userId,
//     tag: data?.Entry.tags[0].id,
//   });

//   const selected = data?.Entry.tags[0].id;

//   const tagQuery = useQuery(ALL_TAGS_QUERY, {
//     variables: {
//       user: userId,
//     },
//   });

//   // form to handle update
//   // TODO fix updating tags

//   return (
//     <>
//       <Form
//         onSubmit={async (e) => {
//           e.preventDefault();

//           const res = await updateEntry({
//             variables: {
//               id,
//               title: inputs.title,
//               notes: inputs.notes,
//               tag: inputs.tag.id,
//             },
//           }).catch(console.error);
//         }}
//       >
//         <DisplayError error={updateError} />
//         <fieldset disabled={updateLoading} aria-busy={updateLoading}>
//           <h2>Update Your Entry</h2>
//           <label htmlFor="title">
//             Title
//             <input
//               type="text"
//               id="title"
//               name="title"
//               placeholder="Title"
//               value={inputs.title}
//               onChange={handleChange}
//             />
//           </label>
//           <label htmlFor="notes">
//             Notes
//             <textarea
//               id="notes"
//               name="notes"
//               placeholder="Notes"
//               value={inputs.notes}
//               onChange={handleChange}
//             />
//           </label>

//           <label htmlFor="tag">
//             Tag
//             <select name="tag" id="tag" onChange={handleChange}>
//               <option value="" defaultValue>
//                 Choose a Tag
//               </option>
//               {tagQuery.data?.allTags.map((tag) => (
//                 <option
//                   value={tag.id}
//                   key={tag.id}
//                   selected={selected === tag.id}
//                 >
//                   {tag.name}
//                 </option>
//               ))}
//             </select>
//           </label>

//           <ButtonList>
//             <button type="submit">Update Entry</button>
//             <button type="button" className="clear" onClick={clearForm}>
//               Clear form
//             </button>
//           </ButtonList>
//         </fieldset>
//         {/* <DeleteEntry id={id}>Delete Entry</DeleteEntry> */}
//       </Form>

//       <CreateTag />
//     </>
//   );
// }

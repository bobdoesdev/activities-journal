import { useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for inputs

  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    // todo handle resetting select to null
    // todo handle multiselect tags and type in tags
    // if (e.tags) {
    //   console.log(e.tags);
    //   const updatedTags = e.tags.map((tag) => tag.value);
    //   console.log(updatedTags);
    //   setInputs({
    //     // copy existing state
    //     ...inputs,
    //     tags: updatedTags,
    //   });
    // } else {

    setInputs({
      // copy existing state
      ...inputs,
      [e.target.name]: e.target.value,
    });

    console.log('fuck');
    console.log(inputs);
    // }
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => {
        if (key !== 'user' && key !== 'actualDate') {
          return [key, ''];
        }
        return [key, value];
      })
    );

    setInputs(blankState);
  }

  return { inputs, handleChange, clearForm };
}

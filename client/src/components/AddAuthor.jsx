import { useMutation, useQuery } from "@apollo/client";
import React, { useRef } from "react";
import { addAuthorMutation, getAuthorsQuery } from "../queries/queries";

const AddAuthor = () => {
  const [mutateAddAuthor] = useMutation(addAuthorMutation);
  const { refetch: refetchAuthors } = useQuery(getAuthorsQuery);

  const authorName = useRef();
  const age = useRef();

  const addAuthor = async (e) => {
    e.preventDefault();
    console.log(authorName.current.value, age.current.value);
    try {
      await mutateAddAuthor({
        variables: {
          name: authorName.current.value,
          age: parseInt(age.current.value, 10),
        },
        refetchQueries: [{ query: getAuthorsQuery }],
      });
      authorName.current.value = "";
      age.current.value = "";
      refetchAuthors();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form id="add-author">
      <div className="field">
        <label htmlFor="authorName">Author Name:</label>
        <input type="text" name="authorName" id="authorName" ref={authorName} />
      </div>

      <div className="field">
        <label htmlFor="age">Age:</label>
        <input type="number" name="age" id="age" ref={age} />
      </div>

      <button onClick={addAuthor}>Add Author</button>
    </form>
  );
};

export default AddAuthor;

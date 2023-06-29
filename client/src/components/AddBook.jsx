import { useMutation, useQuery } from "@apollo/client";
import React, { useRef } from "react";
import {
  addBookMutation,
  getAuthorsQuery,
  getBooksQuery,
} from "../queries/queries";

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const { refetch: refetchBooks } = useQuery(getBooksQuery);
  const [mutateAddBook] = useMutation(addBookMutation);

  const bookName = useRef();
  const genre = useRef();
  const authorId = useRef();

  const addBook = async (e) => {
    e.preventDefault();
    try {
      await mutateAddBook({
        variables: {
          name: bookName.current.value,
          genre: genre.current.value,
          authorId: authorId.current.value,
        },
        refetchQueries: [{ query: getBooksQuery }],
      });
      bookName.current.value = "";
      genre.current.value = "";
      authorId.current.value = "";
      refetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <option disabled>Loading Authors...</option>;
  if (error) return <option disabled>Error Loading Authors!</option>;

  return (
    <form id="add-book">
      <div className="field">
        <label htmlFor="bookName">Book Name:</label>
        <input type="text" name="bookName" id="bookName" ref={bookName} />
      </div>

      <div className="field">
        <label htmlFor="genre">Genre:</label>
        <input type="text" name="genre" id="genre" ref={genre} />
      </div>

      <div className="field">
        <label htmlFor="author">Author:</label>
        <select name="author" id="author" ref={authorId}>
          {loading ? (
            <option disabled>Loading Authors...</option>
          ) : (
            data.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))
          )}
        </select>
      </div>

      <button onClick={addBook}>+</button>
    </form>
  );
};

export default AddBook;

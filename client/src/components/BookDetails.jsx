import React from "react";
import { getBookQuery } from "../queries/queries";
import { useQuery } from "@apollo/client";

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: {
      id: bookId,
    },
  });
  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;
  const book = data.book;

  return (
    <>
      <div id="book-details">
        Book Details
        {book ? (
          <div>
            <h2>{book.name}</h2>
            <p>Genre: {book.genre}</p>
            <p>Author: {book.author.name}</p>
            <p>All books by this author: </p>
            <ul className="other-books">
              {book.author.books.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <h2>No Book is Selected</h2>
        )}
      </div>
    </>
  );
};

export default BookDetails;

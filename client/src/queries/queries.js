import { gql } from "@apollo/client";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const getBookQuery = gql`
  query ($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

const addAuthorMutation = gql`
  mutation ($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
      name
      id
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery, addAuthorMutation };

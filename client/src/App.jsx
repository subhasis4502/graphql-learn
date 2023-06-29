import AddAuthor from "./components/AddAuthor";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});


function App() {

  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ninja's Reading List</h1>
        <BookList />
        <AddBook/>
        <AddAuthor />
      </div>
    </ApolloProvider>
  );
}

export default App;

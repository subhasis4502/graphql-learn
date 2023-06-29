const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull
} = graphql;

// Dummy Data
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The Hobbit", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "To Kill a Mockingbird", genre: "Classic", id: "3", authorId: "7" },
  {
    name: "Harry Potter and the Sorcerer's Stone",
    genre: "Fantasy",
    id: "4",
    authorId: "2",
  },
  { name: "1984", genre: "Dystopian", id: "5", authorId: "" },
  { name: "The Name of the Rose", genre: "Mystery", id: "6", authorId: "3" },
  { name: "Pride and Prejudice", genre: "Classic", id: "7", authorId: "5" },
  { name: "Norwegian Wood", genre: "Fiction", id: "8", authorId: "4" },
  {
    name: "Murder on the Orient Express",
    genre: "Mystery",
    id: "9",
    authorId: "7",
  },
  { name: "The Catcher in the Rye", genre: "Fiction", id: "10", authorId: "6" },
];

var authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "J.K. Rowling", age: 56, id: "2" },
  { name: "Stephen King", age: 74, id: "3" },
  { name: "Haruki Murakami", age: 72, id: "4" },
  { name: "Jane Austen", age: 41, id: "5" },
  { name: "George Orwell", age: 46, id: "6" },
  { name: "Agatha Christie", age: 85, id: "7" },
  { name: "Neil Gaiman", age: 61, id: "8" },
  { name: "Toni Morrison", age: 88, id: "9" },
  { name: "Margaret Atwood", age: 81, id: "10" },
];

// Structure of data
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // console.log(parent);
        // return _.find(authors, { id: parent.authorId });
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
        return Book.find({ authorId: parent.id });
      },
    },
  }),
});

// The initial query that tells where to jump on the graph
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Code to get data from db
        // return _.find(books, { id: args.id });
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find();
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Author.find();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addAuthors: {
      type: new GraphQLList(AuthorType),
      args: {
        authors: {
          type: new GraphQLList(
            new GraphQLInputObjectType({
              name: "AuthorInput",
              fields: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
              },
            })
          ),
        },
      },
      resolve(parent, args) {
        const addedAuthors = args.authors.map((authorData) => {
          const author = new Author({
            name: authorData.name,
            age: authorData.age,
          });
          return author.save();
        });
        return addedAuthors;
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        console.log(args)
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

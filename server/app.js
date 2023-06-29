const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Allow cross origin req
app.use(cors());

// Connecting to database
mongoose.connect(
  "mongodb+srv://subhasis4502:test1234@cluster0.pej1f.mongodb.net/graphql-learn?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});

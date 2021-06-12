const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { ApolloServer, gql } = require("apollo-server-express");
// const { makeExecutableSchema } = require("graphql-tools");

// GraphQLのスキーマ情報
const typeDefs = gql`
type Query { books: [Book] }
type Book { title: String, author: String, price: Int }
`;

// モックデータ
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: "J.K. Rowling",
    price: 2000
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
    price: 3000
  }
];

// resolver(データ処理)の設定
// DBからデータを取得したり、APIを呼び出したりする処理もここで記述
const resolvers = {
  Query: { books: () => books }
};

// GraphQL の Schema 設定
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers
// });
///  https://www.apollographql.com/docs/apollo-server/api/apollo-server/
const server = new ApolloServer({ typeDefs, resolvers })
  // param context: An object (or a function that creates an object) that's passed to every resolver.

// Expressの初期化
const app = express();

// Cross-origin resource sharing (CORS) の設定
// const corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// server.applyMiddleware({app, cors: corsOptions})
server.applyMiddleware({ app })

// GraphQLのエンドポイントの追加
// app.use(
//   "/graphql",
//   bodyParser.json(),
//   cors(corsOptions),
//   graphqlExpress({ schema })
// );

const PORT = process.env.PORT || 4000;

// GraphiQLのエンドポイントの追加 (テストで使う GraphQLのWeb GUI)
// app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// サーバの起動
// app.listen(4000, () => {
  // console.log("Go to http://localhost:4000/graphiql to run queries!");
// });
app.listen({port: PORT}, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
});

// module.exports = app;

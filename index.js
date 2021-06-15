const express = require("express");

// Apollo Server機能のみのサーバならシンプルに構築可能
const { ApolloServer, gql } = require("apollo-server-express");

// GraphQLのスキーマ情報
const typeDefs = gql`
type Query { books: [Book] }
type Book { title: String, author: String, price: Int }
`;

// モックデータ
// 本来ならApollo Server(BFF)からバックエンド(DBやAPI)へデータを取得に行く
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
///  https://www.apollographql.com/docs/apollo-server/api/apollo-server/
const server = new ApolloServer({
  cors: false,
  typeDefs,
  resolvers
})
  // param context: An object (or a function that creates an object) that's passed to every resolver.

// Expressの初期化
const app = express();

// Cross-origin resource sharing (CORS) の設定
// フロント側はApollo ClientからのPOSTメソッド想定
const corsOptions = {
  origin: "http://localhost:3000",   // Access-Control-Allow-Origin: http://localhost:3000
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

server.applyMiddleware({app, cors: corsOptions})

// GraphiQLのエンドポイントの追加 (テストで使う GraphQLのWeb GUI)
// app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// サーバの起動
const PORT = process.env.PORT || 4000;
app.listen({ port: PORT }, () => {
  // console message when this server is started up.
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
});

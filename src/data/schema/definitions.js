export default `
  type User {
    id: String
    username: String
  }

  type Game {
    id: String
    title: String
  }

  type Query {
    games(title: String): [Game]
    user(username: String): User
  }

  schema {
    query: Query
  }
`

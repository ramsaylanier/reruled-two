export default `
  type Game {
    id: String
    title: String
  }

  type Query {
    games: [Game]
  }

  schema {
    query: Query
  }
`

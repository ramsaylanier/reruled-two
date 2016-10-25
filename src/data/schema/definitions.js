export default `
  type User {
    id: String
    username: String
  }

  type Game {
    id: String
    title: String
  }

  type Ruleset {
    id: String
    name: String
    game(title: String): Game
    author: User
    rules: [Rule]
  }

  type Rule {
    id: String
    name: String
    author: User
  }

  type Query {
    games(title: String): [Game]
    user(username: String): User
    ruleset(id: String): Ruleset
    rulesets(game: String): [Ruleset]
  }

  input UserInput {
    id: String,
    username: String
  }

  input RulesetInput {
    name: String!,
    game: String!,
    author: UserInput!
  }

  type Mutation {
    createRuleset(ruleset: RulesetInput!): Ruleset
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

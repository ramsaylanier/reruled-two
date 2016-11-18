export default `
  type User {
    id: String
    username: String
    email: String
    history: [Game]
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
    author: User
    ruleset: Ruleset
    description: String
    type: String
  }

  type Query {
    games(title: String): [Game]
    user(username: String, currentUser: String): User
    ruleset(id: String): Ruleset
    rulesets(game: String): [Ruleset]
    rule(id: String): Rule
  }

  input UserInput {
    email: String,
    password: String,
    confirmPassword: String,
    username: String
  }

  input AuthorInput {
    id: String!,
    username: String!
  }

  input RulesetInput {
    name: String!,
    game: String!,
    author: AuthorInput!
  }

  input RuleInput {
    type: String!,
    description: String!,
    ruleset: String!,
    author: AuthorInput!
  }

  type Mutation {
    createUser(user: UserInput!): User
    createRuleset(ruleset: RulesetInput!): Ruleset
    createRule(rule: RuleInput!): Rule
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

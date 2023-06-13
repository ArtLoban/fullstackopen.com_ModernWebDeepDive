const typeDefs = `
 type Book {
    id: ID!
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }
  
  type Author {
    id: ID!
    name: String
    born: Int
    bookCount: Int!
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
    allAuthors: [Author!]!
    allBooksByAuthor(author: String!): [Book!]!
    allBooksByGenre(genre: String!): [Book!]!
    allBooksByAuthorOrGenre(genre: String, author: String): [Book!]!
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

module.exports = { typeDefs }

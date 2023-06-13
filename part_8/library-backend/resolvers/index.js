const Author = require('../models/author')
const Book = require('../models/book')
const { GraphQLError } = require('graphql')

const resolvers = {
  Author: {
    bookCount: async (root) => Book.find({ author: root._id }).countDocuments()
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async () => Book.find({}).populate('author'),
    allAuthors: async () => Author.find({}),
    allBooksByAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.author });

      if (!author) {
        throw new GraphQLError('Author not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author
          }
        })
      }

      return Book.find({ author: author._id }).populate('author');
    },
    allBooksByGenre: async (root, args) => {
      return Book.find({ genres: args.genre }).populate('author')
    },
    allBooksByAuthorOrGenre: async (root, args) => {
      return Book.find({}).populate('author').then(books => {
        // If no options
        if (!args.genre && !args.author) {
          return books
        }

        // If `genre` is set
        if (args.genre && !args.author) {
          return books.filter(book => book.genres.includes(args.genre))
        }

        // If `author` is set
        if (args.author && !args.genre) {
          return books.filter(book => book.author.name === args.author)
        }

        // If `genre` and author` are set
        if (args.genre && args.author) {
          return books.filter(book => book.genres.includes(args.genre) && book.author.name === args.author)
        }

        return []
      });
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author, born: null })

        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Creating the author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }

      // Create new book
      const newBook = new Book({ ...args, author: author })

      try {
        await newBook.save()
      } catch (error) {
        throw new GraphQLError('Creating the new Book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }

      return newBook
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });

      if (!author) {
        throw new GraphQLError('Author not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      return author
    }
  }
}

module.exports = {
  resolvers
}
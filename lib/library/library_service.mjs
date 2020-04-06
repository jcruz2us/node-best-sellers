import Sequelize from "sequelize";
import {sequelize, Book, Author} from "./models.mjs";

const libraryService = {
  findAllAuthors: async function() {
      const users = await Author.findAll();
      return users.map((author) => {
          // convert from database model to POJO
          // deliberately pluck fields to avoid
          // leaking unnecessary or internal details
          return {
            author: {
                id: author.id,
                name: author.name,
            },
          };
      });
  },
  findAllBooks: async function(query) {
    query = query || "";
    const books = await Book.findAll({
        where: {
          title: {
              [Sequelize.Op.iLike]: `%${query}%`,
          }
        },
        include: Book.Author,
    });
    return books.map((book) => {
        // convert from database model to POJO
        // deliberately pluck fields to avoid
        // leaking unnecessary or internal details
        return {
          id: book.id,
          title: book.title,
          description: book.description,
          author: {
              id: book.author.id,
              name: book.author.name,
          },
        };
    });
  },
  addBook: async function(bookDetails) {
    const {title, author: name, description} = bookDetails;
    const t = await sequelize.transaction();
    try {
        const [author, authorCreated] = await Author.findOrCreate({
            defaults: {name},
            where: {
                name: {
                    [Sequelize.Op.iLike]: name
                }
            },
            transaction: t,
        });
        const [book, bookCreated] = await Book.findOrCreate({
            defaults: {
                title,
                description,
                authorId: author.id,
            },
            where: {
                title: {
                    [Sequelize.Op.iLike]: title
                },
                authorId: author.id,
            },
            transaction: t,
        });
        await t.commit();
        return [book, bookCreated];
    } catch (e) {
        await t.rollback();
        // check the exception to see if its something we can
        // recover from or gracefully handle
        // otherwise reraise exception
        throw e;
    }
  },
};

export default libraryService;
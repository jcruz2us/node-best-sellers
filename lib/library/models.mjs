import Sequelize from "sequelize";
import config from "../../config/index.mjs";


const {url: CONNECTION_STRING, dialect: DIALECT} = config.library_database;
export const sequelize = new Sequelize(CONNECTION_STRING, {dialect: DIALECT});


export const Book = sequelize.define('book', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT
});

export const Author = sequelize.define('author', {
  name: Sequelize.STRING,
});

Author.Books = Author.hasMany(Book);
Book.Author = Book.belongsTo(Author);



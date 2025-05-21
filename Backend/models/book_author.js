'use strict';

module.exports = (sequelize, DataTypes) => {
  const BookAuthor = sequelize.define('BookAuthor', {}, {
    tableName: 'book_authors',
    schema: 'books',
    timestamps: false
  });

  return BookAuthor;
};

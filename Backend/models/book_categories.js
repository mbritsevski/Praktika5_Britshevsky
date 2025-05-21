'use strict';

module.exports = (sequelize, DataTypes) => {
  const BookCategory = sequelize.define('BookCategory', {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'book_categories',
    schema: 'books',
    timestamps: false
  });

  return BookCategory;
};

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    static associate(models) {
      Author.belongsToMany(models.Book, {
        through: {
          model: 'book_authors',
          unique: false
        },
        foreignKey: 'authorId',
        otherKey: 'bookId',
        timestamps: false
      });
    }
  }

  Author.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Author',
    tableName: 'authors',
    schema: 'books',
    timestamps: false // disable createdAt/updatedAt for this table
  });

  return Author;
};

/* eslint-disable max-len */
// Migration file for adding foreign key relations
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('BookBorrowings', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'custom_fkey_userId_BookBorrowings', // Optional, you can omit this
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade', // Optional, specify the desired action on delete
      onUpdate: 'cascade', // Optional, specify the desired action on update
    });

    await queryInterface.addConstraint('BookBorrowings', {
      fields: ['BookId'],
      type: 'foreign key',
      name: 'custom_fkey_bookId_BookBorrowings', // Optional, you can omit this
      references: {
        table: 'Books',
        field: 'id',
      },
      onDelete: 'cascade', // Optional, specify the desired action on delete
      onUpdate: 'cascade', // Optional, specify the desired action on update
    });

    await queryInterface.addConstraint('BookRatings', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'custom_fkey_userId_BookRatings', // Optional, you can omit this
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade', // Optional, specify the desired action on delete
      onUpdate: 'cascade', // Optional, specify the desired action on update
    });

    await queryInterface.addConstraint('BookRatings', {
      fields: ['BookId'],
      type: 'foreign key',
      name: 'custom_fkey_bookId_BookRatings', // Optional, you can omit this
      references: {
        table: 'Books',
        field: 'id',
      },
      onDelete: 'cascade', // Optional, specify the desired action on delete
      onUpdate: 'cascade', // Optional, specify the desired action on update
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('BookBorrowings', 'custom_fkey_userId_BookBorrowings');
    await queryInterface.removeConstraint('BookBorrowings', 'custom_fkey_bookId_BookBorrowings');
    await queryInterface.removeConstraint('BookRatings', 'custom_fkey_userId_BookRatings');
    await queryInterface.removeConstraint('BookRatings', 'custom_fkey_bookId_BookRatings');
  },
};

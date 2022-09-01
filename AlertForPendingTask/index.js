const nodemailer = require('nodemailer');
const connectDB = require('../db/connect');
const { Todo } = require('../db/todoModel');
require('dotenv').config();

module.exports = async function (context, myTimer) {
  var timeStamp = new Date().toISOString();

  if (myTimer.isPastDue) {
    context.log('JavaScript is running late!');
  }

  await connectDB(process.env.MONGODB_URI);

  const todos = await Todo.find({ completed: false });
  if (todos.length > 0) {
    todos.forEach(async (todo) => {
      try {
        var transport = nodemailer.createTransport({
          host: 'smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: '33a0288a4ecab4',
            pass: '081301a18b8961',
          },
        });

        await transport.sendMail({
          from: '"Todo App" <Alert@FastAlert.com>',
          to: todo.email,
          subject: 'Todo Alert',
          text: `Hello your todo ${todo.title} is pending`,
          html: `<h1>Hello your todo ${todo.title} is pending</h1>`,
        });

        context.log(
          'AlertForPendingTask timer trigger function ran!',
          timeStamp
        );
      } catch (error) {
        context.log(error);
      }
    });
  }
};

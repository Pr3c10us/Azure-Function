const nodemailer = require('nodemailer');
const { Todo } = require('../db/todoModel');
require('dotenv').config();

module.exports = async function (context, myTimer) {
  var timeStamp = new Date().toISOString();

  if (myTimer.isPastDue) {
    var transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const todos = await Todo.find({ completed: false });
    console.log(todos);
    if (todos.length > 0) {
      todos.forEach(async (todo) => {
        try {
          await transport.sendMail({
            from: '"Todo App" <owo.pre.eno@gmail.com>',
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
    context.log(
      'No todos to alert for pending tasks',
      timeStamp
    );
  }
  context.log(
    'JavaScript timer trigger function ran!',
    timeStamp
  );
};

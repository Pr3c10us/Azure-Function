const {StatusCodes} = require('http-status-codes');
const connectDB = require('../db/connect');
const { Todo } = require('../db/todoModel');

module.exports = async function (context, req) {
    try {
        //connect to db
        await connectDB(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        //get all todos
        const todos = await Todo.find({});
        context.res = {
            status: StatusCodes.OK,
            body: {nbHits: todos.length, hits: todos},
        };
    } catch (error) {
        context.res = {
            status: StatusCodes.INTERNAL_SERVER_ERROR, /* Defaults to 200 */
            body: responseMessage
        }
    }
}
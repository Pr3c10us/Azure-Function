const {StatusCodes} = require('http-status-codes');
const connectDB = require('../db/connect');
const { validateTodo, Todo } = require('../db/todoModel');


module.exports = async function (context, req) {
    try {
        //connect to db
        await connectDB(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        //validate request body
        const { error } = validateTodo.validate(req.body);
        if (error) {
            return context.res = {
                status: StatusCodes.BAD_REQUEST,
                body: error.details[0].message,
            };
        }

        //create todo
        const todo = await Todo.create(req.body);

        //return created todo
        context.res = {
            status: StatusCodes.OK,
            body: todo,
        };
    } catch (error) {
        context.res = {
            status: StatusCodes.INTERNAL_SERVER_ERROR, /* Defaults to 200 */
            body: error.message,
        }
    }
}
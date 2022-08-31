const {StatusCodes} = require('http-status-codes');
const connectDB = require('../db/connect');
const { validateTodo, Todo } = require('../db/todoModel');


module.exports = async function (context, req) {
    try {
        
        //connect to db
        await connectDB(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        //get a todo
        const todo = await Todo.findOne({_id:req.params.id});
        
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
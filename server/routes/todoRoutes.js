import express from 'express';
import todoController from '../controller/todoContoller.js';

const router = express.Router();

//api routes
router.get("/todos", todoController.getAlltodos);
//add new todo route
router.post("/todos", todoController.addNewTodo);
//get single todo route
router.get("/todos/:id", todoController.getSingleTodo);
//update data
router.put("/todos/:id", todoController.updateTodo);
//delete data
router.delete("/todos/:id", todoController.deleteTodo);




export default router;
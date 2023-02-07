import todoModel from '../model/todoModel.js'

class todoController {

    //get all todo
    static getAlltodos = async (req,res) => {
        try {
            const fetchallTodos = await todoModel.find({});
            return res.status(200).json(fetchallTodos)
        } catch (error) {
            return res.status(400).json({message: error.message})
            
        }
    };

    //add todo
    static addNewTodo = async (req, res) => {
        const { title, isCompleted } = req.body;

        try {
            if(title && isCompleted){
                const addNewTOdo = new todoModel({
                    title,
                    isCompleted : false
                });
                //save new todo
                const savedTodo = await addNewTOdo.save();
                return res.status(200).json({message: "Todo is created"});
            }else{
                return res.status(400).json({message:"all fields are required"});
            }    
        } catch (error) {
            return res.status(400),json({message: error.message});
        }
    };

    //get a single route
    static getSingleTodo = async (req, res) => {
        const { id } =req.params;
        try {
            if(id){
                const fetchSingleTodo = await todoModel.findById(id);
                return res.status(200).json(fetchSingleTodo);
            } else {
                return res.status(400).json({message: "Invalid URL"})
            }
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    };

    //update
    static updateTodo = async (req, res) => {
        const { id } =req.params;
        try {
            if(id){
                const updateTodo = await todoModel.findByIdAndUpdate(id, req.body);
                return res.status(200).json({message: "Update Successfully"});
            } else {
                return res.status(400).json({message: "Invalid URL"});
            }
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    };

    //delete
    static deleteTodo = async (req, res) => {
        const { id } = req.params;
        try {
            if(id){
                const deleteTodo = await todoModel.findByIdAndDelete(id)
                return res.status(200).json({message: "Deleted Succssefully"})
            }else {
                return res.status(400).json({message: error.message})
            }
        } catch (error) {
            return res.status(400).json({message: error.message})
        }
    }
}

export default todoController;
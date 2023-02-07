import mongoose from "mongoose";

//todo schema
const todoSchema = new mongoose.Schema({
    title:{
        type : String
    },
    isCompleted:{
        type: String
    }
}, {timestamps: true});

const todoModel = mongoose.model("todoz" , todoSchema);

export default todoModel;

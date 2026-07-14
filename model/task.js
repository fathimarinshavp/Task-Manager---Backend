import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:String,
    description:String,
    status:{
        type:String,
        enum:["Pending","Completed"],
        default:"Pending"
    },
    dueDate:Date,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps: true})
const Task = mongoose.model("Task",taskSchema)
export default Task
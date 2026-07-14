import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from './model/user.js'
import Task from './model/task.js'

export async function Register(req,res) {
    try {
        const {name,email,password} = req.body

        if(!(name&&email&&password)){
            return res.status(400).send({msg:"Invalid input"})
        }

        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(409).send({msg:"Email already registered"})
        }

        const hashed = await bcrypt.hash(password,10)
        await User.create({
            name,
            email,
            password:hashed
        })

        return res.status(201).send({msg:"Registration successful"})

    } catch (error) {
        return res.status(500).send({msg:"Internal server error"})
    }
}

export async function Login(req,res) {
    try {
        const {email,password} = req.body
        
        const foundUser = await User.findOne({email})

        if(!foundUser){
            return res.status(404).send({msg:"Not found"})
        }
        
        const match = await bcrypt.compare(password,foundUser.password)

        if(!match){
            return res.status(401).send({msg:"Incorrect password"})
        }

        const token = jwt.sign(
            {id:foundUser.id},
            process.env.JWT_KEY,
            {expiresIn:'24h'}
        )

        return res.status(200).send({
            msg:"Login success",
            token
        })
    } catch (error) {

        return res.status(500).send({msg:"Internal server error"})
    }
}


export async function AddTask(req,res) {
    try {
        const {title,description,status,dueDate} = req.body

        if(!title){
            return res.status(400).send({msg:"Title is required"})
        }

        const task = await Task.create({
            title,
            description,
            status,
            dueDate,
            userId:req.user.id
        })

        return res.status(201).send({
            msg:"Task added",
            success:true,
            task
        })
    } catch (error) {
        return res.status(500).send({msg:"Internal server error"})
    }
}

export async function GetTask(req,res) {
    try {
        const task = await Task.find({
            userId:req.user.id
        })
        return res.status(200).send(task)

    } catch (error) {
         return res.status(500).send({msg:"Internal server error"})
    }
}

export async function DeleteTask(req,res) {
    try {
        const task = await Task.findOneAndDelete({
            _id:req.params.id,
            userId:req.user.id
        })
        if(!task){
            return res.status(404).send({msg:"Not found"})
        }
        return res.status(200).send({msg:"Task deleted successfully"})
    } catch (error) {
        return res.status(500).send({msg:"Internal server error"})
    }
}


export async function UpdateTask(req,res) {
    try {
        const updated = await Task.findOneAndUpdate(
           { _id:req.params.id,
            userId:req.user.id,
           },
           req.body,
           { new:true}
    )
        if(!updated){
            return res.status(404).send({msg:"Task not found"})
        }
        return res.status(200).send(updated)
    } catch (error) {
        return res.status(500).send({msg:"Internal server error"})
    }
}

export async function GetsingleTask(req,res) {
    try {
        const task= await Task.findOne({
            _id: req.params.id,
             userId: req.user.id,
        })
        if(!task){
            return res.status(404).send({msg:"not found"})
        }
        return res.status(200).send(task)
    } catch (error) {
        return res.status(500).send({msg:"error"})
    }
}
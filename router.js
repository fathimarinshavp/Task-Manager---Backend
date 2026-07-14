import { Router } from "express";
import auth from './middle/auth.js'
import { Register,Login,AddTask,GetTask,GetsingleTask,DeleteTask,UpdateTask } from './reqhandler.js'
const router = Router()

router.route('/Register').post(Register)
router.route('/Login').post(Login)

router.post("/tasks", auth, AddTask);
router.get("/tasks", auth, GetTask);
router.get("/tasks/:id", auth, GetsingleTask);
router.put("/tasks/:id", auth, UpdateTask);
router.delete("/tasks/:id", auth, DeleteTask);

export default router
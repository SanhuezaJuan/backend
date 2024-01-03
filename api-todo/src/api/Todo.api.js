import { Types } from "mongoose";
import { User } from "../models/User.model.js";
import { ClientError } from "../utils/ClientError.js";

const getTasks = async (req, res) => {
  const { id } = req.user;
  if (!id) {
    throw new ClientError("Identifier is empty");
  }
  const { tasks, username, ...result } = await User.findById(id);

  res.status(200).json({
    error: false,
    username,
    data: tasks,
  });
};

const createTask = async (req, res) => {
  const { title, description, completed } = req.body;

  const { id, username } = req.user;

  const USER = await User.findOne({ username });

  const tasks = [...USER.tasks];

  const newTask = {
    title,
    description,
    completed,
  };

  // append new task
  tasks.push(newTask);

  // update the databases with new register

  await User.findByIdAndUpdate(id, { tasks });

  // get the user updated

  const UserUpdated = await User.findById(id);

  res.json({
    msg: "your request was processed successfully",
    tasks: [...UserUpdated.tasks],
  });
};

const updateTask = async (req, res) => {
  const { id } = req.user;

  const { title, description, completed } = req.body;
  const { id: _id } = req.params;

  const USER = await User.findById(id);

  const tasks = [...USER.tasks];

  const tasksUser = {};
  for (let i in tasks) {
    if (String(tasks[i]._id) === _id) {
      tasksUser.title = title || tasks[i].title;
      tasksUser.description = description || tasks[i].description;
      tasksUser.completed = completed || tasks[i].completed;
      tasksUser._id = new Types.ObjectId(_id);

      tasks.splice(i, 1, tasksUser);
      break;
    }
  }

  await User.findByIdAndUpdate(id, { tasks });

  const UserUpdated = await User.findById(id);

  res.json({ msg: "nada mas que decir", tasks: [...UserUpdated.tasks] });
};

const deleteTask = async (req, res) => {
  const { id } = req.user;

  const { id: _id } = req.params;

  const USER = await User.findById(id);

  const tasks = [...USER.tasks];

  const tasksFilter = tasks.filter((task) => String(task._id) !== _id);
  await User.findByIdAndUpdate(id, { tasks: tasksFilter });

  res.json({
    msg: "listo",
  });
};

export { getTasks, updateTask, deleteTask, createTask };

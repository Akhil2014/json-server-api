const express = require("express");
const mongoose = require("mongoose");
const { connection, TopicModel } = require("./db.js");
const app = express();

app.use(express.json());

app.get("/todos", async (req, res) => {
  try {
    const result = await TopicModel.find();
    res.send(result);
  } catch {
    console.log("get error");
  }
});

app.post("/todos/create", async (req, res) => {
  try {
    const payload = req.body;
    await TopicModel.insertMany([payload]);
  } catch {
    console.log("Post error")
  }

  res.send("Added");
});

app.delete("/todos/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    await TopicModel.deleteOne({_id:todoId})
  } catch {
    console.log("Delete error")
  }
  res.send();
});

app.patch("/todos/:todosId" , async (req , res) => {
    try{
        const {todosId} = req.params
        const payload = req.body
        console.log(payload , todosId)
        await TopicModel.updateOne({_id:todosId} , {
            $set:payload
        })
        res.send("done")
    }catch{
        console.log("Patch error")
    }
})
app.listen(8000, async () => {
  try {
    await connection;
    console.log("Connected");
  } catch {
    console.log("Error");
  }
  console.log("Server Started");
});

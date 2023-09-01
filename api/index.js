const express = require("express");
const { db } = require("./config");
const cors = require("cors");
const app = express();
app.use(cors({
    origin: ["https://todo-frontend.vercel.app"],
    methods: ["GET", "POST", "PUT", "DETELE"],
    credentials: true
}));

app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const doc = db.collection('todo');
        const docSnapshot = await doc.get();
        const todo = docSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        res.send(todo);
    } catch (error) {
        console.log(`Encountered error: ${error}`);
        res.status(500).send({ error: "An error occurred while fetching todos." });
    }
})

app.post("/create", async (req, res) => {
    try {
        await db.collection('todo').add(req.body);
        res.send({ message: "Todo created successfully." });
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).send({ error: "An error occurred while creating the todo." });
    }
})

app.put("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id; 
        const data = req.body; 
        const todoRef = db.collection('todo').doc(id);
        await todoRef.update(data);

        res.send({ message: "Todo updated successfully." });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).send({ error: "An error occurred while updating the todo." });
    }

})

app.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const todoRef = db.collection('todo').doc(id);
        await todoRef.delete();

        res.send({ message: "Todo deleted successfully." });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).send({ error: "An error occurred while deleting the todo." });
    }
});

app.put("/update", async (req, res) => {
    try {
        const updatedTodoList = req.body; 
        for (const updatedTodo of updatedTodoList) {
            const items = updatedTodo.items;
            for(const item of items) {
                const id = item.id;
                const data = {
                    title: item.title,
                    description: item.description,
                    type: item.type
                };
                const todoRef = db.collection('todo').doc(id);
                await todoRef.update(data);
            }
        }
        
        res.send({ message: "Todo list updated successfully." });
    } catch (error) {
        console.error("Error updating todo list:", error);
        res.status(500).send({ error: "An error occurred while updating the todo list." });
    }
});

app.listen(4000, () => {
    console.log("connected");
})

const express = require("express");

const userRouter = require("./src/routes/usersRouter");

const app = express();
const PORT = 3000;

// middlewares
app.use(express.json());

//routes
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to interview API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

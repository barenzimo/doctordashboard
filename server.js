const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const tasksroutes = require("./routes/tasks");
const loginroutes = require("./routes/login");
require("dotenv/config");
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
app.use("/tasks", tasksroutes);
app.use("/login", loginroutes);
const PORT = process.env.PORT || 5000;
//Serve static assests
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});

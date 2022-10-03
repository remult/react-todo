import express from "express";
import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/Task";

const app = express();
app.use(remultExpress({
  entities: [Task]
}));
app.listen(3002, () => console.log("started"));
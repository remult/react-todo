import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/Task";
export const api = remultExpress({
    entities: [Task]
});
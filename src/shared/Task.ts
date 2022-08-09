import { Entity, Fields } from "remult";

@Entity("tasks", {
    allowApiCrud: true
})
export class Task {
    @Fields.autoIncrement()
    id = 0;
    @Fields.string({ allowApiUpdate: false })
    title = '';
    @Fields.boolean()
    completed = false;
}
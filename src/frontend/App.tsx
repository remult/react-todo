import { useEffect, useState } from "react";
import { Task } from "../shared/Task"
import { remult } from 'remult';

const taskRepo = remult.repo(Task);

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    taskRepo.find().then(setTasks);
  }, []);

  const addTask = async () => {
    if (newTaskTitle) {
      try {
        const newTask = await taskRepo.insert({
          title: newTaskTitle
        });
        setTasks([...tasks, newTask]);
        setNewTaskTitle('');
      } catch (error: any) {
        alert(error.message)
      }
    }
  }

  const setAllCompleted = async (completed: boolean) => {
    for (const task of await taskRepo.find()) {
      await taskRepo.save({ ...task, completed });
    }
    taskRepo.find().then(setTasks);
  }

  return (
    <div>
      <main>
        <input
          value={newTaskTitle}
          placeholder="What do I need?"
          onChange={e => setNewTaskTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
        {tasks
          .map(task => {
            const setTask = (value: typeof task) =>
              setTasks(tasks.map(t => t === task ? value : t));

            const setCompleted = async (completed: boolean) => {
              const savedTask = await taskRepo.save({ ...task, completed });
              setTask(savedTask);
            };
            const setTitle = (title: string) => {
              setTask({ ...task, title });
            };
            const saveTask = async () => {
              try {
                setTask(await taskRepo.save(task));
              } catch (error: any) {
                alert(error.message);
              }
            }
            const deleteTask = async () => {
              try {
                await taskRepo.delete(task);
                setTasks(tasks.filter(t => t !== task));
              } catch (error: any) {
                alert(error.message);
              }
            };
            return (
              <div key={task.id}>
                <input type="checkbox"
                  checked={task.completed}
                  onChange={e => setCompleted(e.target.checked)} />
                <input
                  value={task.title}
                  onChange={e => setTitle(e.target.value)}
                />
                <button onClick={saveTask}>✔</button>
                <button onClick={deleteTask}>x</button>
              </div>
            );
          })}
      </main>
      <div>
        <button onClick={() => setAllCompleted(true)}>Set all as completed</button>
        <button onClick={() => setAllCompleted(false)}>Set all as uncompleted</button>
      </div>
    </div>
  );
}
export default App;
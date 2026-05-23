import React, {useState, useEffect} from 'react'
import AddTask from './AddTask';
import { v4 as uuidv4 } from "uuid";
import TaskItem from './TaskItem';


const TaskItems = () => {
    const [tasks, setTasks] = useState(() => {
      const savedTasks = localStorage.getItem('todos');
      return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [filter, setFilter] = useState("all");
    const [message, setMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(tasks));
    }, [tasks]);


    const showMessage = (text) => {
      setMessage(text);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    };

    
    const addTodo = (task) => {

      if (!task.trim()) {
        showMessage("Task can't be empty");
        return
      }

       const exists = tasks.some((item) => item.text.trim() === task.trim())
    
       if (exists) {
         showMessage("Task already exists");
         return
       }
       
       const id = uuidv4(); 
       setTasks([...tasks, {taskId: id, text: task, isCompleted: false, isEditing: false}])
    }
   
    const deleteTodo = (taskIdToDelete) => {
      setTasks(tasks.filter((task) => (task.taskId !== taskIdToDelete)))
    }
 
    const toggleComplete = (completedTaskId) => {
      const newTasks = tasks.map((task) => {
        if(task.taskId === completedTaskId) {
          return { ...task, isCompleted: !task.isCompleted };
        } else {
          return task
        }
      });

      setTasks(newTasks);
    }

    const toggleEdit = (id) => {
      const newTasks = tasks.map((task) => {
        if (task.taskId === id) {
          return { ...task, isEditing: !task.isEditing };
        } else {
          return { ...task, isEditing: false };
        }
      });

      setTasks(newTasks);
    }

    const editTask = (EditedText, id) => {
      const newTasks = tasks.map((task) => {
        if (task.taskId === id) {
          return { ...task, text: EditedText, isEditing: false };
        } else {
          return task;
        }
      });

      setTasks(newTasks);
    }

    // filters
    let filteredTasks = [];
   if(filter === "active") {
     filteredTasks = tasks.filter((task) => task.isCompleted === false)
   } else if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.isCompleted === true);
   } else {
    filteredTasks = tasks
   }

  const clearCompleted = () => {
    setTasks(tasks.filter((task)=> !task.isCompleted))
  };

  const hasCompletedTasks = tasks.some((task) => task.isCompleted)

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter(task=> !task.isCompleted).length;
  const completedTasks = tasks.filter(task=> task.isCompleted).length;
  
  return (
    <>
      <AddTask
        addTodo={addTodo}
        setFilter={setFilter}
        message={message}
        clearCompleted={clearCompleted}
        isDisabled={!hasCompletedTasks}
        totalTasks={totalTasks}
        activeTasks={activeTasks}
        completedTasks={completedTasks}
      />
      <TaskItem
        filteredTasks={filteredTasks}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
        editTask={editTask}
        toggleEdit={toggleEdit}
        filter={filter}
      />
    </>
  );
}

export default TaskItems
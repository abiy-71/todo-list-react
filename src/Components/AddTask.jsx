import React, {useState} from 'react'


const AddTask = ({
  addTodo,
  setFilter,
  message,
  clearCompleted,
  isDisabled,
  totalTasks,
  activeTasks,
  completedTasks,
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addTodo(input);

    setInput("");
  };

  return (
    <div className="input_section">
      <h2>Get Things Done!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What's on your mind today?"
          className="task"
          id='new_txt'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        
        <button type="submit">Add Task</button>
      </form>
      <p style={{textAlign: "center", color: "red"}}>{message}</p>
      <div className="task_stats">
        <span>Total: {totalTasks}</span>
        <span>Active: {activeTasks}</span>
        <span>Completed: {completedTasks}</span>
      </div>
      <div className='filter_btns'>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={clearCompleted} disabled={isDisabled}>
          Clear Done
        </button>
      </div>
    </div>
  );
};

export default AddTask
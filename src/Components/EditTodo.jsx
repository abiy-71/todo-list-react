import React, { useEffect, useState } from 'react'

const EditTodo = ({editTask, task}) => {
    const [input, setInput] = useState("");

    useEffect(() => {
        if(task) {
        setInput(task.text);
        }
    }, [task.taskId]);
    

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!input.trim()) return;

      editTask(input, task.taskId);

      setInput("");

    };


  return (
    <div className="input_section">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={""}
          className="task"
          id='update_txt'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
}

export default EditTodo
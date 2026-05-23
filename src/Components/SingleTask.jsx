import React from 'react'
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";


const SingleTask = ({task, deleteTodo, toggleComplete, toggleEdit}) => {
  
  return (
    <div className='tasks'>
      <span
        onClick={() => toggleComplete(task.taskId)}
        className={task.isCompleted ? "completed" : ""}
      >
        {task.text}
      </span>
      <div className="task-actions">
        <button
          onClick={() => deleteTodo(task.taskId)}
          className="icon-btn delete"
        >
          <FaTrash />
        </button>
        {!task.isCompleted && (
          <button
            onClick={() => toggleEdit(task.taskId)}
            className="icon-btn edit"
          >
            <FaEdit />
          </button>
        )}
      </div>
    </div>
  );
}

export default SingleTask
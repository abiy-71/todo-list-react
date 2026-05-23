import React, { useState} from 'react';
import SingleTask from './SingleTask';
import EditTodo from './EditTodo';

const TaskItem = ({
  filteredTasks,
  deleteTodo,
  toggleComplete,
  editTask,
  toggleEdit,
  filter
}) => {

  let emptyMessage = "";

  if(filter === "active") {
    emptyMessage = "No active tasks";
  } else if (filter === "completed") {
    emptyMessage = "No completed tasks";
  } else {
    emptyMessage = "No tasks";
  }

  return (
    <div className="task_list">
      {filteredTasks.length > 0 ? (
        filteredTasks?.map((task) =>
          task.isEditing ? (
            <EditTodo key={task.taskId} task={task} editTask={editTask} />
          ) : (
            <SingleTask
              task={task}
              key={task.taskId}
              deleteTodo={deleteTodo}
              toggleComplete={toggleComplete}
              toggleEdit={toggleEdit}
            />
          ),
        )
      ) : (
        <p style={{ textAlign: "center", color: "red" }}>{emptyMessage}</p>
      )}
    </div>
  );
};

export default TaskItem


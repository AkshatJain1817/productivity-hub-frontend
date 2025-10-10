import { useState } from "react";

function TaskCard({ task, onDelete, onEditClick, onQuickUpdate }) {

  const [selected, setSelected] = useState(false);
  const handleStatusChange = (e) => {
    const updatedStatus = e.target.value;
    onQuickUpdate(task._id, { ...task, status: updatedStatus });
  }
  return (
    <div className="bg-gray-400 p-4 m-2 rounded shadow">
      <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button className="bg-amber-900 px-2.5 rounded-sm" onClick={()=>setSelected(true)}>details</button>
            <select value={task.status} onChange={handleStatusChange}>
                <option value={task.status}>{task.status}</option>
                <option value="todo">to-do</option>
                <option value="in-progress">In-Progress</option>
                <option value="done">done</option>
            </select>
      </div>
      <div>
        {selected ? (
            <div className="bg-gray-200 p-2 mt-2 rounded">
                <p>Due Date: {task.dueDate}</p>
                <p>Status: {task.status}</p>
                <p>Priority: {task.priority}</p>
                <button className="bg-red-500 px-2.5 rounded-sm py-1" onClick={()=>onDelete(task._id)}>delete</button>
                <button className="bg-red-500 rounded-sm py-1 px-2.5" onClick={()=>onEditClick(task)}>edit</button>
                <button className="bg-red-500 px-2.5 rounded-sm py-1" onClick={()=>setSelected(false)}>close</button>
            </div>
        ) : null}
      </div>
    </div>
  );
}

export default TaskCard;
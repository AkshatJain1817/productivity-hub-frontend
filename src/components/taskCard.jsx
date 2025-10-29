import axios from "axios";
import { useState } from "react";

function TaskCard({ task, onDelete, onEditClick, onQuickUpdate }) {
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subTask, setSubtask] = useState(task.subtasks || []);

  const handleStatusChange = (e) => {
    const updatedStatus = e.target.value;
    onQuickUpdate(task._id, { ...task, status: updatedStatus });
  };

  const handleGenerateSubtask = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:7000/api/task/${task._id}/subtasks`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "content-type": "application/json",
          },
        }
      );
      setSubtask(res.data.subtasks || []);
    } catch (error) {
      console.log("Error generating subtasks:", error);
      alert("Error generating subtasks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 m-3 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        </div>

        <select
          value={task.status}
          className="ml-3 text-sm border border-gray-300 rounded-lg px-2 py-1 bg-gray-50 focus:ring-2 focus:ring-indigo-400"
          onChange={handleStatusChange}
        >
          <option value="todo">To-Do</option>
          <option value="in-progress">In-Progress</option>
          <option value="done">Completed</option>
        </select>
      </div>
      {/* expandable to show subtasks */}
      <div className="mt-4">
        {!selected ? (
          <button
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            onClick={() => setSelected(true)}
          >
            Show details ⬇️
          </button>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg mt-2 border border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Due Date:</span>{" "}
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "--"}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Priority:</span>
              {task.priority || "--"}
            </p>

            {/* subtasks section */}
            <div className="mt-3">
              <h4 className="font-semibold text-gray-800 mb-2">Subtasks:</h4>
              {subTask.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {subTask.map((subtask, index) => (
                    <li key={index}>
                      <span
                        className={
                          subtask.done ? "line-through text-gray-400" : ""
                        }
                      >
                        {subtask.title}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm italic">no subtasks yet</p>
              )}
            </div>

            {/* buttons */}
            <div className="flex flex-wrap gap-2 mt-4">

              {subTask.length>0?(
                <button
                  className="bg-gray-400 text-white px-3 py-1.5 rounded-md text-sm cursor-not-allowed"
                  disabled
                >
                  Subtasks Generated ✅
                </button>
              ):(<button
                className="bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-indigo-700 transition"
                onClick={handleGenerateSubtask}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Subtasks ✨"}
              </button>)}

              <button
                className="bg-amber-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-amber-600 transition"
                onClick={() => onEditClick(task)}
              >
                Edit
              </button>

              <button
                className="bg-red-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-red-600 transition"
                onClick={() => onDelete(task._id)}
              >
                Delete
              </button>

              <button
                className="text-gray-600 text-sm font-medium hover:text-gray-900"
                onClick={() => setSelected(false)}
              >
                Hide details ⬆️
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskCard;

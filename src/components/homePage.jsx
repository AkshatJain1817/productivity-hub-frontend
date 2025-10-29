import { useState, useEffect } from "react";
import NavBar from "./navBar";
import axios from "axios";
import TaskCard from "./taskCard";
import TaskForm from "./taskForm";

function HomePage() {
  const [task, setTask] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    search: "",
    sortBy: "createdAt",
    order: "desc",
  });

  const fetchtasks = async (customFilters = filters) => {
    try {
      const query = new URLSearchParams(customFilters).toString();

      const res = await axios.get(`http://localhost:7000/api/task?${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data && Array.isArray(res.data.tasks)) {
        setTask(res.data.tasks);
      } else {
        console.log("Invalid data format:", res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchtasks();
  }, [filters]);

  const handleAddTask = async (taskData) => {
    try {
      await axios.post("http://localhost:7000/api/task/create", taskData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("task added successfully");
      setAddTask(false);
      fetchtasks();
    } catch (error) {
      alert("error adding task");
      console.log(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:7000/api/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("task deleted successfully");
      fetchtasks();
    } catch (error) {
      alert("error deleting task");
      console.log(error);
    }
  };

  const handleEditTask = async (taskId, updatedData) => {
    try {
      await axios.put(`http://localhost:7000/api/task/${taskId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("task updated successfully");
      fetchtasks();
      setEditTask(null);
    } catch (error) {
      alert("error updating task");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-amber-600 shadow-md">
        <NavBar />
      </div>

      {/* header  */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-gray-800">
          📋 Your Productivity Hub
        </h1>
        <p className="text-gray-600 mt-1">
          Organize, plan, and track tasks — powered by AI 💡
        </p>
      </div>

      {/* filter and add task button */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-3 px-4 mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <select
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border rounded-lg px-3 py-2 text-sm text-gray-700 bg-white shadow-sm hover:border-gray-400 transition"
          >
            <option value="">All Status</option>
            <option value="todo">To-Do</option>
            <option value="in-progress">In-Progress</option>
            <option value="done">Completed</option>
          </select>

          <select
            onChange={(e) =>
              setFilters({ ...filters, priority: e.target.value })
            }
            className="border rounded-lg px-3 py-2 text-sm text-gray-700 bg-white shadow-sm hover:border-gray-400 transition"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="border rounded-lg px-3 py-2 text-sm text-gray-700 bg-white shadow-sm hover:border-gray-400 transition"
          >
            <option value="asc">Due Date ⬆️</option>
            <option value="desc">Due Date ⬇️</option>
          </select>

          <input
            type="text"
            placeholder="🔍 Search tasks..."
            className="border rounded-lg px-3 py-2 text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-amber-400"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        <button
          onClick={() => setAddTask(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-4 py-2 rounded-lg shadow transition"
        >
          ➕ Add Task
        </button>
      </div>

      {/* Add Task Form */}
      {addTask && (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mb-6 border">
          <TaskForm onSubmit={handleAddTask} />
          <button
            onClick={() => setAddTask(false)}
            className="mt-4 text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Task List */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {task.length > 0 ? (
          task.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDeleteTask}
              onEditClick={() => setEditTask(task)}
              onQuickUpdate={handleEditTask}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 italic mt-10">
            No tasks found. Add a new one to get started 🚀
          </p>
        )}
      </div>

      {/* Edit Modal */}
      {editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              ✏️ Edit Task
            </h2>
            <TaskForm
              initialData={editTask}
              onSubmit={(updatedData) =>
                handleEditTask(editTask._id, updatedData)
              }
            />
            <button
              onClick={() => setEditTask(null)}
              className="mt-4 text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;

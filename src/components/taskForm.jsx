import { useState } from "react";
function TaskForm({onSubmit, initialData }) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [priority, setPriority] = useState(initialData?.priority || "low");
    const [dueDate, setDueDate] = useState(initialData?.dueDate || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({title, description, priority, dueDate})
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {initialData ? "✏️ Edit Task" : "➕ Create New Task"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-400" />
                </div>
                <div >
                    <label className="block text-sm font-medium text-gray-700 mb-1">description</label>
                    <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Add some details..." rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-400" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">priority</label>
                    <select value={priority} onChange={(e)=>setPriority(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white">
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">duedate</label>
                    <input type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)}  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                </div>
                <div className="pt-2">
                    <button type="submit" className="w-full bg-amber-600 text-white py-2.5 rounded-lg font-medium hover:bg-amber-700 transition-all focus:ring-2 focus:ring-amber-500 focus:outline-none">{initialData ? "Update Task" : "Create Task"}</button>
                </div>  
            </form>
        </div>
    )
}

export default TaskForm;
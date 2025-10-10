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
        <div>
            <h2>Task Form</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="mb-4">
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="bg-amber-300 rounded-sm" />
                </div>
                <div className="mb-4">
                    <label>description</label>
                    <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}  className="bg-amber-300 rounded-sm" />
                </div>
                <div className="mb-4">
                    <label>priority</label>
                    <select value={priority} onChange={(e)=>setPriority(e.target.value)} className="bg-amber-300 rounded-sm">
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label>duedate</label>
                    <input type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)}  className="bg-amber-300 rounded-sm" />
                </div>
                <button type="submit" className="bg-amber-900 px-2.5 rounded-sm mb-2">Submit</button>  
            </form>
        </div>
    )
}

export default TaskForm;
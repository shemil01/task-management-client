"use client";
import { useContext, useEffect, useState } from "react";
import MyContext from "@/context/Context";
import { IoIosAddCircleOutline } from "react-icons/io";
import Link from "next/link";
import { Axios } from "@/components/api/Api";

const Page = () => {
  const { tasks, setTasks, updateTask, deleteTask } =
    useContext(MyContext);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);



useEffect(()=>{
   Axios.get("/view-tasks", {
          withCredentials: true,
        }).then((res)=>{
          setTasks(res.data)
        }).catch((err)=>{
          console.log(err)
        })
},[])




  const handleUpdate = async () => {
    if (!editingTask) return;
    setLoading(true);
    await updateTask(editingTask._id, editingTask);
    setEditingTask(null);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setIsDeleteLoading(true);
    await deleteTask(id);
    setIsDeleteLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex md:justify-between">
          {" "}
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">
            📌 My Tasks
          </h2>
          <Link href={"/addTask"}>
            {" "}
            <button className="flex space-x-5 text-black">
              <IoIosAddCircleOutline className="text-2xl " />
              <span>add task</span>
            </button>
          </Link>
          <Link href={"/"}>
            {" "}
            <button className="flex space-x-5 text-black">
              <span>Back to home</span>
            </button>
          </Link>
        </div>
        {tasks?.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available.</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-gray-50 p-5 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-bold text-gray-700">
                  {task.title}
                </h3>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500">
                  📅 Due: {new Date(task.dueDate).toLocaleString()}
                </p>
                <p className="text-sm font-medium mt-1">
                  ⚡ Priority:{" "}
                  <span
                    className={`text-${
                      task.priority === "High"
                        ? "red"
                        : task.priority === "Medium"
                        ? "yellow"
                        : "green"
                    }-500`}
                  >
                    {task.priority}
                  </span>
                </p>
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => setEditingTask(task)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    disabled={isDeleteLoading}
                  >
                    {isDeleteLoading ? "Deleting..." : "🗑️ Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingTask && (
        <div className="fixed inset-0 flex items-center justify-center text-black bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <input
              type="text"
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({ ...editingTask, title: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
              placeholder="Task Title"
            />
            <textarea
              value={editingTask.description}
              onChange={(e) =>
                setEditingTask({ ...editingTask, description: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
              placeholder="Task Description"
            />
            <input
              type="date"
              value={editingTask.dueDate}
              onChange={(e) =>
                setEditingTask({ ...editingTask, dueDate: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
            />
            <select
              value={editingTask.priority}
              onChange={(e) =>
                setEditingTask({ ...editingTask, priority: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <div className="flex justify-between">
              <button
                onClick={() => setEditingTask(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                ❌ Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                disabled={loading}
              >
                {loading ? "Updating..." : "✅ Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

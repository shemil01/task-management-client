"use client";
import { useContext, useEffect, useState } from "react";
import MyContext from "@/context/Context";
import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {
  const { tasks, fetchTasks, createTask, updateTask, deleteTask } =
    useContext(MyContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [input, setInput] = useState("");

  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(title, description, dueDate, priority);
    setInput("");
    router.push("/tasks");
  };
  return (
    <div className="flex flex-col items-center border-b-2 pb-4 bg-black  min-h-screen p-5">
      <h2 className="m-2 text-2xl font-bold">Task Manger</h2>
      <form onSubmit={handleSubmit} className="mb-6 text-black">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="medium">Medium</option>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>
        <div className="flex space-x-2">
        <button
          type="submit"
          className="mx-1 bg-blue-700 text-white p-1 rounded font-medium hover:bg-blue-600 cursor-pointer"
        >
          Create Task
        </button>
        <Link href={'/'}><button
          type="submit"
          className="mx-1 bg-red-700 text-white p-1 rounded font-medium hover:bg-blue-600 cursor-pointer"
        >
          cancel
        </button></Link>
        </div>
      </form>
    </div>
  );
};

export default page;

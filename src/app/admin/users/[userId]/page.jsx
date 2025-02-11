"use client";
import { Axios } from "@/components/api/Api";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const page = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});
  const { userId } = useParams();



 
  useEffect(() => {
    Axios.get(`/admin/user-tasks/${userId}`, {
      withCredentials: true,
    })
      .then((res) => {
        setUser(res.data.userData);
        setTasks(res.data.task || []);        
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
   <div className="flex justify-between">
   <h2 className="text-2xl font-bold text-black mb-2">User Details</h2>

   <Link href={'/admin'} ><button className="text-black">back</button></Link>
   </div>
      <div className="border-b pb-4 mb-4 text-black">
        <p className="text-lg">
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Role:</span> {user.role}
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">Assigned Tasks</h2>
      

  <ul className="space-y-4">
  
      <li  className="p-4 border rounded-lg shadow-sm bg-gray-100">
        <h3 className="text-lg font-semibold text-black">{tasks?.title}</h3>
        <p className="text-sm text-gray-600">{tasks?.description}</p>
        <p className="text-sm text-gray-500 mt-1">Due Date: {tasks?.dueDate}</p>
        <span
          className={`px-3 py-1 mt-2 inline-block rounded-full text-white ${
            tasks?.priority === "High"
              ? "bg-red-500"
              : tasks.priority === "Medium"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          {tasks.priority} Priority
        </span>
      </li>
  </ul>


      
    {tasks.length == 0 && (
          <p className="text-red-700">No tasks assigned.</p>
    )}
     
    </div>
  );
};

export default page;

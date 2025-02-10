"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { Axios } from "@/components/api/Api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import MyContext from "./Context";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { user } = useContext(MyContext);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();





  const fetchUserById = async (userId) => {
    try {
      setLoading(true);
      const response = await Axios.get(`/admin/user-by-id/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };



  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await Axios.get("/admin/all-tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTaskById = async (taskId) => {
    try {
      setLoading(true);
      const response = await Axios.get(`/admin/task-by-id/${taskId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching task:", error);
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (taskId, updatedTask) => {
    try {
      const response = await Axios.put(
        `/admin/edit-task/${taskId}`,
        updatedTask
      );
      setTasks(
        tasks.map((task) => (task._id === taskId ? response.data : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await Axios.delete(`/admin/delete-task/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        users,
        tasks,
        setTasks,
        setUsers,
        fetchTasks,
        fetchUserById,
        fetchTaskById,
        editTask,
        deleteTask,
        user,
        loading,
        setLoading

      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);

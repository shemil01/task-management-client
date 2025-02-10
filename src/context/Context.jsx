"use client";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Axios } from "@/components/api/Api";
import Cookies from "js-cookie";

const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();


  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        logout(); 
      }
    }
    setLoading(false);
  }, []);

  const register = async (email, password, name, role) => {
    Axios.post(
      "/register",
      { email, password, name, role },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        const { token, user } = response.data;

        Cookies.set("token", token);
        localStorage.setItem("token", token);
        const userInfo = JSON.stringify(user);
        localStorage.setItem("userInfo", userInfo);
        alert("account created");
        setUser(user);
        setLoading(false);
        router.push("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const login = async (email, password) => {
    Axios.post(
      "/login",
      { email, password },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        const { token, userData } = response.data;

        Cookies.set("token", token);
        localStorage.setItem("token", token);
        const userInfo = JSON.stringify(userData);
        localStorage.setItem("userInfo", userInfo);
        setUser(userData);
        setLoading(false);
        alert("login success");
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem('userInfo')
    setUser(null);
    router.push("/login");
  };


  const createTask = async (title, description, dueDate, priority) => {
    try {
      const response = await Axios.post(
        "/create-task",
        { title, description, dueDate, priority },
        { withCredentials: true }
      );
  
      setTasks((prevTasks) => [...prevTasks, response.data]);
  
      alert("Task created");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  
  const updateTask = async (id, updatedTask) => {
    try {
      await Axios.put(`/edit-task/${id}`, updatedTask, {
        withCredentials: true,
      });
  
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? { ...task, ...updatedTask } : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  

  const deleteTask = async (id) => {
    try {
      await Axios.delete(`/delete-task/${id}`, { withCredentials: true });
  
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  

  return (
    <MyContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        tasks,
        setTasks,
        createTask,
        updateTask,
        deleteTask,
        users,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;

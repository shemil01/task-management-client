"use client";
import { Axios } from "@/components/api/Api";
import { useAdmin } from "@/context/AdminContext";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const Page = () => {
  const { users, setUsers, loading, setLoading } = useAdmin();
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [userTasks, setUserTasks] = useState([]);


  console.log("user:",users)
  useEffect(() => {
    Axios.get("/admin/all-users", { withCredentials: true })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  

  // Handle Delete User
  const handleDelete = async (userId) => {
    if (!userId) return console.error("User ID is undefined");

    if (!confirm("Are you sure you want to delete this user?")) return;
    setIsDeleteLoading(true);

    try {
      await Axios.delete(`/admin/delete-user/${userId}`, {
        withCredentials: true,
      });

      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  // Handle Edit User
  const handleEdit = async (user) => {
    if (!user?._id) return console.error("User ID is undefined");

    setEditingUser(user._id);
    setUpdatedUser({ name: user.name, email: user.email, role: user.role });

    try {
      const res = await Axios.get(`/admin/user-tasks/${user._id}`, {
        withCredentials: true,
      });
      if (res.data) {
          setUserTasks(res.data);
          console.log('tasks in user:',userTasks)
      } else {
        console.warn("No tasks found for user:", user._id);
      }
    } catch (err) {
      console.error("Error fetching user tasks:", err);
    }
  };

  const handleSave = async (userId) => {
    setLoading(true);
    try {
      console.log("user id:", userId);
      const res = await Axios.put(`/admin/update-user/${userId}`, updatedUser, {
        withCredentials: true,
      });

      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, ...res.data } : user
        )
      );

      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto bg-white p-6 text-black shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">User Dashboard</h2>

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Role</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user._id} className="border">
                    <td className="py-2 px-4">
                      {editingUser === user._id ? (
                        <input
                          type="text"
                          value={updatedUser.name}
                          onChange={(e) =>
                            setUpdatedUser({
                              ...updatedUser,
                              name: e.target.value,
                            })
                          }
                          className="border p-1 rounded"
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editingUser === user._id ? (
                        <input
                          type="email"
                          value={updatedUser.email}
                          onChange={(e) =>
                            setUpdatedUser({
                              ...updatedUser,
                              email: e.target.value,
                            })
                          }
                          className="border p-1 rounded"
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editingUser === user._id ? (
                        <select
                          value={updatedUser.role}
                          onChange={(e) =>
                            setUpdatedUser({
                              ...updatedUser,
                              role: e.target.value,
                            })
                          }
                          className="border p-1 rounded"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        user.role
                      )}
                    </td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded text-white text-sm ${
                          user.status === "Active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 flex space-x-2">
                      {editingUser === user._id ? (
                        <>
                          <button
                            onClick={() => handleSave(user._id)}
                            className="text-green-500 hover:text-green-700"
                            disabled={loading}
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => setEditingUser(null)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <FaTimes />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="text-red-500 hover:text-red-700"
                            disabled={isDeleteLoading}
                          >
                            {isDeleteLoading ? "Deleting..." : <FaTrash />}
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {editingUser && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Assigned Tasks</h3>
                <ul>
                  {userTasks?.length > 0 ? (
                    userTasks?.map((task) => (
                      <li key={task._id} className="p-2 border rounded mb-2">
                        <h4 className="font-semibold">{task.title}</h4>
                        <p>{task.description}</p>
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            task.status === "Completed"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          {task.status}
                        </span>
                      </li>
                    ))
                  ) : (
                    <p>No tasks assigned to this user.</p>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

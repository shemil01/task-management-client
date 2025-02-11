"use client";
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import MyContext from "@/context/Context";
import Link from "next/link";
import { IoIosLogOut } from "react-icons/io";

const AdminDashboard = () => {
  const { user, logout } = useContext(MyContext);
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      console.log("par:", parsedUser);
      router.push("/admin");
        if (!parsedUser || parsedUser.role !== "admin") {
          router.push("/");
        }
    } else {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-gray-800">Task Manager</div>
            <div className="flex space-x-4">
              {!currentUser ? (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="flex md:space-x-10 space-x-2 items-center">
                  <span className="text-gray-700">
                    Welcome, {currentUser.name || "User"}!
                  </span>
                  <button
                    onClick={logout}
                    className="flex items-center text-red-600 hover:text-red-800"
                  >
                    <IoIosLogOut className="text-2xl" />
                    <span className="ml-2">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to Admin Dashbord{" "}
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Why Choose Task Manager?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href={'/admin/tasks'}>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl text-blue-600 mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                All Tasks{" "}
              </h3>
              <p className="text-gray-600">
                Easily schedule and prioritize your tasks with due dates and
                reminders.
              </p>
            </div>
          </Link>

          <Link href={"/admin/users"}>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl text-blue-600 mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                All Users
              </h3>
              <p className="text-gray-600">
                Your data is safe with our secure authentication and role-based
                access control.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-lg mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="text-gray-600">
            &copy; 2025 Task Manager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;

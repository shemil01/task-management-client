"use client";
import { useContext, useEffect, useState } from "react";
import MyContext from "@/context/Context";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const { user, logout } = useContext(MyContext);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
    } else {
      router.push("/login");
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
                    Welcome, {currentUser?.name || "User"}!
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
          Manage Your Tasks Efficiently
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Stay organized, prioritize your work, and achieve your goals with our
          powerful task management system.
        </p>
        {!currentUser && (
          <div className="space-x-4">
            <Link
              href="/signup"
              signup="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition duration-300"
            >
              Login
            </Link>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Why Choose Task Manager?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href={"/addTask"}>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl text-blue-600 mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Create New Task
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt, amet iure
              </p>
            </div>
          </Link>


          <Link href={"/tasks"}>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl text-blue-600 mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                view Task
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab
                enim aliquid quos nam aliquam earum excepturi corporis{" "}
              </p>
            </div>
          </Link>
        </div>
      </div>

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

export default LandingPage;

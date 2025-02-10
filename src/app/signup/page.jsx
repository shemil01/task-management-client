"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import MyContext from "@/context/Context";
import { useRouter } from "next/navigation";

const page = () => {
  const { register } = useContext(MyContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const router = useRouter()

  const handleSumbit = (e) => {
    e.preventDefault();
    register(email, password, name, role);
    if (role === "admin"){
      return router.push('/admin')
    }
  };
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="h-24 flex justify-center items-center ">
      </div>
      <div className="mb-10 flex justify-center">
        <div className="md:w-[650px] flex justify-center ">
          <div className="md:w-[348px] w-[300px] rounded p-6 border border-black">
            <h1 className="text-2xl mb-4">
              <b>Create account </b>
            </h1>
            <form onSubmit={handleSumbit}>
              <label className="font-bold text-sm w-full" htmlFor="email">
                 name
                <input
                  type="text"
                  maxLength="24"
                  name="name"
                  placeholder="enter Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border pl-2 border-black md:w-[296px] min-w-64 h-[31px] rounded "
                />
              </label>

              <label className="font-bold text-sm mt-5" htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border pl-2 mb-5 border-black min-w-64 md:w-[296px] h-[31px] rounded"
                />
              </label>
              <label className="font-bold text-sm" htmlFor="password">
                Password
                <div className="md:w-[296px] border w-64 border-black rounded flex justify-between">
                  <input
                    type="password"

                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="enter password"
                    className="mx-2 md:w-[245px] h-[31px] outline-none"
                  />
                </div>
              </label>
              <label className="font-bold text-sm block mt-3" htmlFor="role">
                Select Role
                <select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border pl-2 border-black w-full h-10 rounded mt-1 bg-white"
                >
                  <option value="user">Regular User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>

              <button
                type="submit"
                className="bg-[#153e51] text-white text-sm font-semibold my-5 md:w-[296px] w-full h-[31px] rounded"
              >
                submit
              </button>
            </form>

            <p className="text-[12px]">
              Registering means you agree to the Zappos terms of use and
              <a target="h" href="https://www.zappos.com/privacy-policy">
                {" "}
                privacy policy
              </a>
            </p>
            <br />
            <hr className="border border-black-300" />
            <div className="translate-y-3 flex justify-center min-w-64 md:w-[296px]">
              <p className="text-[12px]">
                Already have an account?
                <Link href={"/login"}>
                  <b>Sign in</b>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <hr />
      </div>
    </div>
  );
};

export default page;

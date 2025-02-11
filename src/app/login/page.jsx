"use client";
import MyContext from "@/context/Context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { FcGoogle } from "react-icons/fc";

const page = () => {
  const { login, user } = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();






  const handleSumbit = (e) => {
    e.preventDefault();
    login(email, password);

    
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-black">
      <div className="h-24 flex justify-center items-end ">
        <Link href={"/"}>
          <h1>welcome</h1>
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="md:w-[650px] flex justify-center">
          <div className="rounded p-6 border border-black flex flex-col">
            <h1 className="text-2xl mb-4">
              <b>Sign in</b>
            </h1>
            <form onSubmit={handleSumbit}>
              <label className="font-bold text-sm" htmlFor="email">
                Email
                <br />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border mb-5 pl-2 border-black min-w-64 md:w-[296px] h-[31px] rounded"
                  autoComplete="current-email"
                />
              </label>
              <label className="font-bold text-sm" htmlFor="password">
                <div className="flex justify-between">
                  Password
                  <Link
                    href={""}
                    // to={"/forgot-password"}
                    className=" font-normal hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className="md:w-[296px] min-w-64 border border-black rounded flex justify-between">
                  <input
                    // type={showPassword ? "text" : "password"}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mx-2 md:w-[245px] h-[31px] outline-none"
                    autoComplete="current-password"
                  />
                  <span
                    // onClick={() => setShowPassword(!showPassword)}
                    className="pt-1 pr-1 text-[#153e51] cursor-pointer"
                  >
                    {/* {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />} */}
                  </span>
                </div>
              </label>
              <button
                type="submit"
                className="bg-[#153e51] text-white font-bold my-5 md:w-[296px] min-w-64 h-[31px] rounded"
              >
                Sign in
              </button>
            </form>
            <hr className="border border-black-300" />
            <div className="flex justify-center min-w-64 md:w-[296px]">
              <p className="text-[12px]">New User?</p>
            </div>

            <button className="md:w-[296px] min-w-64 h-[31px] mt-3 border-2 font-bold rounded text-[#003953] border-[#003953]">
              <Link href={"/signup"}>Create your account</Link>
            </button>

            <span className="text-center">or</span>

            <button
              //   onClick={() => googleLogin()}
              className="md:w-[296px] min-w-64 h-10 mt-3 border font-bold rounded text-[#003953] border-[#003953]"
            >
              <div className="flex justify-around w-52 mx-auto">
                <FcGoogle className="mt-1 text-xl" /> <p>Login with Google</p>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div>
        <hr />
        {/* <FooterSecond /> */}
      </div>
    </div>
  );
};

export default page;

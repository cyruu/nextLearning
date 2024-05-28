"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
const Login = () => {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  async function handleLogin(e: any) {
    e.preventDefault();
    try {
      const res = await axios.post("api/users/login", data);

      if (res.data.isVerified == false) {
        console.log("cant login");
      } else if (res.data.isVerified == true) {
        console.log(res);

        router.push("/profile");
      }

      // router.push("/profile");
    } catch (error: any) {
      console.log(error.msg);
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      username:{" "}
      <input
        type="text"
        value={data.username}
        onChange={(e) => setData({ ...data, username: e.target.value })}
      />{" "}
      <br />
      password:{" "}
      <input
        type="text"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />{" "}
      <br />
      <button type="submit">Submit</button>
      <br />
      <Link href="/signup">Create account. Sign up</Link>
    </form>
  );
};

export default Login;

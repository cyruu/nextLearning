"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Signup = () => {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/signup", data);
      console.log(res);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>
      username:{" "}
      <input
        type="text"
        value={data.username}
        onChange={(e) => setData({ ...data, username: e.target.value })}
      />{" "}
      <br />
      email:{" "}
      <input
        type="text"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
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
      <Link href="/login">Already have an account. Login</Link>
    </form>
  );
};

export default Signup;

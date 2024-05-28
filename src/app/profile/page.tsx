"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState("");
  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  async function getUserDetails() {
    console.log("getting");

    const res = await axios.get("/api/users/me");
    setData(res.data.userData._id);
  }
  return (
    <div>
      <h1>profile</h1>
      <h2>
        {data ? <Link href={"/profile/" + data}>{data}</Link> : "invalid"}
      </h2>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={getUserDetails}>getData</button>
    </div>
  );
};

export default Profile;

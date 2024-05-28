"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Profile = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>profile</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;

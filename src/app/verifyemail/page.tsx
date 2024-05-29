"use client";
import axios from "axios";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const verifyUserEmail = async () => {
    try {
      const res = await axios.post("api/users/verifyemail", { token: token });
      if (res.data.msg == "Invalid token") {
        setVerified(false);
      } else {
        setVerified(true);
      }
    } catch (error: any) {
      console.log(error.response.data);
      setError(true);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div>
      <h1>Verify email</h1>
      <h2>{token ? `${token}` : "no token"}</h2>
      {verified ? <div>Email verified</div> : "INvaid token"}
    </div>
  );
}

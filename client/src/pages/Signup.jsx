import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirm_pass, setconfirm_pass] = useState("");
  const [role, setrole] = useState("user");

  const handleClick = () => {
    console.log({
      name,
      email,
      password,
      confirm_pass,
      role,
    });

    axios
      .post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
        confirm_pass,
        role,
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <div>
      <h1>Signup</h1>

      <input
        type="text"
        placeholder="enter your name"
        onChange={(e) => {
          setname(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder="email"
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setpassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="confirm password"
        onChange={(e) => setconfirm_pass(e.target.value)}
      />
      <select name="" id="" onChange={(e) => setrole(e.target.value)}>
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>

      <button onClick={handleClick}>Signup</button>
    </div>
  );
};

export default Signup;

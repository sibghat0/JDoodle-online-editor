import React from "react";
import logo from "../assets/JD_logo_white.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        backgroundColor: "#0E141E",
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <a href="/">
        <img src={logo} alt="" style={{ width: "200px" }} />
      </a>
    </div>
  );
}

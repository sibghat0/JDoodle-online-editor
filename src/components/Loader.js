import React from "react";

export default function Loader() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="circular-loader"></div>;
    </div>
  );
}

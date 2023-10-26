import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./Brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0  pointer ">
      <Tilt className="Tilt br2 shadow-2 " style={{ height: 150, width: 150 }}>
        <div className="Tilt-inner pa3">
          <img style={{ paddingTop: 5 }} alt="logo" src={brain} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;

import React, { Component } from "react";
import Navigation from "./Componenets/Navigation/Navigation";
import Logo from "./Componenets/Logo/Logo";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      {/* {<Logo/>
    <ImageLinkForm/>
    <FaceRecognition/>} */}
    </div>
  );
}

export default App;

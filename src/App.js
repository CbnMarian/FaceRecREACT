import React, { Component } from "react";
import Navigation from "./Componenets/Navigation/Navigation";
import Logo from "./Componenets/Logo/Logo";
import ImageLinkForm from "./Componenets/ImageLinkForm/ImageLinkForm";
import Rank from "./Componenets/Rank/Rank";
import ParticlesBg from "particles-bg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ParticlesBg color="#63014e" num={200} type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* {<Logo/>
    <ImageLinkForm/>
    <FaceRecognition/>} */}
    </div>
  );
}

export default App;

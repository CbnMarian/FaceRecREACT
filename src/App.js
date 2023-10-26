import React, { Component } from "react";
import Navigation from "./Componenets/Navigation/Navigation";
import Logo from "./Componenets/Logo/Logo";
import ImageLinkForm from "./Componenets/ImageLinkForm/ImageLinkForm";
import Rank from "./Componenets/Rank/Rank";
import ParticlesBg from "particles-bg";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
    };
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  };

  onButtonSubmit = () => {
    console.log("click");
  };

  render() {
    return (
      <div className="App">
        <ParticlesBg color="#63014e" num={200} type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        {/* {<Logo/>
    <ImageLinkForm/>
  <FaceRecognition/>} */}
      </div>
    );
  }
}

export default App;

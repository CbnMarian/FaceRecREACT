import React, { Component } from "react";
import Navigation from "./Componenets/Navigation/Navigation";
import FaceRecognition from "./Componenets/FaceRecognition/FaceRecognition";
import Logo from "./Componenets/Logo/Logo";
import ImageLinkForm from "./Componenets/ImageLinkForm/ImageLinkForm";
import Rank from "./Componenets/Rank/Rank";
import ParticlesBg from "particles-bg";
import "./App.css";

//start api clarifai  the api key   f9058498712748b8bc93d9a1be8af8cd

const returnClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = "6aa83b23bb1e4c5e8460fdd33c2f662f";
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = "cbnmarian";
  const APP_ID = "cbnmarian";
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = "face-detection";

  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };
  return requestOptions;
};
///////////////////////////////////////////////////////////////

//  DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
///////////////////////////////////////////////////////////////////////////////////

//end clarifai
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
    };
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch(
      "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
      returnClarifaiRequestOptions(this.state.input)
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("hi", response);
      });
    return function (response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);

      //ok until here
    };
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <ParticlesBg color="#63014e" num={300} type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;

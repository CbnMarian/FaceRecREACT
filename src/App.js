import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import FaceRecognition from "./Componenets/FaceRecognition/FaceRecognition";
import Navigation from "./Componenets/Navigation/Navigation";
import Signin from "./Componenets/Signin/signin.js";
import Register from "./Componenets/Register/Register";
import Logo from "./Componenets/Logo/Logo";
import ImageLinkForm from "./Componenets/ImageLinkForm/ImageLinkForm";
import Rank from "./Componenets/Rank/Rank";
import "./App.css";

const returnClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = "6aa83b23bb1e4c5e8460fdd33c2f662f";
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = "cbnmarian";
  const APP_ID = "cbnmarian";
  // Change these to whatever model and image URL you want to use

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

//end clarifai
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: " ",
        name: " ",
        email: " ",
        entries: 0,
        joined: "",
      },
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    fetch(
      "https://api.clarifai.com/v2/models/face-detection/outputs",
      returnClarifaiRequestOptions(this.state.input)
    )
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  onRouteChange = (route) => {
    console.log("Changing route to:", route);

    if (route === "signout") {
      this.setState({ isSignedIn: false }, () => {
        console.log("isSignedIn after update:", this.state.isSignedIn);
        console.log("route after update:", this.state.route);
      });
    } else if (route === "home") {
      this.setState({ isSignedIn: true }, () => {
        console.log("isSignedIn after update:", this.state.isSignedIn);
        console.log("route after update:", this.state.route);
      });
    }

    this.setState({ route: route }, () => {
      console.log("isSignedIn after final update:", this.state.isSignedIn);
      console.log("route after final update:", this.state.route);
    });
  };

  render() {
    console.log("Current route:", this.state.route);
    console.log("isSignedIn:", this.state.isSignedIn);
    return (
      <div className="App">
        <ParticlesBg color="#63014e" num={140} type="cobweb" bg={true} />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;

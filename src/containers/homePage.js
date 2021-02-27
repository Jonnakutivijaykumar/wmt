import React, { Component } from "react";
import Home from "../components/Home";

class HomePage extends Component {

  render() {
    const { navigation } = this.props;
    return <Home navigation={navigation} />;
  }
}

export default HomePage;

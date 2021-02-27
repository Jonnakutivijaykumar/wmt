import React, { Component } from "react";
import Registration from '../components/Registration'

class RegistrationPage extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Registration navigation ={navigation}/>
    );
  }
}

export default RegistrationPage

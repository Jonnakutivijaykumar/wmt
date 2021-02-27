import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { createForm } from "rc-form";
import TextInputItem from "./TextInputItem";
import * as Yup from "yup";
import api from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';

class Registration extends Component {

  getValidation = () => {
    return Yup.object({
      username: Yup.string().required("Please enter unique Username."),
      email: Yup.string().email().required("Please enter Email."),
      password: Yup.string().required("Please enter Password."),
      confirmPassword: Yup.string()
        .required("Please Re-Enter Password")
        .test(
          "passwords-match",
          "Two passwords that you enter are inconsistent.",
          function (value) {
            return this.parent.password === value;
          }
        ),
    });
  };

  onSubmit = async (values) => {
    const { navigation } = this.props;
    console.log(values);
    const userName = values.username;
    const email = values.email;
    const password = values.password;

    const registerDetails = {
      username: userName,
      email: email,
      password: password,
    };

    try {
      const res = await api.post("http://68.183.48.101:3333/users/register", registerDetails);
      const authToken = res.data.data.token.token;
      api.defaults.headers.common.Authorization = `Bearer ${authToken}`;
      alert(res.data.meta.message)
      console.log(res)
      navigation.navigate("HomeScreen");
    } catch (err) {
      alert('unique validation failed on username')
      console.log(err);
    }
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldError },
    } = this.props;
    return (
      <View style={{ flex: 1, padding: 40, justifyContent: "center", backgroundColor:'#fff' }}>
        <Image
          source={require("../images/logo.png")}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />

        <Formik
          initialValues={{ email: "", username: "", password: "", confirmPassword: "" }}
          validationSchema={this.getValidation}
          onSubmit={(values, formikActions) => {
            this.onSubmit(values);
            setTimeout(() => {
              formikActions.setSubmitting(false);
            }, 500);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
            <View>
              <TextInput
                placeholder={"Username"}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                style={styles.inputs}
                value={values.username}
              />
              {errors.username && touched.username ? (
                <Text style={{ color: "red", paddingHorizontal: 5 }}>
                  {errors.username}
                </Text>
              ) : null}
              <TextInput
                placeholder={"Email"}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                style={styles.inputs}
              />
              {errors.email  && touched.email ? (
                <Text style={{ color: "red", paddingHorizontal: 5 }}>
                  {errors.email}
                </Text>
              ) : null}

              <TextInput
                placeholder={"Password"}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                style={styles.inputs}
                secureTextEntry={true}
              />
              {errors.password && touched.password ? (
                <Text style={{ color: "red", paddingHorizontal: 5 }}>
                  {errors.password}
                </Text>
              ) : null}

              <TextInput
                placeholder={"Confirm Password"}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                style={styles.inputs}
                secureTextEntry={true}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <Text style={{ color: "red", paddingHorizontal: 5 }}>
                  {errors.confirmPassword}
                </Text>
              ) : null}

              <TouchableOpacity
                style={{
                  backgroundColor: "#00bcd4",
                  alignSelf: "center",
                  borderRadius: 15,
                  marginVertical: 10,
                }}
                onPress={handleSubmit}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 25,
                    marginHorizontal: 20,
                    padding: 5,
                  }}
                >
                  SUBMIT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        {/* {getFieldDecorator("username", {
          rules: [{ required: true, message: "Please enter Username." }],
        })(
          <TextInputItem
            error={getFieldError("username")}
            placeholderValue={"Username"}
          />
        )}
        {getFieldDecorator("email", {
          rules: [{ required: true, message: "Please enter Email." }],
        })(
          <TextInputItem
            error={getFieldError("email")}
            placeholderValue={"Email"}
          />
        )}

        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please enter Password." }],
        })(
          <TextInputItem
            error={getFieldError("password")}
            placeholderValue={"Password"}
            secureTextEntry={true}
          />
        )}

        {getFieldDecorator("confirmPassword", {
          rules: [{ required: true, message: "Please Re-enter Password." }],
        })(
          <TextInputItem
            error={getFieldError("confirmPassword")}
            placeholderValue={"ConfirmPassword"}
            secureTextEntry={true}
          />
        )}

        <TouchableOpacity
          style={{
            backgroundColor: "lightblue",
            alignSelf: "center",
            borderRadius: 15,
            marginVertical: 10,
          }}
          onPress={this.onSubmit}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 25,
              marginHorizontal: 20,
              padding: 5,
            }}
          >
            SUBMIT
          </Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputs: {
    borderBottomColor: "gray",
    borderWidth: 1,
    borderRadius: 23,
    paddingHorizontal: 10,
    marginVertical: 10,
    padding: 5,
    minWidth: "100%",
  },
});

export default createForm()(Registration);

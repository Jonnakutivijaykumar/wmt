import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import api from "../../utils/api";
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      responseList: [],
      fetchingStatus: false,
      setOnLoad: false,
    };
    this.page = 0;
    let onEndReached = false;
  }

  componentDidMount() {
    this.apiCall();
  }

  apiCall = async () => {
    var that = this;
    that.page = that.page + 1;
    try {
      that.setState({ fetchingStatus: true });
      const res = await api.get(
        "http://68.183.48.101:3333/users/list?page=" + that.page
      );
      that.setState({
        responseList: [...this.state.responseList, ...res.data.data.users],
        isLoading: false,
        setOnLoad: true,
      });
    } catch (error) {
      that.setState({ setOnLoad: false, fetchingStatus: false });
    }
  };

  BottomView = () => {
    return (
      <View>
        {this.state.fetchingStatus ? (
          <ActivityIndicator
            size="large"
            color="blue"
            style={{ marginLeft: 6 }}
          />
        ) : null}
      </View>
    );
  };

  render() {
      console.log(this.state.responseList)
    return (
      <View style={styles.MainContainer}>
        {this.state.isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            style={{ width: "100%" }}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.responseList}
            initialNumToRender={7}
            maxToRenderPerBatch={1}
            onEndReachedThreshold={0.1}
            onMomentumScrollBegin={() => {
              this.onEndReached = false;
            }}
            onEndReached={() => {
              if (!this.onEndReached) {
                this.apiCall(); // on End reached
                this.onEndReached = true;
              }
            }}
            renderItem={({ item, index }) => (
              <Card containerStyle={{ padding: 0 }}>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Image
                      style={styles.image}
                      resizeMode="cover"
                      source={{ uri: item.profile_pic }}
                    />
                  </View>
                  <View>
                    <Text style={styles.flatListItems}> {item.username} </Text>
                    <Text style={styles.flatListItems}> {item.email} </Text>
                  </View>
                </View>
              </Card>
            )}
            ListFooterComponent={this.BottomView}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    margin: 5,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },

  flatListItems: {
    fontSize: 20,
    // color: "#fff",
    padding: 10,
  },
  image:{
    width:100,
    height:100
  }
});

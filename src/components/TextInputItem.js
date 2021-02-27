import React, {Component} from 'react';
import { View, StyleSheet, Text, TextInput, Platform, PlatformColor } from 'react-native';


export default class TextInputItem extends Component{

    getError = error => {
        if (error) {
          return error.map(info => {
            return (
              <Text style={{color:'red'}} key={info}>
                {info}
              </Text>
            );
          });
        }
        return null;
      };
     
  render() {
    const { error, value, onChange, placeholderValue, maxLength, secureTextEntry } = this.props;
    return (
      <View style={styles.inputView} >
          <TextInput 
            placeholder={placeholderValue}
            style={styles.inputs}
            value={value || ''}
            onChangeText={onChange}
            secureTextEntry={ secureTextEntry || false}
          /> 
          <View style={{color:'red', paddingHorizontal:10,}}>{this.getError(error)}</View>
      </View>
    )
  }

}
const styles = StyleSheet.create({

    inputs: {
        borderBottomColor: "gray",
            borderWidth: 1,
            borderRadius:23,
            paddingHorizontal:10,
            marginVertical:10,
            padding:5,
            minWidth:'100%',
            fontSize:18
    }
})

import { Platform } from 'react-native';
import Toast from 'react-native-toast-message'
import _ from 'lodash';

export default (text, type, duration, buttonText, textStyle) => {
    // let loType = _.replace(type, 'danger', 'error');
    if (duration) {
        Toast.show({
            text1:text,
            visibilityTime: duration || 1000,
            type: type,
            autoHide: true, 
            position: 'top', 
            topOffset: 100,
            bottomOffset: 40,
          });
    }
}
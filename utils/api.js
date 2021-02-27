import axios from 'axios';
import JSOG from 'jsog';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosConfig = axios.create({
  headers: { 'Access-Control-Allow-Origin': '*'},
  
  transformResponse: [].concat(
    axios.defaults.transformResponse,
    data => JSOG.decode(data),
  ),
});

export default axiosConfig;

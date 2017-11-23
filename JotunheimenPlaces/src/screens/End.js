import React, {Component} from 'react';
import ReactNative from 'react-native';
import { Actions } from 'react-native-router-flux';

const { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} = ReactNative;

/**
 * Container component for End page
 */
class End extends Component {

  /**
    * End Container Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props){
    super(props);
  }

  /**
   * Render End page
   * @return {jsxresult} result in jsx format
   */
  render() {
    return (      
      <View style={{ flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <Text style={{fontSize: 15, fontFamily: 'Roboto-Bold', textAlign: 'center', color: 'black'}}>All information is submitted now.</Text>
          <Text style={{fontSize: 15, fontFamily: 'Roboto-Bold', textAlign: 'center', color: 'black'}}>Thank you very much!</Text>
          <TouchableOpacity style={{margin: 20, marginTop: 40, borderWidth: 2,borderRightWidth: 4, borderBottomWidth: 4}} onPress={()=>{Actions.indexsurvey({continue: false})}}>
            <Text style={{color:'black', padding: 10, textAlign:'center'}}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>      
    );
  }
}

export default End;
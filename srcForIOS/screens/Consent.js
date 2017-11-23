import React, {Component} from 'react';
import ReactNative from 'react-native';
import Button from '../components/Button';
import ButtonRedFlat from '../components/ButtonRedFlat';
import { Actions } from 'react-native-router-flux';

import {Motion, spring} from 'react-motion';
const {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Linking
} = ReactNative;

/**
 * Container component for Consent page
 */
class Consent extends Component {

  /**
    * Consent Container Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props){
    super(props);
  }

  /**
   * Render Consent page
   * @return {jsxresult} result in jsx format
   */
  render() {    
    return (
      
      <View
        style={styles.container}>
        <ScrollView >
          <View>
            <Text style={styles.headTextContainer}>
              Confidentiality and Consent
            </Text>
            <Text style={styles.descTextContainer}>
              If you consent to participate in the survey and to track your visit, your data will be analyzed together with the other visitors’ GPS data to create maps, reports and publications.
            </Text>
            <Text style={styles.descTextContainer}>
              All personal data will be treated as personal under the Norwegian 2000 Personal Data Act, and stored securely on a server at the Arctic University of Norway until 1st March 2018 when all this data will be deleted.
            </Text>
            <Text style={styles.descTextContainer}>
              The data will be treated as confidential and will not be passed on to any other party. No personally identifiable information will be used in reports or publications.
            </Text>
            <Text style={styles.descTextContainer}>
              For any queries please contact Lorena Muñoz <Text style={{textDecorationLine: "underline"}} onPress={()=>{Linking.openURL('mailto:lorena.munoz@uit.no?subject=&body=')}}>lorena.munoz@uit.no</Text> or Vera Hausner <Text style={{textDecorationLine: "underline"}} onPress={()=>{Linking.openURL('mailto:vera.hausner@uit.no?subject=&body=')}}>vera.hausner@uit.no</Text>
            </Text>                
          </View>          
        </ScrollView>
        <View>
          <Text style={{height: 30}}>                
          </Text>
          <Button onPress={()=>Actions.indexsurvey()}>Accept terms</Button>
          <Text style={{height: 10}}>                
          </Text>
          <ButtonRedFlat onPress={()=>Actions.welcome()}>Exit the survey</ButtonRedFlat>
        </View>
      </View>
      
      
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',    
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  headTextContainer: {
    color: '#01743D',
    fontFamily: 'Roboto-Bold',
    fontSize: 20
  },
  descTextContainer: {
    color: '#01743D',    
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    marginTop:5
  },
  ovalText: {
    color:'white',
    fontSize: 34,
    lineHeight:55,
    textAlign:'center'
  }
});

export default Consent;
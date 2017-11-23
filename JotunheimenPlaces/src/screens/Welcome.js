import React, {Component} from 'react';
import ReactNative from 'react-native';
import ButtonCircle from '../components/ButtonCircle';
import {Motion, spring} from 'react-motion';
import { Actions } from 'react-native-router-flux';

const {
  Image,
  StyleSheet,
  Text,
  View
} = ReactNative;

/**
 * Container-component for Welcome Page
 */
class Welcome extends Component {

  /**
    * Home(Welcome) Container Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props){
    super(props);
  }

  /**
   * Render Welcome page
   * @return {jsxresult} result in jsx format
   */
  render() {    
    return (
      
      <View
        style={styles.container}>
        <View style={{flex:4, justifyContent: 'center'}}>
          <Motion defaultStyle={{scale: 0.4, opacity: 0}} style={{scale: spring(1), opacity: spring(1)}}>
          {m =>
            <View style={{
              opacity: m.opacity, 
              alignItems: 'center'
            }}>
              <Image style={{width:294, height:169, transform: [{scale: m.scale}], marginBottom:30}} source={require('../assets/jotunheimen-logo.png')} />
              <View>
                <Text style={styles.logoTextContainer}>Welcome to our Nature-Based Tourism App!</Text>
                <Text style={styles.descTextContainer}>We want to improve nature-based tourism in Norway. We appreciate if you could spend a few minutes to map your sites and share your experiences. </Text>
              </View>
            </View>
          }
          </Motion>
        </View>

        <View style={{flex:1, alignItems:'center'}}>
          <Motion defaultStyle={{scale: 0.4, opacity: 0}} style={{scale: spring(1), opacity: spring(1)}}>
          {m =>
            <ButtonCircle onPress={()=>Actions.consent()} />
          }
          </Motion>
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
    justifyContent: 'space-between'
  },
  logoTextContainer: {
    color: '#01743D',
    fontSize: 20,
    textAlign: 'center',    
    fontFamily: 'Roboto-Bold',
    marginLeft:20,
    marginRight:15
  },
  descTextContainer: {
    color: '#01743D',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    marginTop:20,
    marginLeft:20,
    marginRight:20,
    lineHeight:28
  },
  ovalText: {
    color:'white',
    fontSize: 34,
    lineHeight:55,
    textAlign:'center'
  }
});

export default Welcome;
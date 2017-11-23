import React, {Component} from 'react';
import ReactNative from 'react-native';
import ButtonCircle from '../components/ButtonCircle';
import { Actions } from 'react-native-router-flux';
import {Motion, spring} from 'react-motion';
import {connect} from 'react-redux';
const {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking
} = ReactNative;

/**
 * Container component for Instruction page
 */
class Instruction extends Component {

  /**
    * Instruction Container Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props){
    super(props);
  }

  /**
   * Render Instruction page
   * @return {jsxresult} result in jsx format
   */
  render() {

    let activityContinue = false;

    if(this.props.pointInfo.length !== 0){
      let lastStage = this.props.pointInfo[this.props.pointInfo.length-1]["stage"];
      let mode = this.props.pointInfo[this.props.pointInfo.length-1]["mode"];
      if( lastStage == this.props.stage ){
        activityContinue = true;        
      }
    }

    return (
      
      <View
        style={styles.container}>
        <View style={{flex:4, justifyContent: 'center'}}>
          <ScrollView >
            <View>
              <Text style={styles.headTextContainer}>
                How to use this app:
              </Text>
              <Text style={styles.descTextContainer}>
                1. Click "Start activity" to activate a trip, which could take from a short jogging, fishing, hiking to several days backpacking in nature. Please do not stop the activity until you completely finish it.
              </Text>
              <Text style={styles.descTextContainer}>
                2. Mark positive or negative spots in the nature and tag non-material benefits.
              </Text>
              <Text style={styles.descTextContainer}>
                3. When finishing an activity, complete a survey about the experience you just had.
              </Text>
              <Text style={styles.descTextContainer}>
                You will be able to withdraw from the study at any point by sending an email to <Text style={{textDecorationLine: "underline"}} onPress={()=>{Linking.openURL('mailto:lorena.munoz@uit.no?subject=&body=')}}>lorena.munoz@uit.no</Text>
              </Text>
              <Text style={styles.descTextContainer}>
                Project website: <Text style={{textDecorationLine: "underline"}} onPress={()=>{Linking.openURL('http://site.uit.no/cultes/en/related-projects/phd-nature-based-tourism/')}}>http://site.uit.no/cultes/en/related-projects/phd-nature-based-tourism/</Text>
              </Text>
            </View>            
          </ScrollView>
        </View>
        <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
          <View>
            <ButtonCircle onPress={()=>{Actions.indexsurvey({continue:activityContinue});}} mode="prev-blue" />
          </View>
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
    fontSize: 20,    
    fontFamily: 'Roboto-Bold'
  },
  descTextContainer: {
    color: '#01743D',
    fontFamily: 'Roboto-Regular',
    fontSize: 18,    
    marginTop:15
  },
  ovalText: {
    color:'white',
    fontSize: 34,
    lineHeight:55,
    textAlign:'center'
  }
});

/**
 * Map Redux store state to component props
 * @param {state} state Redux store state
 * @return {json} state json State from redux store state
 */
const mapStateToProps = (state) => {    
  return {
    pointInfo: state.point.pointInfo,
    stage: state.survey.stage
  };
};

export default connect(mapStateToProps, null)(Instruction);

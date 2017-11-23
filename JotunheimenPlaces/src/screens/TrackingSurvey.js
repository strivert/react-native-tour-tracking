import React, {Component} from 'react';
import ReactNative from 'react-native';
import ButtonCircle from '../components/ButtonCircle';
import InputText from '../components/InputText';
import InputTextArea from '../components/InputTextArea';
import SelectBox from '../components/SelectBox';
import ItemList from '../components/ItemList';
import ItemMultiSelectList from '../components/ItemMultiSelectList';
import Button from '../components/Button';
import {Motion, spring} from 'react-motion';
import { Actions } from 'react-native-router-flux';

import activities from '../constants/activities';
import participants from '../constants/participants';
import mark from '../constants/mark';
import negatives from '../constants/negatives';
import experienceMark from '../constants/experienceMark';

import {connect} from 'react-redux';

import {  
  addSurvey
} from '../actions/survey';

import {setSurveyToFirebase} from '../utils/firebase';
import {validateEmail} from '../utils/utils';
import config from '../../config';
import { findNodeHandle } from 'react-native';
const RCTUIManager = require('NativeModules').UIManager;


const {
  Image,
  StyleSheet,
  Text,
  View,  
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions
} = ReactNative;

/**
 * Container component for TrackingSurvey page
 */
class TrackingSurvey extends Component {

  /**
    * TrackingSurvey Container Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props){
    super(props);

    this.info = {
      sActivity: '',
      sParticipant: '',
      smLearnNature: '',
      smTogether: '',
      smHealth: '',
      smInspire: '',
      smNurture: '',
      sExperience: '',
      smOverall: '',
      iComment: '',
      iEmail: '',
      dateTime: 0,
      stage: 0
    }
    this.scrollHeight = 0;
    this.deviceHeight = Dimensions.get("window").height;
  }

  goPos(infoIndex){
    var handle = findNodeHandle(this.refs[infoIndex+"Ref"]);
    RCTUIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      this.refs._scrollView.scrollTo({x:0, y:pageY+this.scrollHeight-this.deviceHeight, animated:true});
    });
  }

  /**
    * Handle Send Survey Click Event
    * @return {void}
    */
  sendSurvey(){    
    let dateTime = Math.floor(Date.now() / 1000);
    this.info["dateTime"] = dateTime;
    this.info["stage"] = this.props.stage;

    let checkResult = this.checkValidate();
    if( checkResult !== true ){
      Alert.alert(
        config.INPUT_WARNING_TITLE,
        config.INPUT_WARNING_CNT,
        [
          {text: 'OK', onPress: () => { this.goPos(checkResult) } }
        ]
      )
      return;
    }

    this.props.addSurvey( this.info );
    setSurveyToFirebase(this.info);    
    Actions.end();
  }

  /**
    * Check validate for user input
    * @return {void}
    */
  checkValidate(){
    let res = true;
    for(var i in this.info){      
      if( i=="iComment" || i=="iEmail" || i=="sExperience"){
        if( i=="iEmail" && this.info[i] !="") {
          if( !validateEmail(this.info[i]) )
            return i;
        }else{
          continue;
        }
      }
      if(this.info[i]===""){
        //alert(i)
        return i;
      }
    }
    return res;
  }

  /**
    * Get Activity
    * @param {str} value - activity
    * @return {void}
    */
  onChangeActivity(value) {
    this.info.sActivity = value;
  }

  /**
    * Get Participant
    * @param {str} value - participant
    * @return {void}
    */
  onChangeParticipant(value) {
    this.info.sParticipant = value;
  }

  /**
    * Get LearnNature Mark
    * @param {str} value - Nature Mark
    * @return {void}
    */
  onChangeLearnNature(value) {
    this.info.smLearnNature = value;
  }

  /**
    * Get TogetherMark
    * @param {str} value - TogetherMark
    * @return {void}
    */
  onChangeTogether(value) {
    this.info.smTogether = value;
  }

  /**
    * Get HealthMark
    * @param {str} value - HealthMark
    * @return {void}
    */
  onChangeHealth(value) {
    this.info.smHealth = value;    
  }

  /**
    * Get InspireMark
    * @param {str} value - InspireMark
    * @return {void}
    */
  onChangeInspire(value) {
    this.info.smInspire = value;    
  }

  /**
    * Get NurtureMark
    * @param {str} value - NurtureMark
    * @return {void}
    */
  onChangeNurture(value) {
    this.info.smNurture = value;    
  }

  /**
    * Get Experience
    * @param {str} value - Experience
    * @return {void}
    */
  onChangeExperience(value) {
    this.info.sExperience = value;    
  }

  /**
    * Get OverallMark
    * @param {str} value - OverallMark
    * @return {void}
    */
  onChangeOverall(value) {
    this.info.smOverall = value;    
  }

  /**
    * Get Comment
    * @param {str} value - Comment
    * @return {void}
    */
  onChangeComment(value) {
    this.info.iComment = value;
  }

  /**
    * Get Email
    * @param {str} value - Email
    * @return {void}
    */
  onChangeEmail(value) {
    this.info.iEmail = value;
  }

  /**
   * Render TrackingSurvey
   * @return {jsxresult} result in jsx format
   */
  render() {    
    let activityList = activities.map((item, key)=>{
      return {'label': item.name, value: key};
    });    
    let participantsList = participants.map((item, key)=>{
      return {'label': item.name, value: key};
    });
    let markList = mark.map((item, key)=>{
      return {'label': item.name, value: key};
    });
    let negativesList = negatives.map((item, key)=>{
      return {'label': item.name, value: key};
    });
    let experienceMarkList = experienceMark.map((item, key)=>{
      return {'label': item.name, value: key};
    });

    return (
      <View
        style={styles.container}>
        <ScrollView ref='_scrollView' collapsable={false} removeClippedSubviews={false}
          onContentSizeChange={(width, height) => {
            this.scrollHeight = height;
          }}
        >
          <View collapsable={false} removeClippedSubviews={false}>
            <Text style={styles.headTextContainer}>Your visit today:</Text>            
            <View style={styles.item} ref="sActivityRef" collapsable={false}>
              <Text style={styles.questionTextContainer}>7. What nature-based activites did you participate in during the tracking today? (*)</Text>
              <Text style={styles.questionTextContainer}>Click multiple if relevant</Text>
              <ItemMultiSelectList items={activityList} handleChangeItem = {this.onChangeActivity.bind(this)} />
            </View>
            <View style={styles.item} ref="sParticipantRef" collapsable={false} removeClippedSubviews={false}>
              <Text style={styles.questionTextContainer}>8. With whom did you conduct these activities today? (*)</Text>
              <Text style={styles.questionTextContainer}>choose only 1</Text>
              <ItemList items={participantsList} handleChangeItem = {this.onChangeParticipant.bind(this)} />
            </View>
            <View style={styles.item} collapsable={false}>
              <Text style={styles.questionTextContainer}>9. The visit today has been important for...</Text>
              <Text style={{color: '#E4151F', fontFamily:'Roboto-Regular', fontSize: 20, marginLeft:20, marginRight:20, marginTop:32}} ref="smLearnNatureRef">9.1. Learning about the nature (*)</Text>
              <ItemList items={markList} handleChangeItem = {this.onChangeLearnNature.bind(this)} />
              <Text style={styles.questionSubTextContainer} ref="smTogetherRef">9.2. being together with my family/friends (*)</Text>
              <ItemList items={markList} handleChangeItem = {this.onChangeTogether.bind(this)} />
              <Text style={styles.questionSubTextContainer} ref="smHealthRef">9.3. my physical/mental health (*)</Text>
              <ItemList items={markList} handleChangeItem = {this.onChangeHealth.bind(this)} />
              <Text style={styles.questionSubTextContainer} ref="smInspireRef">9.4. inspiring me to create crafts, stories or other artistic work (*)</Text>
              <ItemList items={markList} handleChangeItem = {this.onChangeInspire.bind(this)} />
              <Text style={styles.questionSubTextContainer} ref="smNurtureRef">9.5. Nurturing a deeper meaning of nature; emotionally or spiritually (*)</Text>
              <ItemList items={markList} handleChangeItem = {this.onChangeNurture.bind(this)} />
            </View>
            <View style={styles.item} ref="sExperienceRef" collapsable={false}>
              <Text style={styles.questionTextContainer}>10. My experience today was negatively impacted by: </Text>
              <ItemMultiSelectList items={negativesList} handleChangeItem = {this.onChangeExperience.bind(this)} />
            </View>
            <View style={styles.item} ref="smOverallRef" collapsable={false}>
              <Text style={styles.questionTextContainer}>11. How would you rate your overall experience today? (*)</Text>
              <Text style={styles.questionTextContainer}>choose only 1</Text>
              <ItemList items={experienceMarkList} handleChangeItem = {this.onChangeOverall.bind(this)} />
            </View>
            <View style={{marginBottom:45, marginTop:0}} ref="iCommentRef" collapsable={false}>
              <Text style={styles.questionTextContainer}>12. Leave any additional comment that you would like to make here:</Text>
              <InputTextArea multiline={true} numberOfLines={4} handleChangeText={this.onChangeComment.bind(this)} />
            </View>
            <View style={{marginBottom:45, marginTop:0}} ref="iEmailRef" collapsable={false}>
              <Text style={styles.questionTextContainer}>13. We would appreciate if we at a later stage could ask you few more questions. If so, please enter your email here:</Text>
              <InputText placeholder="Email" handleChangeText={this.onChangeEmail.bind(this)} />
            </View>
            <View style={{marginBottom:0, marginTop:0}}>
              <Text style={styles.headTextContainer}>Thank you very much for your participation!</Text>
            </View>
            <View style={{marginLeft:20, marginRight:20, marginBottom:20, marginTop:20}}>
              <Button onPress={this.sendSurvey.bind(this)}>Send</Button>
            </View>
          </View>
        </ScrollView>
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
  headTextContainer: {
    color: '#01743D',
    fontSize: 20,    
    fontFamily:'Roboto-Bold',    
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
    marginBottom: 28
  },
  questionTextContainer: {
    color: '#E4151F',
    fontFamily:'Roboto-Bold',
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20
  },
  questionSubTextContainer: {
    color: '#E4151F',
    fontFamily:'Roboto-Regular',
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 49
  },
  item:{
    marginBottom: 57,
    marginTop:0
  }
});

/**
 * Map Redux store state to component props
 * @param {state} state Redux store state
 * @return {json} state json State from redux store state
 */
const mapStateToProps = (state) => {    
  return {
    surveyInfo: state.survey.surveyInfo,
    stage: state.survey.stage
  };
};

/**
 * Map Redux dispatches to component props
 * @param {object} dispatch Redux dispatches
 * @return {json} dispatch-json from redux dispatche
 */
const mapDispatchToProps = (dispatch) => {
  return {
    addSurvey: (surveyInfo) => {
      return dispatch(addSurvey(surveyInfo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackingSurvey);

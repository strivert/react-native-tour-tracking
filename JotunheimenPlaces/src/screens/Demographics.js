import React, {Component} from 'react';
import ReactNative from 'react-native';
import ButtonCircle from '../components/ButtonCircle';
import InputText from '../components/InputText';
import SelectBox from '../components/SelectBox';
import ItemList from '../components/ItemList';
import FlatList from '../components/FlatList';
import Button from '../components/Button';
import {Motion, spring} from 'react-motion';
import { Actions } from 'react-native-router-flux';

import gender from '../constants/gender';
import education from '../constants/education';
import tax from '../constants/tax';
import taxEuro from '../constants/taxEuro';
import taxUsd from '../constants/taxUsd';
import moneyType from '../constants/moneyType';

import {connect} from 'react-redux';

import {  
  setDemographics
} from '../actions/demographics';

import {setPersonalToFirebase} from '../utils/firebase';
import {isNumeric} from '../utils/utils';
import config from '../../config';
import { findNodeHandle } from 'react-native';
const RCTUIManager = require('NativeModules').UIManager;

const {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Dimensions
} = ReactNative;
/**
 * Container component for Demographics page
 */
class Demographics extends Component {

  /**
    * Demographics Container Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props){
    super(props);
    
    this.info = {
      iResidence: '',      
      sGender: '',
      iAge: '',
      sEducation: '',
      sMoneyType: '',
      sTax: '',
      iHowMany: ''
    }

    this.state = {
      clearPostal: false,
      clearSelect: false,
      taxList: [],
      new: 0
    }
    this.scrollHeight = 0;
    this.deviceHeight = Dimensions.get("window").height;
  }

  /**
    * componentDidMount-React Default Event
    * @return {void}
    */
  componentDidMount() {
    let taxNorList = tax.map((item, key)=>{
      return {'label': item.name, value: key};
    })
    this.setState({
      taxList: taxNorList
    })
  }

  /**
    * Go to scroll pos
    * @return {void}
    */
  goPos(infoIndex){
    var handle = findNodeHandle(this.refs[infoIndex+"Ref"]);
    RCTUIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      this.refs._scrollView.scrollTo({x:0, y:pageY+this.scrollHeight-this.deviceHeight, animated:true});
    });
  }

  /**
    * Handle Start Activity Click Event
    * @return {void}
    */
  startActivity(){
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
    this.props.setDemographics( this.info );
    setPersonalToFirebase(this.info);    
    Actions.indexsurvey();
  }

  /**
    * Check validate for user input data
    * @return {void}
    */
  checkValidate(){
    let res = true;
    for(var i in this.info){
      if(this.info[i]===""){
        return i;
      }
      if( i=="iAge" || i=="iHowMany"){
        if( !isNumeric(this.info[i]) )
          return i;
      }
    }
    return res;
  }

  /**
    * Get Postal code
    * @param {str} value - postal code
    * @return {void}
    */
  onChangePostalCode(value){
    this.info.iResidence = value;

    this.setState({
      clearSelect: true
    })
  }

  /**
    * Get Other Country
    * @param {str} value - other country
    * @return {void}
    */
  onChangeCountry(value){
    this.info.iResidence = value;

    this.setState({
      clearPostal: true
    })
  }

  /**
    * Get Gender
    * @param {str} value - gender
    * @return {void}
    */
  onChangeGender(value){
    this.info.sGender = value;
  }

  /**
    * Get Age
    * @param {str} value - Age
    * @return {void}
    */
  onChangeAge(value){
    this.info.iAge = value;
  }

  /**
    * Get Education
    * @param {str} value - education
    * @return {void}
    */
  onChangeEducation(value){
    this.info.sEducation = value;
  }

  /**
    * Get Tax
    * @param {str} value - tax
    * @return {void}
    */
  onChangeTax(value){
    this.info.sTax = value;
  }

  onChangeMoneyType(value){
    this.info.sMoneyType = value;
    this.info.sTax = "";

    let taxNorList = tax.map((item, key)=>{
      return {'label': item.name, value: key};
    })
    let taxEuroList = taxEuro.map((item, key)=>{
      return {'label': item.name, value: key};
    })
    let taxUsdList = taxUsd.map((item, key)=>{
      return {'label': item.name, value: key};
    })

    if( value == "NOK" ){
      this.setState({
        taxList: taxNorList,
        new: this.state.new + 1
      })
    }else if(value == "€ EURO"){
      this.setState({
        taxList: taxEuroList,
        new: this.state.new + 1
      })
    }else if(value == "$ USD"){
      this.setState({
        taxList: taxUsdList,
        new: this.state.new + 1
      })
    }
  }

  /**
    * Get How many times
    * @param {str} value - times
    * @return {void}
    */
  onChangeHowMany(value){
    this.info.iHowMany = value;    
  }

  /**
   * Render Demographics page
   * @return {jsxresult} result in jsx format
   */
  render() {    
    let genderList = gender.map((item, key)=>{
      return {'label': item.name, value: key};
    });
    let educationList = education.map((item, key)=>{
      return {'label': item.name, value: key};
    })
    let moneyTypeList = moneyType.map((item, key)=>{
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
            <Text style={styles.headTextContainer}>Personal Information</Text>
            <View style={styles.item} ref="iResidenceRef" collapsable={false}>
              <Text style={styles.questionTextContainer}>1. What is your country of residence? (*)</Text>
              <Text style={styles.questionTextContainer}>Choose only 1</Text>
              <InputText
                placeholder="Post code"
                floattext="Norway? Postal code:"
                handleChangeText={this.onChangePostalCode.bind(this)}
                clear={this.state.clearPostal}
                cClear={()=>this.setState({clearPostal: false})}
              />
              <SelectBox
                placeholder="Other Country"
                floattext="Other Country:"
                handleChangeText={this.onChangeCountry.bind(this)}
                clear={this.state.clearSelect}
                cClear={()=>this.setState({clearSelect: false})}
              />
            </View>
            <View style={styles.item} ref="sGenderRef" collapsable={false}>
              <Text style={styles.questionTextContainer}>2. What is your gender? (*)</Text>
              <ItemList items={genderList} handleChangeItem = {this.onChangeGender.bind(this)} />
            </View>
            <View style={styles.item} ref="iAgeRef" collapsable={false}>
              <Text style={styles.questionTextContainer}>3. What is your age? (*)</Text>
              <InputText placeholder="Age" handleChangeText={this.onChangeAge.bind(this)} />
            </View>
            <View style={styles.item} ref="sEducationRef" collapsable={false}>
              <Text style={styles.questionTextContainer}>4. What is the highest education level you have completed? (*)</Text>
              <Text style={styles.questionTextContainer}>Choose only 1</Text>
              <ItemList items={educationList} handleChangeItem = {this.onChangeEducation.bind(this)} />
            </View>
            <View style={{marginTop:20}} collapsable={false} ref="sMoneyTypeRef">
              <Text style={styles.questionTextContainer}>5. What was the approximate total after-tax income of your household for year 2016? (*)</Text>
              <Text style={styles.questionTextContainer}>Choose only 1 [optional question]</Text>              
              <FlatList items={moneyTypeList} handleChangeItem = {this.onChangeMoneyType.bind(this)} />
            </View>
            <View style={{marginBottom:37}} ref="sTaxRef" collapsable={false}>
              <ItemList items={this.state.taxList} handleChangeItem = {this.onChangeTax.bind(this)} new={this.state.new} />
            </View>
            <View style={styles.item} ref="iHowManyRef" collapsable={false}>
              <Text style={styles.questionTextContainer}>6. How many times in the past have you visited this area? (*)</Text>
              <InputText handleChangeText={this.onChangeHowMany.bind(this)} />
            </View>
            <View style={styles.item}>
              <Text style={styles.headTextContainer}>Now you are ready to track your activity. Please do not stop tracking until you completely finish the activity. We would like you to create waypoints of places and tag them according to what you like or dislike in the place.</Text>
            </View>
            <View style={{marginLeft:20, marginRight:20, marginBottom:20}}>
              <Button onPress={this.startActivity.bind(this)}>Start activity</Button>              
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
    marginBottom:28
  },
  questionTextContainer: {
    color: '#E4151F',
    fontSize: 20,
    fontFamily:'Roboto-Bold',
    marginLeft:20,
    marginRight:20
  },
  item:{
    marginBottom:60,
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
    personalInfo: state.demographics.personalInfo
  };
};

/**
 * Map Redux dispatches to component props
 * @param {object} dispatch Redux dispatches
 * @return {json} dispatch-json from redux dispatche
 */
const mapDispatchToProps = (dispatch) => {
  return {
    setDemographics: (personalInfo) => {
      return dispatch(setDemographics(personalInfo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Demographics);

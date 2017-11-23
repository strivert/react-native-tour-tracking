import React, {Component} from 'react';
import ReactNative from 'react-native';
import ButtonCircle from '../components/ButtonCircle';
import InputText from '../components/InputText';
import InputTextArea from '../components/InputTextArea';
import SelectBox from '../components/SelectBox';
import TagList from '../components/TagList';
import ButtonWhite from '../components/ButtonWhite';
import {Motion, spring} from 'react-motion';
import { Actions } from 'react-native-router-flux';

import {connect} from 'react-redux';
import {  
  setPoint
} from '../actions/point';
import {setPointToFirebase} from '../utils/firebase';
import likePoints from '../constants/likePoints';
import dislikePoints from '../constants/dislikePoints';
import config from '../../config';

import Spinner from 'react-native-loading-spinner-overlay';
const {
  Image,
  StyleSheet,
  Text,
  View,  
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
  Alert,
  Platform
} = ReactNative;

var { RNLocation: Location } = require('NativeModules');

/**
 * Container component for PointLike page
 */
class PointLike extends Component {

  /**
    * PointLike Container Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props) {
    super(props);
    this.info = [];    
    this.location = {
      "lat": 0,
      "long": 0
    }

    this.state = {
      visible: false
    };
  }

  /**
    * Handle back event
    * save info into State, Firebase
    * @return {void}
    */
  onBackToActivity() {
    let dateTime = Math.floor(Date.now() / 1000);
    this.info["dateTime"] = dateTime;
    this.info["mode"] = this.props.mode;

    this.info["lat"] = this.location.lat;
    this.info["long"] = this.location.long;
    this.info["stage"] = this.props.stage;    
    setPointToFirebase(this.info, dateTime);
    this.props.setPoint(this.info);
    
    Actions.activity();
  }

  /**
    * Get point items from tagList
    * @param {json} points Selected Point items.
    * @return {void}
    */
  getPoint(points) {
    this.info = points;    
  }

  /**
    * Stop Location
    * @return {void}
    */
  stopLocationIOS() {

    if( this.location.lat === 0  ){
      Alert.alert(
        config.LOCATION_ERROR_TITLE,
        config.LOCATION_ERROR_CNT,
        [
          {text: 'OK', onPress: () => {
            this.setState({
              visible: false
            });

            Actions.activity();

          } }
        ]
      )

    }
  }

  /**
    * Stop Location
    * @return {void}
    */
  stopLocation() {
    if( this.location.lat === 0  ){
      Alert.alert(
        config.LOCATION_ERROR_TITLE,
        config.LOCATION_ERROR_CNT,
        [
          {text: 'OK', onPress: () => {} }
        ]
      )

      this.setState({
        visible: false
      });

      Location.stopUpdatingLocation();      
      Actions.activity();
    }
  }

  /**
    * Get location
    * @return {void}
    */
  componentDidMount(){

    if( Platform.OS!= 'ios'){
      this.setState({
        visible: true
      });
      setTimeout(this.stopLocation.bind(this), 30000);

      Location.startUpdatingLocation();

      var subscription = DeviceEventEmitter.addListener(
        'locationUpdated',
          (location) => {
            if( this.location.long === 0){
              this.location.long = location.longitude;
              this.location.lat = location.latitude;
              this.setState({
                visible: false
              });
            }
          }
      );
    } else {

      this.setState({
        visible: true
      }, ()=>{

        navigator.geolocation.getCurrentPosition(
          (position) => {        
            this.location.lat = parseFloat(position.coords.latitude);
            this.location.long = parseFloat(position.coords.longitude);
            
            this.setState({
              visible: false
            });

          },
          (error) => {
            this.stopLocationIOS();
          },
          {enableHighAccuracy: true, timeout: 30000, maximumAge:0}
        );

      });

      

    }
  }

  /**
   * Render PointLike page
   * @return {jsxresult} result in jsx format
   */
  render() {

    const {mode} = this.props;    

    let likePointsList = likePoints.map((item, key)=>{
      return {'label': item.name, value: key};
    });

    let dislikePointsList = dislikePoints.map((item, key)=>{
      return {'label': item.name, value: key};
    });
    
    return (
      <View
        style={styles.container}>
        <Spinner visible={this.state.visible} textContent={config.LOCATION_LOADING_TEXT} textStyle={{color: '#FFF'}} />
        {
          /*
        <View style={{flex:1.5, alignItems:'center', flexDirection: 'row', marginLeft:20}}>
          <ButtonCircle onPress={this.onBackToActivity.bind(this)} mode="prev-white" />
        </View>
          */
        }        
        <View style={{flex:1, justifyContent: 'center', marginTop:20, marginBottom:20}}>
          { 
            (mode=="like")?
              <TagList items={likePointsList} mode={mode} getPoint={this.getPoint.bind(this)} />
            :
              <TagList items={dislikePointsList} mode={mode} getPoint={this.getPoint.bind(this)} />
          }
          <View style={{marginLeft:20, marginRight:20}}>
            <ButtonWhite onPress={this.onBackToActivity.bind(this)}>SAVE</ButtonWhite>
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
    justifyContent: 'space-between'    
  }  
});

/**
 * Map Redux store state to component props
 * @param {state} state Redux store state
 * @return {json} state json State from redux store state
 */
const mapStateToProps = (state) => {    
  return {
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
    setPoint: (pointInfo) => {
      return dispatch(setPoint(pointInfo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PointLike);

import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Motion, spring} from 'react-motion';
import { Actions } from 'react-native-router-flux';

import {connect} from 'react-redux';
import {  
  setPoint
} from '../actions/point';
import {setPointToFirebase} from '../utils/firebase';
import config from '../../config';
import Spinner from 'react-native-loading-spinner-overlay';

const {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  DeviceEventEmitter,
  Platform
} = ReactNative;

var { RNLocation: Location } = require('NativeModules');

/**
 * Container component for IndexSurvey page
 */
class IndexSurvey extends Component {

  /**
    * IndexSurvey Container Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props){
    super(props);

    this.stopLocation.bind(this);
    this.location = {
      "lat": 0,
      "long": 0
    }

    this.state = {
      visible: false
    };

  }

  /**
    * Go Activity Page    
    * @return {void}
    */
  goActivity(){    

    // start
    if(!this.props.continue){

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

                let info = {};
                let dateTime = Math.floor(Date.now() / 1000);
                info["dateTime"] = dateTime;
                info["mode"] = "start";

                info["lat"] = this.location.lat;
                info["long"] = this.location.long;
                info["stage"] = this.props.stage;      

                setPointToFirebase(info, dateTime);
                this.props.setPoint(info);

                this.setState({
                  visible: false
                });
                Actions.activity();
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
              

              let info = {};
              let dateTime = Math.floor(Date.now() / 1000);
              info["dateTime"] = dateTime;
              info["mode"] = "start";

              info["lat"] = this.location.lat;
              info["long"] = this.location.long;
              info["stage"] = this.props.stage;      

              setPointToFirebase(info, dateTime);
              this.props.setPoint(info);

              this.setState({
                visible: false
              });
              Actions.activity();



            },
            (error) => {
              this.stopLocationIOS();
            },
            {enableHighAccuracy: true, timeout: 30000, maximumAge:0}
          );

        });

        

      }

    }else{
      // continue
      Actions.activity();
    }
    
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
    }
  }

  /**
   * componentDidMount - React default event
   * @return {void}
   */
  componentDidMount(){    
    // start
    if( !this.props.continue ){
      /*
      navigator.geolocation.getCurrentPosition(
        (position) => {        
          this.location.lat = parseFloat(position.coords.latitude);
          this.location.long = parseFloat(position.coords.longitude);
        },
        (error) => {
          this.location.lat = 0;
          this.location.long = 0;
        },
        { enableHighAccuracy: false }
      );
      */
    }
  }

  /**
   * Render IndexSurvey page
   * @return {jsxresult} result in jsx format
   */
  render() {

    let startText = "START ACTIVITY";
    if( this.props.continue )
      startText = "CONTINUE ACTIVITY";

    return (
      
      <View
        style={styles.container}>
        <Spinner visible={this.state.visible} textContent={config.LOCATION_LOADING_TEXT} textStyle={{color: '#FFF'}} />
        <View style={{flex:1, alignItems: 'center'}}>
          <Image source={require('../assets/jotunheimen-logo.png')} style={{flex:1, width:280, resizeMode:'contain'}} />
        </View>
        <View style={{flex:1}}>          
          <TouchableOpacity style={styles.button} onPress={this.goActivity.bind(this)}>
            <Text style={styles.whiteFont}>{startText}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:1}}>
          <TouchableOpacity style={[styles.button, styles.instructBtn]} onPress={()=>{Actions.instruction();}}>
            <Text style={styles.whiteFont}>INSTRUCTIONS</Text>
          </TouchableOpacity>
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
  button: {
    backgroundColor: '#01743D',    
    alignItems: 'center',
    borderWidth: 0,
    width:'100%',
    height:'100%',
    justifyContent:'center'
  },
  whiteFont: {
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    fontSize: 32
  },
  instructBtn: {
    backgroundColor: '#56BD2D'
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

export default connect(mapStateToProps, mapDispatchToProps)(IndexSurvey);

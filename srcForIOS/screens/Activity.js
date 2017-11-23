import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Motion, spring} from 'react-motion';
import { Actions } from 'react-native-router-flux';
import ButtonRedFlat from '../components/ButtonRedFlat';
import ButtonRedBorder from '../components/ButtonRedBorder';
import Modal from 'react-native-modalbox';

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
  Button,
  ScrollView,
  DeviceEventEmitter,
  Alert,
  Platform
} = ReactNative;

var { RNLocation: Location } = require('NativeModules');

/**
 * Container component for Activity page
 */
class Activity extends Component {

  /**
    * Activity Container Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props) {
    super(props);
    this.location = {
      "lat": 0,
      "long": 0
    }

    this.state = {
      visible: false
    };
  }

  /**
    * Date format
    * @param {int} time stamp
    * @return {void}
    */
  dateFormat(val) {
    let now = new Date(val*1000);
  
    let year = now.getFullYear();
    let month = now.getMonth()+1;
    let date = now.getDate();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    minutes = (minutes<10) ? ("0" + minutes) : minutes;

    let dateStr = date+'.'+month+'.'+year+' '+hours+':'+minutes;
    return dateStr;
  }

  /**
    * Show finish modal
    * @return {void}
    */
  finishActivity() {   
    this.refs.modal3.open();
  }

  saveFinishInfo() {
    let info = {};
    let dateTime = Math.floor(Date.now() / 1000);
    info["dateTime"] = dateTime;
    info["mode"] = "finish";

    info["lat"] = this.location.lat;
    info["long"] = this.location.long;
    info["stage"] = this.props.stage;      

    setPointToFirebase(info, dateTime);
    this.props.setPoint(info);

    this.setState({
      visible: false
    });
    if (this.props.personalInfo.iResidence == undefined) {
      Actions.demographics();
    } else {
      Actions.trackingsurvey();      
    }
  }

  /**
    * Go next page, Survey page
    * @return {void}
    */
  goSurvey() {

    if( !this.props.continue ){

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
                this.saveFinishInfo();                
              }
            }
        );
      }else{

        this.setState({
          visible: true
        }, ()=>{

          navigator.geolocation.getCurrentPosition(
            (position) => {        
              this.location.lat = parseFloat(position.coords.latitude);
              this.location.long = parseFloat(position.coords.longitude);
              this.saveFinishInfo();
            },
            (error) => {
              this.stopLocationIOS();
            },
            {enableHighAccuracy: true, timeout: 30000, maximumAge:0}
          );

        });

      }

    }

    
  }

  /**
    * Stop Location
    * @return {void}
    */
  stopLocationIOS() {

    if( this.location.lat === 0  ){
      /*
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
      )*/    
      this.setState({
        visible: false
      }, ()=>{
        this.saveFinishInfo();
      });
    }
  }

  /**
    * Stop Location
    * @return {void}
    */
  stopLocation() {

    if( this.location.lat === 0  ){
      /*
      Alert.alert(
        config.LOCATION_ERROR_TITLE,
        config.LOCATION_ERROR_CNT,
        [
          {text: 'OK', onPress: () => {} }
        ]
      )
      */
      
      this.setState({
        visible: false
      },()=>{
        Location.stopUpdatingLocation();        
        this.saveFinishInfo();
      });      
      
    }
  }

  /**
    * Get location
    * @return {void}
    */
  componentDidMount(){    
    // start
    /*
    if( !this.props.continue ){
      setTimeout(this.stopLocation, 10000);

      Location.startUpdatingLocation();

      var subscription = DeviceEventEmitter.addListener(
        'locationUpdated',
          (location) => {
            this.location.long = location.longitude;
            this.location.lat = location.latitude;              
          }
      );
    }
    */
  }

  /**
   * Render Activity page
   * @return {jsxresult} result in jsx format
   */
  render() {   

    const {pointInfo}  = this.props;
    let likeList = null;

    likeList = pointInfo.map((item, index)=>{
      if( item.stage != this.props.stage || item.mode=="start" || item.mode=="finish" )
        return null;

      let activityMode = item.mode;
      let smileIcon = null;
      if( activityMode == "like"){
        smileIcon = ( <Image style={{resizeMode: 'contain', height:30}} source={require('../assets/smile-small.png')} /> );
      }else{
        smileIcon = ( <Image style={{resizeMode: 'contain', height:30}} source={require('../assets/sad-small.png')} /> );
      }

      let pointText = "";
      for(var key in item){
        if( key == "dateTime" || key == "mode" || key == "lat" || key == "long" || key == "stage")
          continue;
        pointText += item[key] + ", ";
      }
      pointText = pointText.slice(0, -2);

      return (
        <TouchableOpacity key={index} onPress={()=>{Actions.pointedit({mode: activityMode, selectedIndex: index }) }}>
          <View style={{flex:1, flexDirection: 'row', marginBottom:15}}>
            <View style={{flex:0.2, justifyContent:'center', alignItems:'center'}}>
              {smileIcon}
            </View>
            <View style={{flex:0.8, justifyContent:'center'}}>
              <Text style={{fontFamily:'Roboto-Bold', color: 'black', fontSize: 14}}>{this.dateFormat(item.dateTime)}</Text>              
              <Text style={{fontFamily:'Roboto-Bold', color: 'black', fontSize: 14, marginRight:20}}>{pointText}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    });

    likeList = likeList.filter(function(n){ return n != null });
    likeList = likeList.reverse();
    
    return (
      
      <View
        style={styles.container}>
        <Spinner visible={this.state.visible} textContent={config.LOCATION_LOADING_TEXT} textStyle={{color: '#FFF'}} />
        <ScrollView>
          <View style={{}}>
            <TouchableOpacity style={styles.button} onPress={()=>{Actions.pointlike({mode:'like'});}}>
              <View style={{flex:1, flexDirection: 'row'}}>
                <View style={{flex:0.3, justifyContent:'center', alignItems:'center'}}>
                  <Image style={{resizeMode: 'contain', height:'80%'}} source={require('../assets/smile-big.png')} />
                </View>
                <View style={{flex:0.7, justifyContent:'center'}}>
                  <Text style={styles.whiteFont}>I LIKE THIS AREA</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{}}>          
            <TouchableOpacity style={[styles.button, styles.redBtn]} onPress={()=>{Actions.pointlike({mode:'dislike'});}}>
              <View style={{flex:1, flexDirection: 'row'}}>
                <View style={{flex:0.3, justifyContent:'center', alignItems:'center'}}>
                  <Image style={{resizeMode: 'contain', height:'80%'}} source={require('../assets/sad-big.png')} />
                </View>
                <View style={{flex:0.7, justifyContent:'center'}}>
                  <Text style={styles.whiteFont}>I DISLIKE THIS AREA</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <Text style={styles.descText}>
              Track your activity. The activity could take from few minutes jogging, fishing, hiking... to several days backpacking in nature for several days. Do not stop tracking until you completely finish the activity. Mark interesting waypoints and tag non-material benefits.
            </Text>
          </View>
          <View style={{}}>
            <ButtonRedBorder onPress={this.finishActivity.bind(this)}>FINISH ACTIVITY</ButtonRedBorder>
            <View style={{height:20}}>
            </View>
            {( likeList.length == 0 ) && (<ButtonRedFlat onPress={()=>{Actions.indexsurvey({continue:true});}}>Cancel</ButtonRedFlat> )}
          </View>
          
          {(likeList.length != 0 ) && likeList}
          
        </ScrollView>

        <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} >
          <Text style={{color:'black', marginBottom: 20, fontSize: 18, textAlign: 'center', fontFamily:'Roboto-Regular'}}>Are you sure you want to end journey and send the waypoints?</Text>
          <TouchableOpacity style={{margin: 20, borderWidth: 2,borderRightWidth: 4, borderBottomWidth: 4}} onPress={this.goSurvey.bind(this)}>
            <Text style={{color:'black', padding: 10, fontSize: 15, textAlign: 'center', fontFamily:'Roboto-Regular'}}>
            {
              (this.props.personalInfo.iResidence == undefined)?'Yes, end journey and go to demographics':'Yes, end journey and go to questionnaires'
            }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{margin:20}} onPress={()=>{ this.refs.modal3.close() }} >
            <Text style={{color:'#2e4a6b', fontSize: 15, fontFamily:'Roboto-Regular', textDecorationLine:'underline'}} >No, continue adding waypoints</Text>
          </TouchableOpacity>
        </Modal>
      </View>
      
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',    
    flexDirection: 'column',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#01743D',    
    borderWidth: 0,
    width:'100%',
    height:100
  },
  redBtn: {
    backgroundColor: '#E4151F'
  },
  whiteFont: {
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    fontSize: 24
  },
  descText: {
    color: '#01743D',
    margin:20,
    marginRight:15,
    lineHeight:24,
    fontFamily: 'Roboto-Regular',
    fontSize:15
  },
  instructBtn: {
    backgroundColor: 'green'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,    
    borderColor: 'black',    
    padding:20
  },
  modal3: {
    height: 300,
    width: '85%'
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  }
});

/**
 * Map Redux store state to component props
 * @param {state} state Redux store state
 * @return {json} state json State from redux store state
 */
const mapStateToProps = (state) => {    
  return {
    personalInfo: state.demographics.personalInfo,
    pointInfo: state.point.pointInfo,
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

export default connect(mapStateToProps, mapDispatchToProps)(Activity);

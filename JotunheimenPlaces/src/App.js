import React, {Component} from 'react';
import ReactNative from 'react-native';
import {ActionConst, Scene, Router} from 'react-native-router-flux';
import Welcome from './screens/Welcome';
import Consent from './screens/Consent';
import Instruction from './screens/Instruction';
import Demographics from './screens/Demographics';
import IndexSurvey from './screens/IndexSurvey';
import Activity from './screens/Activity';
import TrackingSurvey from './screens/TrackingSurvey';
import End from './screens/End';
import PointLike from './screens/PointLike';
import PointEdit from './screens/PointEdit';
import {connect} from 'react-redux';
import {setLocalToFirebase} from './utils/firebase';
import {Platform} from 'react-native';

const { StyleSheet, Text, View } = ReactNative;

/**
 * High Level Container
 */
class App extends Component {

  /**
    * App Container Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setLocalToFirebase( this.props.personalInfo, this.props.pointInfo, this.props.surveyInfo );    
  }

  /**
   * Render a page(screen)
   * @return {jsxresult} result in jsx format
   */
  render() {
    // find First Page

    let welcomeInitial = false;
    let indexSurveyInitial = false;
    let activityContinue = false;
    let trackingSurveyInitial = false;

    if(this.props.personalInfo.iResidence == undefined)
      welcomeInitial = true;
    else
      indexSurveyInitial = true;
    
    
    if(this.props.pointInfo.length !== 0){
      let lastStage = this.props.pointInfo[this.props.pointInfo.length-1]["stage"];
      let mode = this.props.pointInfo[this.props.pointInfo.length-1]["mode"];
      if( lastStage == this.props.stage ){
        activityContinue = true;        
      }

      if( mode == "finish"){
        trackingSurveyInitial = true;
        welcomeInitial = false;
        indexSurveyInitial = false;
      }

      if( lastStage < this.props.stage ){
        indexSurveyInitial = true;        
        trackingSurveyInitial = false;
        welcomeInitial = false;
      }
    }
    
    let statusStyle = [];
    if( Platform.OS == 'ios'){
      statusStyle = [styles.iOsStatusBar];
    }

    return ( 
      <Router>
        <Scene key="root" hideNavBar={true} hideTabBar={true} hideOnChildTabs={true} style={statusStyle}>
          <Scene key="instruction" component={Instruction} />
          <Scene key="welcome" component={Welcome} initial={welcomeInitial} />
          <Scene key="consent" component={Consent} />
          <Scene key="demographics" component={Demographics} />
          <Scene key="indexsurvey" component={IndexSurvey} initial={indexSurveyInitial} continue={activityContinue}/>
          <Scene key="activity" component={Activity}  />
          <Scene key="trackingsurvey" component={TrackingSurvey} initial={trackingSurveyInitial} />
          <Scene key="end" component={End} />
          <Scene key="pointlike" component={PointLike} />
          <Scene key="pointedit" component={PointEdit} />
        </Scene>
      </Router>
    );
  }
}

let styles = StyleSheet.create({
  iOsStatusBar: {
   marginTop:20 
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
    surveyInfo: state.survey.surveyInfo,
    stage: state.survey.stage,
  };
};

export default connect(mapStateToProps, null)(App);

import { initializeApp } from 'firebase';
import config from '../../config';
import DeviceInfo from 'react-native-device-info';

const firebaseApp = initializeApp({
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  databaseURL: config.DATABASE_URL,
  storageBucket: config.STORAGE_BUCKET
})

export function setLocalToFirebase(personalInfo, pointInfo, surveyInfo) {
  /*
  let testData = {
    
      "1497418859": {
        item_0: 'Undisturbed nature',
        item_1: 'Aesthetic/scenic',
        item_2: 'Recreation activities',
        dateTime: 1497418859,
        mode: 'like'
      }
    ,    
      "1497418866": {
        item_0: 'Undisturbed nature',
        item_1: 'Aesthetic/scenic',
        item_2: 'Recreation activities',
        dateTime: 1497418866,
        mode: 'dislike'
      }
    
  };
  */

  // personalInfo
  const subRecordsRef = firebaseApp.database().ref('personal/' + DeviceInfo.getUniqueID() + '/');
  subRecordsRef.set( personalInfo );


  // pointInfo
  let pointInfoForFirebase = {};
  //console.log(pointInfo);
  pointInfo.filter((item, index)=>{
    pointInfoForFirebase[item.dateTime+'-'+item.stage] = item;
  });

  const subPointRef = firebaseApp.database().ref('point/' + DeviceInfo.getUniqueID() + '/');
  subPointRef.set( pointInfoForFirebase );

  // surveyInfo
  let surveyInfoForFirebase = {};
  surveyInfo.filter((item, index)=>{
    surveyInfoForFirebase[item.dateTime+'-'+item.stage] = item;
  });

  const subSurveyRef = firebaseApp.database().ref('survey/' + DeviceInfo.getUniqueID() + '/');
  subSurveyRef.set( surveyInfoForFirebase );

}

export function setPersonalToFirebase(info){
  const subRecordsRef = firebaseApp.database().ref('personal/' + DeviceInfo.getUniqueID() + '/');
  subRecordsRef.set( info );
}

export function setSurveyToFirebase(info){
  let dateTime = Math.floor(Date.now() / 1000)
  const subRecordsRef = firebaseApp.database().ref('survey/' + DeviceInfo.getUniqueID() + '/' + info.dateTime+'-'+info.stage + '/');
  subRecordsRef.set( info );
}

export function setPointToFirebase(info) {
  const subRecordsRef = firebaseApp.database().ref('point/' + DeviceInfo.getUniqueID() + '/' + info.dateTime+'-'+info.stage + '/');
  subRecordsRef.set( info );
}

export function delPointToFirebase(dateTime, stage) {
  const subRecordsRef = firebaseApp.database().ref('point/' + DeviceInfo.getUniqueID() + '/');
  subRecordsRef.child( dateTime+'-'+stage ).remove();
}

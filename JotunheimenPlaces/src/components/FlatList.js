import React, { Component } from 'react';

import ReactNative from 'react-native';
const {  
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableHighlight
} = ReactNative;
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import InputText from './InputText';

/**
 * ItemList component
 */
export default class FlatList extends Component {

  /**
    * ItemList Component Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props){
    super(props);
    this.state = {
      value3Index: null,
      value3: null
    }
  }  

  /**
   * Handles the event when a item is pressed
   * @param {str} value
   * @param {int} index
   * @return {void}
   */
  onPress(value, index) {
    this.setState({
      value3: value,
      value3Index: index
    })

    this.props.handleChangeItem(value.label);
  }

  onChangeOther(value){
    this.props.handleChangeItem(value);
  }

  /**
   * Render Lists
   * @return {jsxresult} result in jsx format
   */
  render() {
    let {items} = this.props;

    return (
      <View>
        <RadioForm animation={true}>
          <View style={styles.itemList}>
          {items.map((obj, i) => {            
            
            let radioStyle = (this.state.value3Index === i)?[styles.radio, styles.bg]:[styles.radio];
            if( i==0 )
              radioStyle = radioStyle.concat([styles.radioFirst]);

            let radioLabelStyle = (this.state.value3Index === i)?[styles.radioLabel, styles.bold]:styles.radioLabel;
            return (              
              <View key={i} style={radioStyle}>
                <RadioButton key={i} style={{}}>
                  <Text onPress={this.onPress.bind(this, obj, i)} style={radioLabelStyle}>{obj.label}</Text>
                </RadioButton>                
              </View>                
            )
          })}
          </View>
        </RadioForm>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  itemList: {
    marginTop:20,
    marginLeft:20,
    marginRight:20,    
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  list:{
    flex: 1,
    flexDirection: 'column',
    margin:0
  },
  radio: {    
    flex:0.3,
    borderWidth:1,
    paddingTop:10,
    paddingBottom:5,
    borderLeftWidth:0,
    backgroundColor:'#EFEFEF'
  },
  radioFirst: {
    borderLeftWidth:1
  },
  bg:{
    backgroundColor:'#D0DB05'
  },
  radioLabel: {
    fontSize: 20, 
    color: '#01743D', 
    textAlign: 'center'
  },
  bold: {
    fontWeight:'bold'
  }
});

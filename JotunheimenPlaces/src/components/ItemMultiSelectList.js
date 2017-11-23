import React, { Component } from 'react';

import ReactNative from 'react-native';
const {  
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback
} = ReactNative;
import InputText from './InputText';
import CheckBox from 'react-native-checkbox';
import update from 'react-addons-update';

/**
 * ItemList component
 */
export default class ItemMultiSelectList extends Component {

  /**
    * ItemList Component Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props){
    super(props);
    this.state = {
      value3Index: [],
      viewOther: false,
      otherText: ""
    }
  }  

  /**
   * Handles the event when a item is pressed
   * @param {str} value
   * @param {int} index
   * @return {void}
   */
  onPress(value, index) {
    
    if (this.state.value3Index.indexOf(index) === -1) {
      this.setState(
        update(this.state, {
          value3Index: {
            [this.state.value3Index.length]: {$set: index}
          }
        }), this.setPropsItem
      )
    } else {
      this.setState(
        update(this.state, {
          value3Index: {
            $splice: [[this.state.value3Index.indexOf(index), 1]]
          }
        }), this.setPropsItem
      )
    }

    if(value.label == 'Other'){
      if( this.state.value3Index.indexOf(this.props.items.length-1) !==-1 ){
        this.setState({
          viewOther: false,
          otherText: ""
        })
      }else{
        this.setState({
          viewOther: true
        })      
      }
    }
  }

  setPropsItem(){
    let selectedStr = "";
    this.state.value3Index.map((i,index)=>{
      if( i== this.props.items.length-1){
        if( this.state.otherText !== "" )
          selectedStr += this.state.otherText +", ";
        else
          selectedStr += "Other" +", ";
      }else
        selectedStr += this.props.items[i].label +", ";
    })    
    this.props.handleChangeItem( selectedStr.slice(0, -2) );
  }

  onChangeOther(value){
    this.setState({
      otherText: value
    })
    this.setPropsItem();
  }

  /**
   * Render Lists
   * @return {jsxresult} result in jsx format
   */
  render() {
    let {items} = this.props;

    let otherInput = null;
    if ( (items.length) && items[items.length-1].label == 'Other' ){
      otherInput = (
        <View style={{marginTop:-10}}>
          <InputText placeholder="Other" handleChangeText={this.onChangeOther.bind(this)} />
        </View>
      );
    }    

    return (
      <View style={styles.itemList}>
        
          {items.map((obj, i) => {            
            
            let radioStyle = null;
            let selectedIndex = this.state.value3Index.indexOf(i);
            let radioLabelStyle = [styles.radioLabel];

            if( selectedIndex !== -1 ) {
              if( i==0 )
                radioStyle =[styles.radio, styles.bg, styles.radioFirst];
              else
                radioStyle = [styles.radio, styles.bg];
              
              radioLabelStyle = [styles.radioLabel, styles.bold];
            }else{
              if( i==0 )
                radioStyle =[styles.radio, styles.radioFirst];
              else
                radioStyle = [styles.radio];
            }
            
            return (
              <View key={i} style={radioStyle}>
                <TouchableWithoutFeedback onPress={this.onPress.bind(this, obj, i)}>
                  <View key={i} style={styles.list}>
                    <View style={{flex:0.1, justifyContent:'center', flexDirection: 'row'}}>
                      <CheckBox
                        label=""
                        checked={(selectedIndex!==-1)?true:false}
                        containerStyle={{marginLeft:30}}
                        checkedImage={require('../assets/cb_enabled.png')}
                        uncheckedImage={require('../assets/cb_disabled.png')}
                        onChange={this.onPress.bind(this, obj, i)}
                      />
                    </View>
                    <View style={{flex:0.9}}>
                      <Text style={radioLabelStyle}>{obj.label}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )
          })}
        

        {(this.state.viewOther) && otherInput}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  itemList: {
    marginTop:20
  },
  list:{
    flex: 1,
    flexDirection: 'row',
    margin:0
  },
  radio: {
    borderWidth:1,
    paddingTop:10,
    paddingBottom:5,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,    
    backgroundColor:'#EFEFEF'
  },
  radioFirst: {
    borderTopWidth:1
  },
  bg:{
    backgroundColor:'#D0DB05'
  },
  radioLabel: {
    fontSize: 20, 
    color: '#01743D', 
    marginLeft: 20,
    fontFamily: 'Roboto-Regular',
    marginRight: 20
  },
  bold: {
    fontFamily: 'Roboto-Bold'
  }
});

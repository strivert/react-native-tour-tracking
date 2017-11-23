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
export default class ItemList extends Component {

  /**
    * ItemList Component Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props){
    super(props);
    this.state = {
      value3Index: null,
      viewOther: false
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
      value3Index: index
    })

    if(value.label == 'Other'){
      this.setState({
        viewOther: true
      })
    }else{
      this.setState({
        viewOther: false
      })      
    }

    this.props.handleChangeItem(value.label);
  }

  onChangeOther(value){
    this.props.handleChangeItem(value);
  }

  componentWillReceiveProps(nextProps){
    if( nextProps.new != this.props.new ){
      this.setState({
        value3Index: null
      })
    }
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
        <RadioForm animation={true}>
          {items.map((obj, i) => {            
            
            let radioStyle = null;

            if( this.state.value3Index === i ) {
              if( i==0 )
                radioStyle =[styles.radio, styles.bg, styles.radioFirst];
              else
                radioStyle = [styles.radio, styles.bg];
            }else{
              if( i==0 )
                radioStyle =[styles.radio, styles.radioFirst];
              else
                radioStyle = [styles.radio];
            }
            
            let radioLabelStyle = (this.state.value3Index === i)?[styles.radioLabel, styles.bold]:styles.radioLabel;
            return (              
              <View key={i} style={radioStyle}>
                <RadioButton key={i} style={{}}>
                  <View key={i} style={styles.list}>
                  {/*  You can set RadioButtonLabel before RadioButtonInput */}
                    <View style={{flex:0.1, justifyContent:'center'}}>
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={this.state.value3Index === i}
                        onPress={this.onPress.bind(this, obj, i)}
                        buttonInnerColor={'#01743D'}
                        buttonOuterColor={'#01743D'}
                        buttonSize={15}
                        buttonStyle={{marginLeft: 10}}
                        buttonWrapStyle={{}}
                      />
                    </View>
                    <View style={{flex:0.9}}>
                      <Text onPress={this.onPress.bind(this, obj, i)} style={radioLabelStyle}>{obj.label}</Text>                    
                    </View>
                  </View>
                </RadioButton>                
              </View>                
            )
          })}
        </RadioForm>

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

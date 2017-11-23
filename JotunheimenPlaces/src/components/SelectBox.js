import ModalPicker from 'react-native-modal-picker'
import React, { Component } from 'react';
import ReactNative from 'react-native';
const {  
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} = ReactNative;
import countries from '../constants/countries';

/**
 * SelectBox component
 */
export default class selectBox extends Component {
  
  /**
    * selectBox Component Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props) {
      super(props);

      this.state = {
          textInputValue: ''
      }
  }

  onChangeSelect(option){
    this.setState({
      textInputValue:option.label
    });
    this.props.handleChangeText(option.label);
  }
  
  componentWillReceiveProps(nextProps) {
    if( nextProps.clear === true )
    {
      this.setState({
        textInputValue: ''
      })
      this.props.cClear();
    }
  }

  /**
   * Render SelectBox
   * @return {jsxresult} result in jsx format
   */
  render() {
    let index = 0;
    const data = countries.map((item, index)=>{
    	return { key: index++, label: item.name };
    })

    return (
      <View style={styles.button}> 
        <ModalPicker
          data={data}
          initValue="Select something yummy!"
          onChange={this.onChangeSelect.bind(this)}>
        
          {
          this.props.floattext !="" && 
            (
              <Text style={styles.floatText}>{this.props.floattext}</Text>
            )
          }
          <TextInput
            style={{borderWidth: 1, borderColor: '#01743D', padding: 10, height: 40, fontSize: 18, color: 'black'}}
            editable={false}
            placeholder={this.props.placeholder}
            value={this.state.textInputValue} />            
        </ModalPicker>
      </View>
    );              
  }
}

const styles = StyleSheet.create({
  button: {    
    padding: 15,    
    paddingLeft: 0,
    borderWidth: 0,
    marginLeft: 20
  },
  floatText: {
    color: '#01743D',
    fontSize: 18
  }
});
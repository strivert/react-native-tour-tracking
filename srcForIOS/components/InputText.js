import React, { Component } from 'react';

import ReactNative from 'react-native';
const {  
  StyleSheet,
  Text,
  View,
  TextInput
} = ReactNative;

/**
 * InputText component
 */
class InputText extends Component {

  constructor(props){
    super(props);
    this.state = {
      textValue:""
    }
  }


  onChange(text) {
    this.setState({
      textValue: text
    })
    this.props.handleChangeText(text);
  }

  componentWillReceiveProps(nextProps) {
    if( nextProps.clear == true )
    {
      this.setState({
        textValue: ""
      })
      this.props.cClear();
    }
  }

  /**
   * Render InputText
   * @return {jsxresult} result in jsx format
   */
	render() {

		return (
			<View style={styles.button}>
          {
            this.props.floattext !="" && 
            (
              <Text style={styles.floatText}>{this.props.floattext}</Text>
            )
          }

          <TextInput 
            style={styles.whiteFont}
            underlineColorAndroid="transparent"
            placeholder={this.props.placeholder}
            onChangeText={this.onChange.bind(this)}
            value={this.state.textValue}
          />         
			</View>
		);
	}
}

const styles = StyleSheet.create({
  button: {
    padding: 15,    
    paddingLeft: 0,
    borderWidth: 0,
    marginLeft:20
  },
  whiteFont: {
    borderColor: '#01743D',
    borderWidth: 1,
    color: 'black',    
    fontSize: 18,
    height:40,
    paddingLeft:10
  },
  floatText: {
    fontFamily: 'Roboto-Regular',
    color: '#01743D',
    fontSize: 20
  }
});

export default InputText;

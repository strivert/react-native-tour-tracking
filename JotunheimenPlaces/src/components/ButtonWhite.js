import React, { Component } from 'react';

import ReactNative from 'react-native';
const {  
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} = ReactNative;

/**
 * Button component
 */
export default class ButtonWhite extends Component {

  /**
   * Render a Button
   * @return {jsxresult} result in jsx format
   */
	render() {
		return (
			<TouchableOpacity style={styles.button} onPress={this.props.onPress}>
				<Text style={styles.whiteFont}>{this.props.children}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    padding: 15,
    paddingTop:5,
    paddingBottom:5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
    width:'100%'
  },
  whiteFont: {
    color: '#333333',
    fontFamily: 'Roboto-Bold',
    fontSize: 32
  }
});
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
export default class Button extends Component {

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
    backgroundColor: '#01743D',
    padding: 15,
    alignItems: 'center',
    borderWidth: 0
  },
  whiteFont: {
    color: '#fff',
    fontFamily: 'Roboto-Light',
    fontSize: 20
  }
});
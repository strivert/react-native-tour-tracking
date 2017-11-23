import React, { Component } from 'react';

import ReactNative from 'react-native';
const {  
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} = ReactNative;

/**
 * ButtonRedFlat component
 */
export default class ButtonRedFlat extends Component {

  /**
   * Render ButtonRedFlat
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
    padding: 15,
    alignItems: 'center',
    borderWidth: 0
  },
  whiteFont: {
    color: '#E4151F',
    fontFamily: 'Roboto-Light',
    fontSize: 20
  }
});
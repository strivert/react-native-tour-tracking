import React, { Component } from 'react';

import ReactNative from 'react-native';
const {  
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} = ReactNative;

/**
 * ButtonCircle component
 */
export default class ButtonCircle extends Component {

  /**
   * Render a ButtonCircle
   * @return {jsxresult} result in jsx format
   */
	render() {    

    let imgBtn = null;
    if( this.props.mode === undefined )
      imgBtn = <Image source={require('../assets/next-blue.png')} />
    else if( this.props.mode == "prev-blue" )
      imgBtn = <Image source={require('../assets/prev-blue.png')} />
    else if (this.props.mode == "prev-white" )
      imgBtn = <Image source={require('../assets/prev-white.png')} />
    else
      imgBtn = <Image source={require('../assets/next-blue.png')} />

		return (
			<TouchableOpacity onPress={this.props.onPress}>
        {imgBtn}
			</TouchableOpacity>
		);
	}
}

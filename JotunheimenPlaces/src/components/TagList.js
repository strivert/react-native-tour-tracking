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
import InputText from './InputText';
import update from 'react-addons-update';

/**
 * TagList component
 */
export default class TagList extends Component {

  /**
    * TagList Component Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props){
    super(props);
    this.state = {
      selIds: []
    }
    
    this.performTag();
  }

  isContains(json, value) {
    let contains = false;
    Object.keys(json).some(key => {
        contains = typeof json[key] === 'object' ? _isContains(json[key], value) : json[key] === value;
         return contains;
    });
    return contains;
  }

  componentDidMount(){
    if (this.props.selectedIndex != undefined ){
      let selIds = [];
      this.props.items.map((item, index)=>{        
        if( this.isContains(this.props.pointData, item.label) ){          
          selIds.push(index);
        }
      });

      this.setState({
        selIds: selIds
      }, this.performTag);
    }
  }

  /**
   * Handles the event when a item is pressed
   * @param {int} key
   * @return {void}
   */
  goToSelect(key) {
    if( !this.state.selIds.includes(key) ){
      this.setState(
        update(this.state, {
          selIds: { $push: [key] }
        }), this.performTag
      );
    }else{
      let index = Object.keys(this.state.selIds)[Object.values(this.state.selIds).indexOf(key)];
      this.setState(
        update(this.state, {
          selIds: { $splice: [[index, 1]] }
        }), this.performTag
      );
    }    
  }

  performTag() {
    let tags = {};
    this.state.selIds.map((item, index)=>{
      tags["item_"+index] = this.props.items[item].label;
      return null;
    })
    this.props.getPoint(tags);
  }

  /**
   * Render TagList
   * @return {jsxresult} result in jsx format
   */
  render() {
    let {items, mode} = this.props;    

    return (
      <View style={{flex:1, marginLeft:20, marginRight:20}}>
        {items.map((obj, i) => {

          let btnStyle = [styles.button];
          if( this.state.selIds.includes(i) ){
            if( mode=="like" )
              btnStyle = [styles.button, styles.bgBlue];
            if( mode=="dislike" )
              btnStyle = [styles.button, styles.bgRed];
          }

          return (            
            <View key={i} style={styles.list}>
              <TouchableOpacity style={btnStyle} onPress={this.goToSelect.bind(this, i)}>
                <Text style={styles.whiteFont}>{obj.label}</Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    );
  }
}

var styles = StyleSheet.create({  
  list: {
    flex: 1
  },
  button: {
    backgroundColor: '#C0BAB6',
    alignItems: 'center',
    borderWidth: 0,
    width:'100%',
    height:'80%',
    justifyContent:'center'
  },
  whiteFont: {
    color: '#fff',    
    fontSize: 18,
    fontFamily: 'Roboto-Bold'
  },
  bgRed: {
    backgroundColor: '#E4151F'
  },
  bgBlue: {
    backgroundColor: '#01743D'
  }
});

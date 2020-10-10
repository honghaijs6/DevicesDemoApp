import numeral from 'numeral';

import React from 'react';
import { Input } from 'reactstrap';


class InputNumeral extends React.Component {


  constructor(props){
    super(props);

    this.state = {
      defaultValue:props.defaultValue || 0
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.setState({
      defaultValue:newProps.defaultValue
    });
    
  }

  _onChange(e){
    let value = e.target.value.replace(/,/g,'');
    let number = numeral(value).format('0,0');

    this.setState({
      defaultValue:number
    });

    if(this.props.onChange!== undefined){
      this.props.onChange(parseFloat(value)) ;
    }

  }

  render() {
    return (
      
      <Input 
        disabled={this.props.disabled} 
        onDoubleClick={this.props.onDoubleClick}
        style={this.props.style} onChange={ this._onChange } id={ this.props.id || 0 } 
        value={ numeral(this.state.defaultValue).format('0,0') } type="text" 
      />

    );
  }
}

export default InputNumeral  ;

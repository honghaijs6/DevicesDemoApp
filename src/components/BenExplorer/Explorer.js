
import React, { Component } from 'react';

import LeftSide from './LeftSide';



class Explorer extends Component{

  constructor(props){
    super(props);

    this.state = {
      typeAction:'',
      onAction:'',

      data:props.data || [],
      onTab:''
    }

    this._onClick = this._onClick.bind(this);
  }

  _onClick(data){

    this.state.data.map((item)=>{
      item.active = false;
    });

    this.state.data.map((item)=>{
      if(item.code === data.code){
        item.active = true;
        this.state.onTab = item.code;
      }
    });

    this.setState(this.state);

    this.props.onLeftSideChange(this.state.onTab);

  }

  render(){



    return(
      <div className="ubuntu-app mb-4"   style={this.props.style} >
        <LeftSide onClick={ this._onClick } {...this.state} />
        <main>
          { this.props.children }
        </main>
      </div>
    )
  }
}

export default Explorer;

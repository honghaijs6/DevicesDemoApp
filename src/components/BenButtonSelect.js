import React, { Component } from 'react';
import {
  Button,ButtonGroup
} from 'reactstrap';


class BenButtonSelect extends Component{

  constructor(props){
    super(props);

    this.state = {
      data:props.data
    }
    
  }

  _onSelect(key){
    // clear all active item
    let data = this.state.data ; 
    data.map((item,index)=>{
       delete item.active ; 
       if(parseInt(key)===index){
         item.active = true;
       }
    });

    this.setState({
      data:data
    });
    
    this.props.onSelectItem(key);

  }
  render(){

    
    return(
      <div className="clearfix" style={ this.props.style }>
        <ButtonGroup >
            {
              this.state.data.map((item,index)=>{

                let active =  item.active === true ? 'active' :'';
                
                return (
                  <Button key={index} 
                      onClick={()=>{ this._onSelect(index) }}  
                      className={ 'btn-ubuntu-select btn-ubuntu-select-'+active} >
                        <i className={'fa '+item.icon}></i> { item.name} 
                  </Button>
                )
              })
            }
            
        </ButtonGroup>
      </div>
    )
  }

}

BenButtonSelect.defaultProps = {
  data:[],
  onSelectItem:()=>{}
}

export default BenButtonSelect;

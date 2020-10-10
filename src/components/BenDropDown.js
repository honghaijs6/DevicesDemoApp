import React, { Component } from 'react';

class BenDropDown extends Component {

    state = {
        display:false
    }

    _onClick = ()=>{
        
        this.setState({
            display:!this.state.display
        });   

    }

    _handleClick = (e)=>{
        
        if(e.target.closest('.div-holder-filter')===null){
          if(this.state.display===true){
            this.setState({
              display: false
            });
          } 
        }
        
    }

    componentDidMount(){
        window.addEventListener('click',this._handleClick,false);
    }
    componentWillUnmount(){
        window.removeEventListener('click',()=>{},false);
    } 

    render() {

        const display = this.state.display === false ? 'none' : 'block' ; 
        return (
            <div className="div-holder-filter">
                <span onClick={this._onClick}>
                    { this.props.icon }
                </span>
                <div className="filter-holder" 
                    style={{display:display,padding:this.props.padding,width:this.props.width || 300, left:-this.props.width || -270}}
                >
                    { this.props.children }
                </div>
            </div>  
        );
    }
}

BenDropDown.defaultProps = {
    icon:<label>sdasd</label>
}


export default BenDropDown;
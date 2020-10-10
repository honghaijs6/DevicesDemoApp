
import doLoadSubRegion from '../hook/ultil/doLoadSubRegion' ; 

import PropTypes from 'prop-types';

import React from 'react';
import { Input  } from 'reactstrap';


class SelectSubRegion extends React.Component {

    constructor(props){
        super(props);
 
        
        this.state = {
            strModel:'subregions',
            name:props.name,
            rows:[],
            defaultValue:props.defaultValue || '',
            parent_code:props.parent_code,
            status:props.status

        }

    }


    componentWillReceiveProps(newProps){
        
        
        if(newProps.status!=='closed'){
            this.setState({   
                defaultValue:newProps.defaultValue
            });
            this._doLoadSubRegion(newProps.parent_code) ;
        }
        
    }

    
    _doLoadSubRegion(parent_code){

        doLoadSubRegion(parent_code,null,(res)=>{    
            if(res.name==='success'){
                this.setState({
                    rows:res.rows,
                    parent_code:parent_code
                });
            }    
        }); 
    }
    componentDidMount(){
        
        this._doLoadSubRegion(this.state.parent_code) ; 

    }

    render() {
        return (
            <Input id={this.props.id} value={ this.state.defaultValue } onChange={(e)=>{ this.props.onChange(e) }} type="select" style={ this.props.style || {} }>
                <option value=""> { this.state.name } </option>
                
                {
                    this.state.rows.map((item)=>{
                        return(
                            <option key={item.id} value={item.code}> { item.name } </option>
                        )
                    })
                }
            </Input>

        );
    }
}

SelectSubRegion.propTypes = {
    strModel:PropTypes.string,
    name:PropTypes.string,
    onChange:PropTypes.func,
    id:PropTypes.string,
    defaultValue:PropTypes.string,
    parent_code:PropTypes.string,
    status:PropTypes.string // trạng thái của form 
}

SelectSubRegion.defaultProps = {
    name:'Vui lòng chọn',
    onChange:function(){},
    id:'none',
    defaultValue:'',
    parent_code:'06',
    status:''
}


export default SelectSubRegion;

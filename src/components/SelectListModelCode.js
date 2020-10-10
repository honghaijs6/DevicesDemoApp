
import doLoadAll from '../hook/ultil/doLoadAll' ; 

import PropTypes from 'prop-types';

import React from 'react';
import { Input  } from 'reactstrap';


class SelectListModelCode extends React.Component {

    constructor(props){
        super(props);

        
        this.state = {
            strModel:props.strModel,
            name:props.name,
            rows:[],
            defaultValue:props.defaultValue || ''

        }

    }


    componentWillReceiveProps(newProps){
        this.setState({
            defaultValue:newProps.defaultValue
        });
        

    }

    async componentDidMount(){
        const res = await doLoadAll(this.state.strModel); 
        if(res.name==='success'){
            this.setState({
                rows:res.rows
            });
        }

    }

    render() {
        return (
            <Input 
                disabled={this.props.disabled}  
                id={this.props.id} value={ this.state.defaultValue }
                onChange={(e)=>{ this.props.onChange(e) }} type="select" style={ this.props.style || {} }
            >
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

SelectListModelCode.propTypes = {
    strModel:PropTypes.string,
    name:PropTypes.string,
    onChange:PropTypes.func,
    id:PropTypes.string
}

SelectListModelCode.defaultProps = {
    strModel:'categories',
    name:'Danh Mục',
    onChange:function(){},
    id:'none'
}


export default SelectListModelCode;

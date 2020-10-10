import React from 'react';
import PropTypes from 'prop-types';

import { Input  } from 'reactstrap';



const SelectList = (props)=>{

    return (
        <Input  disabled={props.disabled} onChange={(e)=>{ props.onChange(e) }} { ...props} type="select">  
            <option key="" value="" > { props.name || 'Tất cả'  } </option>
            {
                props.rows.map((item)=>{
                    return(
                        <option key={item.code} value={ item.code }> { item.name } </option>
                    )
                })
            }
        </Input>
    );
}


SelectList.propTypes = {
    id:PropTypes.string,
    name:PropTypes.string,
    rows:PropTypes.array,
    style:PropTypes.object,
    onChange:PropTypes.func
};
SelectList.defaultProps = {
    id:'none',
    name:'Loại',
    rows:[],
    style:{},
    disabled:false,
    onChange:function(){}
}

export default SelectList;

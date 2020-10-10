
import { ORDER_STATUS, PURCHASE_STATUS } from '../config/app.config'
import React, { Component } from 'react';


const BenProcess = (props)=>{

    const status = parseInt(props.status) + 1 
    const percent = status *  (props.type === 'inv' ? 16.66 : 25) ;   

    const PROCESS = {
        inv:ORDER_STATUS,  
        po:PURCHASE_STATUS
    };
    

    return (
        <div style={{
            borderRadius:12,
            background:'#fff',
            border:'1px solid #18A689',
            padding:1
        }}>
            <div style={{
                background:'#18A689',
                borderRadius:12,
                width: percent+'%' ,
                color:'#fff',
                fontSize:11,
                textAlign:'center'   
            }}>
                { PROCESS[props.type][props.status]['name'] }
            </div>
        </div>
    )

}

BenProcess.defaultProps = {
    status : 0,
    type:'inv'
}


export default BenProcess

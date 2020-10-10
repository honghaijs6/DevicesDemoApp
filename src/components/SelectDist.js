
import React, { Component } from 'react';
import {  Input } from 'reactstrap';

/*
SelectDist
  props
    modal : controller class
        listDistrict:[]
        onChangeDist()

    selected: string
*/
function SelectDist(props){


  const modal = props.modal ;
  
  return(
    <Input onChange={ (e)=>{  modal.onChangeDist(e)  } }  type="select" defaultValue={ props.selected }>
      {
        props.subregions.map((item)=>{
          return (<option id={item.id} key={item.id} value={ item.code } > { item.name_with_type } </option>);
        })
      }
    </Input>
  )
}

export default SelectDist ;

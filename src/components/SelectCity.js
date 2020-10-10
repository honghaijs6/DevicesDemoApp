import React, { Component } from 'react';
import { Input } from 'reactstrap';

/*
props :
  controller class
    listCity:[]
    onChangeCity

  selected : code
*/



function SelectCity(props){


  const modal = props.modal;
  return(
    <Input onChange={ (e)=>{  modal.onChangeCity(e)  } }  type="select" defaultValue={ props.selected }>
      {
        props.regions.map((item)=>{
          return (<option id={item.id} value={item.code} key={item.id} > { item.name } </option>)
        })
      }

    </Input>
  )
}

export default SelectCity;

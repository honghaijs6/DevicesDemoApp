
import React, { Component } from 'react';

import { Input } from 'reactstrap';


/*
props :
  modal : controller class
    onHourChange()

  selected : code
*/

function SelectHour(props){

  //const modal = props.modal;

  let list = [] ;
  for(let i=0 ; i < 24 ; i++){
   const num = i < 10 ? '0'+i : i
   list.push(<option key={i} value={ num }  > {  num +' giờ' } </option>)
  }

  return(
    <Input  {...props} type="select" >
      {list}
    </Input>
  )
}

export default SelectHour;

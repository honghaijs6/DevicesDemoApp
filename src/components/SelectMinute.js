
import React from 'react';
import { Input } from 'reactstrap';


/*
props :
  modal : controller class
    onHourChange()

  selected : code
*/

function SelectMinute(props){

  
  let list = [] ;
  for(let i=0 ; i < 60 ; i+=5){
    const num = i < 10 ? '0'+i : i

    list.push(<option key={i} value={ num } > {  num +' phút' } </option>)
  }

  return(
    <Input  {...props} type="select" >
      {list}
    </Input>
  )

}


export default SelectMinute;

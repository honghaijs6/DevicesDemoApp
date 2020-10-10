
import React, { Component } from 'react';

function LeftSide(props){

  return(
    <nav>
      <ul style={{
        }} className="nav">

          {
            props.data.map((item,index)=>{

              const active = item.active ? 'active' : '';

              const classIcon = item.icon === '' ? 'fa fa-chevron-circle-right' : item.icon ;

              return(
                <li key={index} onClick={ ()=>{ props.onClick(item) } }  className={'nav-item '+active}>
                  <span  className="nav-link" >
                    <a ><i className={classIcon+' mr-5'}></i> { item.name }  </a>
                  </span>
                </li>
              )
            })
          }

      </ul>
    </nav>
  )
}

LeftSide.defaultProps = {
  data:[] 
}


// fa fa-chevron-circle-right  mr-5

export default LeftSide;

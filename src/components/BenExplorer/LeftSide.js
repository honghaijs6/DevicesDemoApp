
import React, { Component } from 'react';

function LeftSide(props){

  return(
    <nav style={{
      display:'flex',
      justifyContent:'space-between',
      flexDirection:'column'
    }}>
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
      <div>
        © <span style={{ fontSize:12, fontWeight:'500'}}>VIKHANG</span> 2020 with <span style={{ fontSize:20, color:'#18A689'}}>♥</span>
      </div>
    </nav>
  )
}

LeftSide.defaultProps = {
  data:[] 
}


// fa fa-chevron-circle-right  mr-5

export default LeftSide;

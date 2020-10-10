import React from 'react';
import ButtonExpand from './ButtonExpand';


const ButtonExpandList = (props)=>{

    return (
        <ButtonExpand icon={props.icon} padding={0} style={props.buttonStyle}>
            <nav style={{height:'100%',background:'#fff',borderRight:0,padding:0}}>
                <ul className="nav">
                    {
                        props.data.map((item,index)=>{

                            const classIcon = item.icon === '' ? 'fa-chevron-circle-right' : item.icon ;

                            return(
                                <li onClick={ ()=>{ props.onSelected(item) } } key={index} className="nav-item" style={{borderBottom:'1px solid #eee'}}>  
                                    <span  className="nav-link" > 
                                        <a> <i className={classIcon+' fa mr-5'}></i> { item.name } </a> 
                                    </span>
                                </li>
                            )
                        })
                    }
                           
                </ul>
            </nav>
        </ButtonExpand>
                  
    );

}



ButtonExpandList.defaultProps = {
    icon:'icon-options-vertical icons',
    buttonStyle:{
        marginRight: 20,
    },
    data:[],
    onSelected:()=>{}
}

export default ButtonExpandList;




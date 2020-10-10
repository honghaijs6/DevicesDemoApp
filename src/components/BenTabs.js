
/* THIS USING BOOTSTRAP 3 CSS PLUGIN  */



import React, { Component } from 'react';

class BenTabs extends Component {

    constructor(props){

        super(props);

        this.state = {

            activeTab: props.tabs.length > 0 ? props.tabs[0]['code']  : '1' ,
            tabs:props.tabs
        };
    
    }

    _onChangeTab(code){

        this.setState({
          activeTab:code
        });
        
        this.props.onChangeTab(code);
    }
    render() {
        return (
            <div className="nav-tabs-custom">
                <ul className="nav nav-tabs"> 
                    {
                        this.props.tabs.map((item,index)=>{
                            const active = item.code === this.state.activeTab ? 'active' : '';
                            return(
                                <li key={index} onClick={ ()=>{ this._onChangeTab(item.code) } } className={active} title={ item.name}>
                                    <a><i className={ item.icon+' mr-5 ' }></i> { item.name } </a>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="tab-content">
                    { this.props.children }   
                </div>
            </div>
        );
    }
}

BenTabs.defaultProps = {
    tabs:[],
    onChangeTab:()=>{}
}

export default BenTabs;
import React from 'react';

import { BenExplorer } from '../../../components/BenExplorer';


import IntroPage from './introPage';
import DevicePage from './devicePage';
import TutorialPage from './toturialPage';
import DeviceCommandPage from './deviceCommandPage/';
import SettingDevicePage from './settingDevicePage';
import RealtimePage from './realtimePage';


class PushSDKContent extends React.Component {


  constructor(props){
    super(props);

    this.state = {
      typeAction:'',
      onAction:'',
      status:'',

      onTab:'introPage',
      navData:[
        {icon:'', code:'introPage',name:'Giới thiệu',active:true},
        {icon:'', code:'settingDevicePage',name:'Cấu hình thiết bị'},
        {icon:'', code:'tutorialPage',name:'Tài liệu Device command'},
        
        {icon:'', code:'devicePage',name:'Access Devices'},
        {icon:'', code:'deviceCommandPage',name:'Device Commands'},
        {icon:'', code:'realtimePage',name:'Realtime'},
      ]
    }

    this._onNavChange = this._onNavChange.bind(this);
    this.viewSupport = this.viewSupport.bind(this);

  }

  /* WHEN */

  viewSupport(){
     this._whereStateChange({
       onAction:'viewSupport'
     })
  }

  _onNavChange(code){
    this._whereStateChange({
      onTab:code
    })
  }
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }


  render() {
    return (
      <div className="animated fadeIn">
        <div className="ubuntu-app " style={{border:0,height: 'auto'}}>
          <main>
            <BenExplorer style={{
              border:0,
              height: '1115px', //'auto'//'89vh',
              overflowY:'hidden'
              
              

            }} onLeftSideChange={ this._onNavChange } data={this.state.navData} >

              <div style={{
                backgroundColor: '#F0F3F5',
                height: 44,
                lineHeight: '44px',
                paddingLeft: 15,
                borderBottom:'1px solid #ddd'
              }}>
                <div className="pull-left">
                  {
                    this.state.navData.map((item,index)=>{
                      if(item.code===this.state.onTab){
                        return(
                          <span key={index} style={{
                              fontSize: 15,
                              color:'#18A689',
                              fontWeight: 500
                            }}> { item.name } </span>
                        )
                      }


                    })
                  }
                </div>
                <div className="pull-right" style={{paddingRight: 15}} >
                  
                </div>
              </div>


              <div style={{padding: 15}}>
                  
                <IntroPage {...this.state } />
                <DevicePage {...this.state}  />
                <TutorialPage {...this.state}/>
                <DeviceCommandPage {...this.state} />
                <SettingDevicePage {...this.state} />
                <RealtimePage {...this.state} />
                
                
              </div>

            </BenExplorer>
          </main>
        </div>
      </div>
    );
  }
}

export default PushSDKContent;

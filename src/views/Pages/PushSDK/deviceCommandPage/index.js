import React from 'react';

import axios from 'axios';
import server from '../../../../config/server';

import { BenExplorer } from '../../../../components/BenExplorer';

import User from './users';
import TimeSegment from './timeSegment';
import AccessLevel from './accessLevel';
import Transactions from './transactions';
import DeviceControll from './deviceControll';





class DeviceCommandPage extends React.Component {

  constructor(props){

    super(props);
    
    this.state = {  
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status

      tab:'deviceCommandPage',

      onTab:'users',
      navData:[
        {icon:'', code:'users',name:'User operations',active:true},
        {icon:'', code:'timeSegment',name:'Time Segment'},
        {icon:'', code:'accessLevel',name:'Access level'},
        {icon:'', code:'transactions',name:'Transactions'},  
        {icon:'', code:'deviceControll',name:'Device Controll'}  
        
        
      ],
      devices:[]


    }

    this._onNavChange = this._onNavChange.bind(this);

  }

  _queryListDevice(){
    const url = server.base()+'/pushapi/deviceServlet?type=1';
    axios.post(url).then((responese)=>{
      const res = responese.data ;
      if(res.desc==='ok'){

        
        this.setState({
            devices:res.data
        });

      }
    });
  }


  _onNavChange(code){
    //alert('asd');
    //alert(code);
    this._whereStateChange({
        onTab:code
    })
    
  }

  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }

  componentDidMount(){
    // load thiết bị
    this._queryListDevice();
  }

  render() { 
    return (
      <div hidden={  this.props.onTab === this.state.tab ? false : true } >
        <BenExplorer  onLeftSideChange={ this._onNavChange } data={this.state.navData} >
         
          
          <User {...this.state}  />
          <TimeSegment {...this.state} />
          <AccessLevel {...this.state} />  
          <Transactions {...this.state} />
          <DeviceControll {...this.state} />

        </BenExplorer>
      </div>
    );
  }
}


export default DeviceCommandPage;
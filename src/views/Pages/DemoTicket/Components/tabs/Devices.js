/* TAB THIẾT BỊ : NEBD */

import  React from 'react';
import axios from 'axios' ;


import {  ButtonGroup, Button } from 'reactstrap';


import { BenGrid } from '../../../../../components/BenGrid2';
import BenMessage from '../../../../../components/BenMessage';
import preLoad from '../../../../../hook/before/preload';




import { toast } from "react-toastify";
import server from '../../../../../config/server';

import DeviceForm from './FormDevice' ;
import DeviceFormInfo from './FormDeviceInfo' ;
import CommandInpuForm from './FormInputCommand' ;

import ButtonImportCode2Device from '../../../../../components/ButtonImportCode2Device' ;




const MODE = 'devices';



class Devices extends React.Component {



  constructor(props) {

    super(props);

    this.state = {

      server: server.base(),
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'',

      isOpen:false,
      isOpenCmdInput:false,
      isOpenFormInfo:false,
      isOpenDevSetting:false,
      curInfo:{},


      paginate:{
        max:100,
        offset:0,
        total:0
      }

    }

    this.grid = {
      colums:[
        { headerName:"Firm Version",field:"FirmVer", width:240 },

        {headerName: "Thiết bị", field: "name",width:180,
          cellRenderer(params){

              return `
                  <span class="badge bg-green font-12"> <i class="fa fa-tags"></i> ${ params.value || "n/a" } <span>
              `
          }
        },

        {
          headerName:"User Count", field:"user", width:180
        },

        {
          headerName:"Khu vực", field:"gate_no", width:180,
          cellRenderer(params){

            const GATE = params.value === undefined ? "n/a" : params.value
            return `
                ${GATE}
            `

          }
        },
        {headerName: "IP address",field: "IPAddress",width:140},
        {headerName:"SN", field:"sn", width:180},

        {
          headerName:"Trạng thái", field:"status", width:120, cellRenderer(params){
             const STATUS =  params.value || 0  ;

             const iconStatus = `
              <span class="${  STATUS === 0 ? 'text-danger' : 'text-green' }"> <i class="fa fa-circle"></i></span>
             `
             return iconStatus ;
          }
        },

        { headerName:"Device Model",field:"DeviceName", width:240 },



      ],
      rowData: []
    }


  }


  _getCountUser(sn=''){

    return new Promise((resolve,reject)=>{

      const cmd = "DATA COUNT user" ;
      const postData = { sn:sn,cmd:cmd } ;
      const url = server.base()+'/commands';

      axios.post(url,postData,{ timeout:10000}).then((res)=>{

        resolve(res) ;

      }).catch((err)=>{

        resolve(err) ;
      });


    })
  }

  _getDeviceStatus(sn=''){
    return new Promise((resolve, reject)=>{

      const cmd = "GET OPTIONS ~SerialNumber,FirmVer,~DeviceName,LockCount,ReaderCount,AuxInCount,AuxOutCount,MachineType,~IsOnlyRFMachine,~MaxUserCount,~MaxAttLogCount,~MaxFingerCount,~MaxUserFingerCount,MThreshold,NetMask,GATEIPAddress,~ZKFPVersion,SimpleEventType,VerifyStyles,EventTypes,ComPwd,BackgroudValid,AutoServerFunOn,AntiPassbackOn,AntiPassback,AutoServerMode";

      const postData = { sn:sn,cmd:cmd } ;
      const url = server.base()+'/commands';

      axios.post(url,postData,{ timeout:10000}).then((res)=>{

        resolve(res) ;

      }).catch((err)=>{

        resolve(err) ;
      });


    });

  }
  async _detectDeviceStatus(){


    for(let i=0; i< this.grid.rowData.length; i++){
      const item = this.grid.rowData[i];
      const res  =  await this._getDeviceStatus(item.sn) ;

      if(JSON.stringify(res).includes("Error")){

          console.log("====== DISCONNECT ====")
          console.log(item);

      }else{
        const data = res.data ;
        let extInfo = data.querydata.data ;
        extInfo.status = 1 ;

        /* UPDATE LOCAL DATA */
        this.grid.rowData.map((dev)=>{
          if(dev.sn === item.sn){
             const newInfo = Object.assign(dev, extInfo);
             dev = newInfo
          }
        });
      }


    }

    // REFRESH APP
    this.setState({ status:'success'},()=>{
        // DETECT USER ON DEVICE
        this._detectDeviceUser();
        this._refresh() ;


    })

  }

  async _detectDeviceUser(){

    for(let i=0; i< this.grid.rowData.length; i++){
      const item = this.grid.rowData[i];
      const res  =  await this._getCountUser(item.sn) ;


      if(JSON.stringify(res).includes("Error")){

          console.log("====== ERRO COUNT USER || DISCONECT DEVICE ====")
          console.log(item);

      }else{
        const data = res.data ;
        let extInfo = data.querydata.data ;
        extInfo.status = 1 ;

        /* UPDATE LOCAL DATA */
        this.grid.rowData.map((dev)=>{
          if(dev.sn === item.sn){
             const newInfo = Object.assign(dev, extInfo);
             dev = newInfo
          }
        });

      }

    }


    // REFRESH APP
    this.setState({ status:'success'},()=>{
      this._refresh() ;

    })

  }

  _listDevice(){

    const url = server.base()+'/devices?max='+this.state.max+'&offset='+this.state.offset ;
    axios.get(url).then((res)=>{

      const data = res.data;
      // FORMAT DATA FIRST
      let rows = data.rows ;
      rows.map((item)=>{
          const options =  item.options ;
          item = Object.assign(item,options);
          delete item.options ;
      });
      this.grid.rowData = rows ;

      let paginate = Object.assign({}, this.state.paginate) ;
      paginate.total = data.count ;


      this.setState({
        status:data.name,
        paginate
      },()=>{

        this._refresh();

        this._detectDeviceStatus() ;

      });

    })
  }

  componentDidMount(){

    this._listDevice();

  }



  _openDoor(json){

    const url = server.base()+'/commands';
    axios.post(url,{
      sn:json.sn,
      cmd:"CONTROL DEVICE 01010103"
    }).then((res)=>{

      //alert(JSON.stringify(res));
      toast.info('Đã mở khoá : '+json.sn);

    });
  }

  /* ON SUBMIT POST COMMAND STATEMENT */
  // TYPE : POST
  _onSubmitPostCommand(json){

    return new Promise((resolve, reject)=>{

      if(json){

        const postData = {
          cmd:json.cmd,
          sn:json.sn
        } ;

        const url = server.base()+'/commands';

        preLoad('loading');
        axios.post(url,postData,{ timeout:30000}).then((res)=>{


           toast.info('Run : '+json.sn);
           preLoad('stop');


           document.querySelector('#data-response').innerHTML = JSON.stringify(res.data, undefined, 4) ;

        }).catch((err)=>{
          preLoad("stop") ;

          alert(JSON.stringify(err));
        })

      }

    })


  }

  /* SUBMIT FORM */
  _onSubmit(json){

    switch(this.state.typeAction){

      // UPDATE DATA
      case 'put':
        const postData = {
          name:json.name,
          gate_no:json.gate_no,
          sn:json.sn
        }

        const url = server.base()+'/'+MODE+'/'+json._id;

        axios.patch(url,postData).then((res)=>{

          const data = res.data ;
          if(data.name==="success"){
            this._doCloseForm();
            this._listDevice();

          }

        }).catch((err)=>{
          alert(JSON.stringify(err))
        })


      break ;
    }

  }

  _doCloseForm(){
    this.setState({
      isOpen:false,
      curInfo:{},
      typeAction:""
    })
  }
  _doOpenForm(type,json){

    switch(type){
      case 'put':
        this.setState({
          isOpen:true,
          typeAction:type
        })
      break;
    }

  }

  _onCellSelected = (data)=>{
     this.setState({ curInfo:data}) ;
  }

  _delIndex = 0;
  _onGridDeleted(list){

      if(list.length > this._delIndex){

        const item = list[this._delIndex] ;
        const url = server.base()+'/'+MODE+'/'+item._id;

        axios.delete(url).then((res)=>{
          this._delIndex += 1 ;

          this._onGridDeleted(list) ; // REPEATED

        });
      }else{

        this._listDevice() ;

      }

  }

  /* ON COMPLETE UPLOAD FILE EXCEL */
  _onCompleteUpload(){
    // reload device
    this._listDevice() ;

  }

  _refresh(){
    this.setState({
      status:''
    });
  }

  _onCellDbClick(){
    this.setState({ isOpenFormInfo:true}) ;

  }

  _onOpenFormInputCmd = ()=>{

    if(JSON.stringify(this.state.curInfo) !=='{}'){
      this.setState({isOpenCmdInput:true});
    }else{
      BenMessage({message:"Vui lòng chọn thiết bị"})
    }
  }

  _onOpenFormDevSetting = ()=>{
    if(JSON.stringify(this.state.curInfo) !=='{}'){
      this.setState({isOpenDevSetting:true});
    }else{
      BenMessage({message:"Vui lòng chọn thiết bị"})
    }
  }

  _setTimeZoneDefaut = ()=>{
    if(JSON.stringify(this.state.curInfo) !=='{}'){

      const url = server.base()+'/'+MODE+'/SetTimeZone';

      preLoad('loading');

      axios.post(url,{sn:this.state.curInfo.sn},{timeout:10000}).then((res)=>{
        preLoad('stop');

        toast.info('Response SetTimeZone : '+ res.data.name);
      }).catch((err)=>{
        alert(JSON.stringify(err));
        preLoad('stop');

      })

    }else{
      BenMessage({message:"Vui lòng chọn thiết bị"})
    }
  }

  render() {
    return (

      <div>
          {/* FORM */}
          <DeviceForm
              name="Thiết bị"
              typeAction={ this.state.typeAction }
              isOpen={ this.state.isOpen }
              onToggle={(isOpen)=>{ this.setState({isOpen:isOpen, curInfo:{}}) }}
              width="40%"
              data={this.state.curInfo}
              onSubmit={(data)=>{ this._onSubmit(data)  }}
          />

          <DeviceFormInfo
            name="Thông tin"
            isOpen={ this.state.isOpenFormInfo}

            onToggle={(isOpen)=>{ this.setState({ isOpenFormInfo:isOpen}) }}
            width="30%"
            data={ this.state.curInfo}

          />

          <CommandInpuForm
              name="Command"
              typeAction="post"
              isOpen={ this.state.isOpenCmdInput }
              onToggle={(isOpen)=>{ this.setState({ isOpenCmdInput :isOpen}) }}
              width="40%"
              data={ this.state.curInfo}
              onSubmit={(data)=>{ this._onSubmitPostCommand(data) }}
          />

          {/* TABLE */}
          <BenGrid

                gridID="_id"

                rowSelection="single"


                onBtnAdd={ ()=>{  this._doOpenForm('post') } }
                onBtnEdit={()=>{ this._doOpenForm('put') }}
                onCellSelected={ this._onCellSelected }

                isRightTool={ true }
                isLeftTool={ false }
                formStatus={ this.state.status }

                onDeleted={(list)=>{  this._onGridDeleted(list) }}
                onCellDoubleClicked={()=>{ this._onCellDbClick() }}

                height="70vh"

                nextColums={ this.grid.colums }
                rowData={this.grid.rowData}
                paginate={ this.state.paginate }

                displayBtn={['edit','remove']}

                customButton={
                  <ButtonGroup style={{marginRight:10}}>

                      <Button onClick={ this._onOpenFormInputCmd } className="btn-normal">
                        <i className="fa fa-play-circle mr-5"></i>Commands
                      </Button>

                      <ButtonImportCode2Device
                        title="Nạp thẻ"
                        strModel={MODE}
                        columns={ ['type','gate_no','type_no','pin','cardno'] }
                        sn={ this.state.curInfo['sn'] }
                        onComplete={()=>{ this._onCompleteUpload() }}
                      />

                      <Button className="btn-normal mr-5" onClick={ this._setTimeZoneDefaut }>
                        <i className="fa fa-clock-o"></i> TimeZone Default
                      </Button>

                  </ButtonGroup>

              }

            />

      </div>

    );
  }
}



export default Devices;

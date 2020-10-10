import React from 'react';



import {  Label,  Form, Input, FormGroup, Row, Col } from 'reactstrap';
import { preLoad } from '../../../../hook/before';

import axios from 'axios';
import server from '../../../../config/server';


import BenMessage from '../../../../components/BenMessage';


export default class DeviceControll extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status

      tab:'deviceControll',  
        
      devices:[],
      curSerial:'',
      
      indexCommand:0,
      command:'',
      commands:[
            "CONTROL DEVICE 01010103",
            "CONTROL DEVICE 02000000",
            "CONTROL DEVICE 03000000"
      ],

      commandActions:[
          'Open Door 1',
          'Cancel all alarm',
          'Reboot device'
      ],
      commandRes:``

    }

    this._submitCommand = this._submitCommand.bind(this);
    
  }

  trim(str){
    return str.replace(/(^\s*)/g,"");  
  }
  _submitCommand(){

    let cmd = this.trim(this.state.command).trim();
    const url = server.base()+'/pushapi/createCmd?cmdType=userDefined&sn='+this.state.curSerial.trim();
      
    
    if(this.state.curSerial!=='' && this.state.command !==''){
      preLoad('post');
      axios.post(url,{

        "originalCmd":cmd
      }).then((responese)=>{
        const res = responese.data ;
        
        
        
        if(res.desc==='ok'){

          preLoad('stop');
          this.setState({
            commandRes: JSON.stringify(res, undefined, 2)
        });

        }
      });
    }else{ 
      BenMessage({
          message:'Vui lòng chọn thiết bị và hạng mục cần thao tác'
      }) 
    }

    

  }
  _onChangeSerial(e){
      const sn = e.target.value;
      
      if(sn!==''){
        this.setState({
            curSerial:sn
        })
      }
  }
  _onChangeCommandAction(e){
    const index = parseInt(e.target.value);

    const cmd = this.state.commands[index];


    this.setState({
        command:cmd,
        indexCommand:index
    });
    
  }


  _queryCommandStatus(){
    const url = server.base()+'/pushapi/cmdServlet';
    axios.post(url).then((responese)=>{
        const res = responese.data ;
        
        if(res.desc==='ok'){
          console.log(res);
          this.setState({
              commandRes:res.cmdData === "" ? 'listening..' :res.cmdData
          });

  
        }
      });
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

  
  render() {

    const displayCmd = {
      "originalCmd":this.state.command
    }
    return (
      <div hidden={  this.props.onTab === this.state.tab ? false : true } >
          <div className="guidebook">
            <h3> Thao tác : Devices Controll </h3>
            <p>  Phần này là hướng dẩn cho chương trình demo về Devices Controll   </p>
            
            <h5> Request </h5>
            <ul>
                <li style={{fontSize:14}}> Method : POST </li>
                <li style={{fontSize:14}}> 
                    cURL: /pushapi/createCmd?cmdType=userDefined&sn=<span className="txt-green"> { this.state.curSerial } </span>
                    <pre>
                      {
                        JSON.stringify(displayCmd,undefined,2)
                      }
                    </pre>
                </li>
                
            </ul>


            <FormGroup>
                <Row>
                    <Col md="3">
                        <Label> Phương thức CURD </Label>
                        <Input onChange={ (e)=>{ this._onChangeCommandAction(e) } } type="select">
                            <option key=""  value=""> Vui lòng chọn </option>
                            {
                                this.state.commandActions.map((item,index)=>{
                                    return(
                                        <option key={index} value={index} > { item } </option>
                                    )
                                })
                            }
                        </Input>
                    </Col>
                    <Col md={3}>
                        <Label> Chọn serial thiết bị </Label>
                        <Input onChange={(e)=>{ this._onChangeSerial(e) }} type="select">
                            <option key=""  value=""> Vui lòng chọn </option>
                            {
                                this.props.devices.map((item,index)=>{
                                    return(
                                        <option key={index} value={item.sn}> { item.sn+'---'+item.DeviceName } </option>
                                    )
                                })
                            }
                        </Input>
                    </Col>
                    
                </Row>
            </FormGroup>
            <FormGroup>
                <Row>
                    <Col md={12}>
                        <Label> Device native Command :   
                        <span className="txt-red ml-5">Câu lệnh command sẽ lưu dạng text file，và những ký tự “\t” cần thay thế bằng “Tab” string không dấu tiếng việt</span></Label>
                         <Input style={{
                           background:'#000',
                           color:'#ddd'
                         }} onChange={(e)=>{
                            this.setState({
                              command:e.target.value
                            })
                         }} value={ this.state.command } type="text" />
                        
                    </Col>
                </Row>
                <Row style={{marginTop:20}}>
                    <Col>
                        <button onClick={ this._submitCommand } className="btn btn-success"> RUN </button>                                
                    </Col>
                </Row>
            </FormGroup>
            
           
            <h5> Responese </h5>
            <pre style={{background:'#000', color:'#ddd', padding:20, height:300, overflowY:'auto'}}>
                { this.state.commandRes }
            </pre>
            
            

          </div>
      </div>
    );
  }
}

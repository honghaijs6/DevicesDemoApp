import React from 'react';



import {  Label,  Form, Input, FormGroup, Row, Col, Table } from 'reactstrap';
import { preLoad } from '../../../../hook/before';

import axios from 'axios';
import server from '../../../../config/server';


import BenMessage from '../../../../components/BenMessage';


export default class TimeSegment extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status

      tab:'timeSegment',

      devices:[],
      curSerial:'',

      indexCommand:0,
      command:'',
      commands:[
            "DATA UPDATE timezone timezoneid=1\tsuntime1=91750430",
            "DATA DELETE timezone timezoneid=1",
            "DATA QUERY tablename=timezone,fielddesc=*,filter =*",
            "DATA COUNT timezone"
      ],

      commandActions:[
          'Add / Update Time Zone',
          'Delete Time Zone',
          'Query all Time Zone',
          'Count Time Zone'
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
            <h3> Thao tác : Time Segment </h3>
            <p>  Phần này là hướng dẩn cho chương trình demo về CURD Time Zone trên thiết bị   </p>
            <p> Cách tính phân đoạn thời gian </p>
            <div style={{
                    background:'#DEEAF6',
                    padding:10,
                    border:'1px solid #ddd',
                    margin:20,
                }}>

                    <p> - format  :  (Hour*100 + Minute ) {`<<16`}  + (Hour*100 + Minute) </p>

                    <ul>
                      <li>  VD : Phân đoạn từ : 14:00 ~ 17:30  </li>
                      <li>  = ((1400 + 0) {`<<16)`} + (1700 + 30)  </li>
                      <li>  = { ((1400 + 0)<<16) + (0 + 30) } </li>
                    </ul>

            </div>

            <p> Bảng đối chiếu phân đoạn timezone tương ứng các trường trên table timezone thiết bị </p>

            <Table style={{width: 600}}>
              <thead style={{ border:0, background:'#222D32', color:'#fff' }}>
                  <tr>
                      <th> # </th>
                      <th> 1 </th>
                      <th>2</th>
                      <th>3</th>
                  </tr>
              </thead>
              <tbody>
                <tr>
                  <td> Monday </td>
                  <td> montime1 </td>
                  <td> montime2 </td>
                  <td> montime3 </td>
                </tr>

                <tr>
                  <td> Tuesday </td>
                  <td> tuetime1 </td>
                  <td> tuetime2 </td>
                  <td> tuetime3 </td>
                </tr>

                <tr>
                  <td> Wednesday </td>
                  <td> wedtime1 </td>
                  <td> wedtime2 </td>
                  <td> wedtime3 </td>
                </tr>

                <tr>
                  <td> Thursday </td>
                  <td> thutime1 </td>
                  <td> thutime2 </td>
                  <td> thutime3 </td>
                </tr>

                <tr>
                  <td> Friday </td>
                  <td> fritime1 </td>
                  <td> fritime2 </td>
                  <td> fritime3 </td>
                </tr>

                <tr>
                  <td> Saturday </td>
                  <td> sattime1 </td>
                  <td> sattime2 </td>
                  <td> sattime3 </td>
                </tr>

                <tr>
                  <td> Sunday </td>
                  <td> suntime1 </td>
                  <td> suntime2 </td>
                  <td> suntime3 </td>
                </tr>




              </tbody>
            </Table>

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

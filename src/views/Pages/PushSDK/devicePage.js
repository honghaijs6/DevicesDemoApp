import React from 'react';
import axios from 'axios';

import { Table, Row, Col, ButtonGroup, Button } from 'reactstrap';
import { toast } from "react-toastify";


import server from '../../../config/server';



const MAU_JSON = `{
  "desc": "ok",
  "data": [{
          "sn": "số serial",
          "LockCount": "số khoá",
          "FirmVer": "Phiên bản",
          "registrycode": "mã đăng ký push",
          "DeviceName": "tên thiết bị"
      }

  ]
}`;

const MAU_JSON2 = `{
  "desc": "ok",
}`;


class Devices extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      server: server.base(),
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'',
      viewSupport:false,

      tab:'devicePage',

    }

    this.grid = {
      columnDefs:[
        {headerName: "Serial No", field: "sn",width:200},
        {headerName: "Device Name", field: "DeviceName",width:330},
        {headerName: "Lock count ", field: "LockCount",width:140},
        {headerName: "Register Code	", field: "registrycode",width:200},
        {headerName: "Device Version", field: "FirmVer",width:340}


      ],
      rowData: []
    }

    this._viewSupport = this._viewSupport.bind(this);

  }

  _viewSupport(){
    this.setState({
      viewSupport: !this.state.viewSupport
    })
  }

  _openDoor(json){

    const url = server.base()+'/pushapi/createCmd?cmdType=userDefined&sn='+json.sn+'&originalCmd=CONTROL DEVICE 01010103';
    toast.info('Đã mở khoá ');
    axios.post(url).then((responese)=>{
      const res = responese.data ;

      toast.info('Khoá đã đóng : '+json.sn);

      /*if(res.desc==='ok'){
           toast.info('Đã mở khoá : '+json.sn);
      }*/

    })
  }

  _synchronize(json){
    const url = server.base()+'/pushapi/deviceServlet?type=2&sn='+json.sn;
    axios.post(url).then((responese)=>{
      const res = responese.data ;

      if(res.desc==='ok'){
           toast.info('Đã đồng bộ  : '+json.sn);
      }


    })


  }


  componentWillReceiveProps(newProps){

    switch(newProps.onAction){
      case 'viewSupport':

          if(newProps.onTab === this.state.tab){
             this.setState({
               viewSupport: !this.state.viewSupport
             })
          }
      break;
    }
  }

  componentDidMount(){

    const url = server.base()+'/pushapi/deviceServlet?type=1';
    axios.post(url).then((responese)=>{
      const res = responese.data ;
      if(res.desc==='ok'){
        this.grid.rowData = res.data ;

      }
    })

  }

  render() {


    return (
      <div style={{padding:30}} hidden={  this.props.onTab === this.state.tab ? false : true } >

          <div style={{marginBottom:20}}>
            <button onClick={this._viewSupport} className="btn btn-sm btn-success"> <i className="fa fa-support mr-5" /> Hướng dẩn </button>
          </div>

          <div hidden={!this.state.viewSupport ? false : true } >
            <Table  className="table" >
              <thead style={{ border:0, background:'#222D32', color:'#fff' }} >
                <tr>
                  <th style={{width: 30}}>
                      #
                  </th>
                  {
                    this.grid.columnDefs.map((item,index)=>{
                      return(
                        <th key={index} style={{
                          width: item.width
                        }} > { item.headerName } </th>
                      )
                    })
                  }
                  <th style={{width: 180}}>
                    Operation
                  </th>


                </tr>
              </thead>

              <tbody style={{height: '74vh'}}>
                {
                  this.grid.rowData.map((item,index)=>{

                    let stt = index + 1 ;
                    return(
                      <tr key={index}>
                        <td style={{width: 30}}>
                          { stt }
                        </td>
                        {
                          this.grid.columnDefs.map((item2,index2)=>{
                              return(
                                <td key={index2} style={{
                                  width: item2.width+'px'
                                }}> { item[item2['field']] }

                                </td>
                              )
                          })
                        }
                        <td style={{width: 140}}>
                          <ButtonGroup>

                              <Button onClick={ ()=>{ this._openDoor(item) } } className="btn btn-sm btn-success"><i className="fa fa-unlock mr-5" /> Remote Open </Button>
                              <Button onClick={ ()=>{ this._synchronize(item) } } className="btn btn-sm btn-danger"><i className="fa fa-unlock mr-5" />  Synchronize </Button>

                          </ButtonGroup>
                        </td>
                      </tr>
                    )
                  })
                }

              </tbody>


            </Table>
          </div>


          <div style={{ fontFamily:'Roboto'}} hidden={ !this.state.viewSupport ? true : false }>
              <div className="guidebook">

              <h3> Thao tác về thiết bị </h3>
              <p>  Phần này là hướng dẩn cho chương trình demo về thiết bị   </p>

              <h5> Request </h5>
              <ul>
                  <li> URL: /pushapi/deviceServlet?type=[numer] </li>
                  <li> Method : POST </li>
              </ul>
              <h5> Query Parameter </h5>
              <Table>
                  <thead style={{ border:0, background:'#222D32', color:'#fff' }}>
                      <tr>
                          <th style={{width:'60px'}}> Type </th>
                          <th style={{width:500}}>Mô tả</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td> 1 </td>
                          <td> Lấy danh sách các thiết bị </td>
                      </tr>
                      <tr>
                          <td>2</td>
                          <td> Đồng bộ thời gian thiết bị </td>
                      </tr>

                  </tbody>
              </Table>

                <br></br>
                <p className="txt-green"> Lấy danh sách thiết bị </p>
                <p> URL: /pushapi/deviceServlet?type=1 </p>
                <p> Response : JSON Object </p>

                <pre style={{
                  background:'#263238',
                  color:'#f1f1f1',
                  padding:20
                }}>
                  { MAU_JSON }
                </pre>

                <br></br>
                <br></br>

                <p className="txt-green"> Đồng bộ thời gian tiết bị </p>
                <p> URL: /pushapi/deviceServlet?type=2&sn=[<span className="txt-green">serialNo</span>] </p>
                <p> Response : JSON Object </p>

                <pre style={{
                  background:'#263238',
                  color:'#f1f1f1',
                  padding:20
                }}>
                  { MAU_JSON2 }
                </pre>

                <br></br>
                <br></br>
                <p className="txt-green"> Mở khoá </p>
                <p> URL:/pushapi/createCmd?cmdType=userDefined&sn=[<span className="txt-green">serialNo</span>]&originalCmd=<span className="txt-green">CONTROL DEVICE 01010103</span> </p>
                <p> Response : JSON Object </p>

                <br></br>
                <br></br>

                <br></br>
                <br></br>

                <br></br>
                <br></br>
              </div>
          </div>

      </div>
    );
  }
}

export default Devices ;

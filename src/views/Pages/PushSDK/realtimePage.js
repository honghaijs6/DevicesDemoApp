import React from 'react';
import axios from 'axios';

import { Table, Row, Col, ButtonGroup, Button } from 'reactstrap';


import { toast } from "react-toastify";

import server from '../../../config/server';



const MAU_JSON = `{
  "desc": "ok",
  "data": [{
          "sn": "số serial",
          "pin": "mã pin",
          "cardno": "số thẻ",
          "inoutstatus": "Trạng thái IN-OUT",
          "time": "Thời gian khi check thẻ",
          "eventaddr":"cửa-cổng",
          "event":"trang thái nguoi dùng",
          "verifytype":"trạng thái chấp nhận - từ chối"


      }

  ]
}`;

const MAU_JSON2 = `{
  "desc": "ok",
}`;


export default class RealTimePage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      server: server.base(),
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'',
      viewSupport:false,

      tab:'realtimePage',

      isInitRealtime:false

    }

    this.grid = {
      columnDefs:[
        {headerName: "Device sn", field: "sn",width:240},
        {headerName: "Pin", field: "pin",width:200},
        {headerName: "CardNo", field: "cardno",width:140},
        {headerName: "In/Out", field: "inoutstatus",width:100},
        {headerName: "Time", field: "time",width:200},

        {headerName: "Event Point", field: "eventaddr",width:200},
        {headerName: "Event Type", field: "event",width:200},
        {headerName: "Verification Type", field: "verifytype",width:200}



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

  _realEvent(status){
    const url = server.base()+'/pushapi/realEvent';

    this.state.isInitRealtime = status;

    axios.post(url).then((responese)=>{
      const res = responese.data ;
      if(res.desc==='ok'){

        console.log(res.data);
      
        if(res.data.length>0){

          res.data.map((item)=>{
            this.grid.rowData.push(item)
          })

          this.setState({
            onAction:'_realEvent'
          })


        }



        if(this.state.isInitRealtime !== false){
          this._realEvent(true);
        }


      }
    })
  }



  componentWillReceiveProps(newProps){
    if(newProps.onTab===this.state.tab){
      if(!this.state.isInitRealtime){

         this._realEvent(true) ;

      }
    }else{ this._realEvent(false) }
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
                      </tr>
                    )
                  })
                }

              </tbody>


            </Table>
          </div>


          <div style={{ fontFamily:'Roboto'}} hidden={ !this.state.viewSupport ? true : false }>
              <div className="guidebook">

              <h3> Thao tác về Realtime  </h3>
              <p>  Phần này là hướng dẩn cho chương trình demo về lấy trạng thái của thiết bị khi có tương tác đầu đọc thẻ  </p>

              <h5> Request </h5>
              <ul>
                  <li> URL: /pushapi/realEvent</li>
                  <li> Method : POST </li>
              </ul>
              <h5> Responese </h5>

                <pre style={{
                  background:'#263238',
                  color:'#f1f1f1',
                  padding:20
                }}>
                  { MAU_JSON }
                </pre>

                <p>
                  Mặc định là tất cả các thiết bị khi kết nối vào Push server nó sẽ luôn trả tín hiệu trạng thái về Push server cloud,
                  công việc của nhà phát triển là tạo ra 1 cơ chế poll, đệ quy để liên tục lấy tín hiệu này
                </p>

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

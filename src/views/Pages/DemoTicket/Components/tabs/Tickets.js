/* TAB TRUNG TÂM THẺ : NEDB DATA : */


import  React from 'react';
import axios from 'axios' ;
import moment from 'moment';


import { Table, Row, Col, ButtonGroup, Button } from 'reactstrap';


import { BenGrid } from '../../../../../components/BenGrid2';
import BenMessage from '../../../../../components/BenMessage';

import preLoad from '../../../../../hook/before/preload';




import { toast } from "react-toastify";
import server from '../../../../../config/server';

import DeviceForm from './FormDevice' ;
import DeviceFormInfo from './FormDeviceInfo' ;
import CommandInpuForm from './FormInputCommand' ;

import ButtonImportCode2Device from '../../../../../components/ButtonImportCode2Device' ;

const MODE = 'live-code';

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
      curInfo:{},


      paginate:{
        max:100,
        offset:0,
        total:0
      }

    }

    this.grid = {
      colums:[
        { headerName:"Loại",field:"type", width:180 },
        { headerName:"Mã cổng", field:"gate_no", width:180 },
        { headerName:"Kiểu", field:"type_no", width:180 },
        { headerName:"Pin", field:"pin", width:250 },
        { headerName:"Card no", field:"cardno", width:250 }

      ],
      rowData: []
    }


  }


  /* Kiểm tra thẻ */
  _search(text){

    const url = server.base()+'/tickets/check/'+text ;

    preLoad('loading') ;
    axios.get(url,{ timeout:2000}).then((res)=>{

      preLoad("stop");

      const data = res.data ;
      let status = "không tồn tại";
      status = data.status === 1 ? "Đã sử dụng": data.status === -1 ? "Không tồn tại" : "chưa sửa dụng" ;


      let desc = '';
      if(data.status===1){
        const type_no = data.data.type_no === "10" ? "Người lớn":"trẻ em";
        desc  = ` đã được quét vào lúc ${ moment(data.data.date_created).format('YY-MM-DD hh:mm A')} tại cổng : ${data.data.gate_no}
          loại vé ${type_no}
        `
      }

      const html = `
        ${ status } ${desc}
      `;

      BenMessage({message:html,title:text});



    }).catch((err)=>{
      preLoad("stop");
      console.log(err) ;

    })

  }
  _load(){

    const { paginate } = this.state ;
    const url = server.base()+'/'+MODE+'?max='+paginate.max+'&offset='+paginate.offset ;

    preLoad('loading') ;

    axios.get(url).then((res)=>{

      preLoad('stop');

      const data = res.data;
      this.grid.rowData = data.rows ;

      let paginate = Object.assign({}, this.state.paginate);
      paginate.total = data.count;


      this.setState({
        status:data.name,
        paginate
      },()=>{

        this._refresh();

      });

    })
  }

  componentDidMount(){

    // LOAD THẺ
    this._load() ;


  }


  _onCellSelected = (data)=>{
     this.setState({ curInfo:data}) ;
  }


  _refresh(){
    this.setState({
      status:''
    });
  }

  _onCellDbClick(){

  }


  _doOpenForm(type){

  }

  _onGridDeleted(list){

  }

  _onGoto(p){

    let { paginate } = this.state ;
    paginate.offset = p ;

    this.setState({ paginate},()=>{
      this._load();
    })

  }

  _onGoNext(){
    let { paginate } = this.state ;
    paginate.offset += 1;

    this.setState({ paginate},()=>{
      this._load();
    });


  }

  _onGoPre(){
    let { paginate } = this.state ;
    paginate.offset -= 1;

    this.setState({ paginate},()=>{
      this._load();
    });

  }

  render() {
    return (

      <div>
          {/* FORM */}


          {/* TABLE */}
          <BenGrid

                gridID="_id"

                rowSelection="single"
                searchTile={" Kiểm tra vé"}

                onBtnAdd={ ()=>{  this._doOpenForm('post') } }
                onBtnEdit={()=>{ this._doOpenForm('put') }}
                onCellSelected={ this._onCellSelected }
                onFind={(text)=>{ this._search(text) }}

                isRightTool={ true }
                isLeftTool={ false }
                formStatus={ this.state.status }

                onDeleted={(list)=>{  this._onGridDeleted(list) }}
                onCellDoubleClicked={()=>{ this._onCellDbClick() }}

                height="70vh"

                nextColums={ this.grid.colums }
                rowData={this.grid.rowData}
                paginate={ this.state.paginate }

                onGoto={(p)=>{ this._onGoto(p) }}
                onGoNext={()=>{ this._onGoNext() }}
                onGoPre={()=>{ this._onGoPre() }}


                displayBtn={['add','edit','remove']}

                customButton={
                  <ButtonGroup style={{marginRight:10}}>


                  </ButtonGroup>

              }

            />

      </div>

    );
  }
}



export default Devices;

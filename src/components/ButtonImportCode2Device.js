// DATA
//import Model from '../model/model';
//import zkpush from '../model/zkpush' ;

// LIBS
import XLSX from 'xlsx';
import axios from 'axios' ;
import server from '../config/server' ;


import React, { Component } from 'react';
import { Input, Button, Row, Col } from 'reactstrap';


import BenMessage from './BenMessage';
import ViewModal  from './ViewModal';
import BenTable from './BenTable' ;




Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}


class ButtonImportCode2Device extends Component {

    _index = 0 ;
    _percentage = 0 ;

    constructor(props){
        super(props);

        this.state = {
            status:'',
            columns:props.columns,
            isOpen:false,

            percentage:0,
            isOnSubmit:false
        }

        this.grid = {
            colums:[
            ],
            rowData:[]
        }

        this._setup();
    }

    _setup(){

        // FORMAT GRID COLUM
        this.state.columns.map((item)=>{
            this.grid.colums.push({
                headerName:item,
                field:item,
                width:'140px'
            });
        });

        //this.model = new Model(this.props.strModel);
        //this.zkpush = new zkpush() ;



    }

    _openForm(){
        this.setState({
            isOpen:true
        });

    }

    _compareColumns(columns=[]){

        return columns.equals(this.state.columns)
    }
    _handleFile(e){

        if(this.props.sn !==''){

            if (e.target.files && e.target.files.length > 0) {

                let msg = 'Định dạng cột trong tập tin Excel không hợp lệ';

                const reader = new FileReader();
                reader.readAsArrayBuffer(e.target.files[0]);

                reader.onload = (e)=>{

                  const data = new Uint8Array(reader.result);
                  const wb = XLSX.read(data,{type:'array'});

                  const sheetName  = wb.SheetNames[0];
                  const worksheet = wb.Sheets[sheetName];

                  const list = XLSX.utils.sheet_to_json(worksheet,{raw:true});



                  if(list.length>0){
                    if(this._compareColumns(Object.keys(list[0]))){
                        this.grid.rowData = list ;
                        this._openForm() ;
                        msg = '';
                    }
                  }


                  if(msg!==''){
                    BenMessage({
                        message:msg
                    });
                  }


              }
            }
        }else{
          BenMessage({message:"Vui lòng chọn thiết bị"});
        }
    }


    /*
    UPDATE POST 500/TIME : BLOCK 500 CODE
    */
    _uploadNow(){


      if(this.props.sn !==''){
        if(this.grid.rowData.length > 0){

          if(this.grid.rowData.length <= 100){

              const url = server.base()+'/live-code/AddMulti?sn='+this.props.sn ;
              let data = Object.assign([],this.grid.rowData) ;
              // FORMAT DATA ADD SERIAL
              data.map((item)=>{

                item.sn = this.props.sn ;
                item.gate_no = item.gate_no.toString() ;
                item.type_no = item.type_no.toString() ;
                item.pin = item.pin.toString() ;
                item.cardno = item.cardno.toString() ;

              });


              axios.post(url,data)
                    .then((res)=>{


                      this._index = 0 ;
                      this.grid.rowData = [];

                      BenMessage({
                          message:'Đã upload thành công'
                      });

                      this.setState({
                          status:'finish',
                          isOpen:false,
                          isOnSubmit:false
                      });

                      this.props.onComplete(true);



                    },(error)=>{

                    alert(JSON.stringify(error)) ;


              });



          }else{
            // OVER 500
            const max = 100 ;
            const count = this.grid.rowData.length / max ;
            if(this._index < count){

              const p = this._index * max;
              const pp = p + max ;

              // REPEAR DATA FOR POST

              let postData = [] ;
              for(let i= p ; i < pp ; i++ ){
                postData.push(this.grid.rowData[i]);
              }

              // POST DATA HERE HAHA ;
              const url = server.base()+'/live-code/AddMulti?sn='+this.props.sn ;

              // FORMAT DATA ADD SERIAL
              postData.map((item)=>{
                item.sn = this.props.sn ;
                item.gate_no = item.gate_no.toString() ;
                item.type_no = item.type_no.toString() ;
                item.pin = item.pin.toString() ;
                item.cardno = item.cardno.toString() ;

              });


              axios.post(url,postData)
                    .then((res)=>{

                      this.state.percentage = (this._index * 100)/count;
                      this.setState({
                          status:'success',
                          percentage:this.state.percentage
                      });


                      this._index +=1 ;
                      this._uploadNow() ;

                    },(error)=>{

                    alert(JSON.stringify(error)) ;


              });




            }else{
              this._index = 0 ;
              this.grid.rowData = [];

              BenMessage({
                  message:'Đã upload thành công'
              });

              this.setState({
                  status:'finish',
                  isOpen:false,
                  isOnSubmit:false
              });

              this.props.onComplete(true);



            }

          }
        }
      }else{
        alert('Vui lòng chọn thiết bị')
      }


    }


    _onSubmit = ()=>{

        this._index = 0 ;
        this.state.percentage = 1 ;

        this.setState({
          percentage:1,
          isOnSubmit:true
        },()=>{
          this._uploadNow();
        })

    }


    render() {
        return (
            <Button style={this.props.style} className="btn btn-normal">
                <ViewModal
                    width={this.props.width}
                    name={"Nạp code lên thiết bị ("+ this.grid.rowData.length+')'}
                    isOpen={ this.state.isOpen }
                    onToggle={(isOpen)=>{  this.setState({isOpen:isOpen})  }}
                >
                    <div className="view-modal-body">
                        <BenTable
                            height={this.props.height}
                            grid={this.grid}
                        />
                        <div style={{marginTop:20}}>

                            <Row>
                                <Col md={1}>
                                    <Button disabled={ this.state.isOnSubmit } onClick={ this._onSubmit } className="btn btn-normal bg-green">
                                        <i className="fa fa-cloud-upload"></i> Tải lên
                                    </Button>
                                </Col>
                                <Col md={11} style={{
                                    margin:'auto'
                                }}>
                                    <div style={{display: this.state.status ==='' ? 'none':'block' }} className="progress progress-sm ">
                                        <div
                                            className="progress-bar progress-bar-success progress-bar-striped"
                                            style={{width:  this.state.percentage+'%', height:20 }}>
                                            <span> { Math.floor(this.state.percentage) + '%' } Complete</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>



                        </div>
                    </div>
                </ViewModal>

                <i className={this.props.icon}></i> { this.props.title }
                <Input
                    accept=".xlsx"
                    disabled={ this.props.sn ==='' ? true : false }
                    style={{width: '100%',height: 50,position: 'absolute', top:0, left: 15, opacity: 0}} id="photo" type="file" onChange={ (e)=> { this._handleFile(e) } } >
                </Input>
            </Button>
        );
    }
}

ButtonImportCode2Device.defaultProps = {

    onComplete:(isSuccess)=>{},
    strModel:'products',
    columns:['code','name','type','supplier_codes','price_1','price_2','price_3','price_4','is_serial'],
    sn:'',

    icon:"fa fa-cloud-upload mr-5",
    title:'.xlsx',
    width:'81%',
    height:'55vh'
}

export default ButtonImportCode2Device;

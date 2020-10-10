// DATA 
import Model from '../model/model';
// LIBS 
import XLSX from 'xlsx';


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


class ButtonImportSerial extends Component {

    _index = 0 ;
    _percentage = 0 ;

    constructor(props){
        super(props);

        this.state = {
            status:'',
            columns:props.columns,

            isOpen:false,
            data_fail:[],
            msg:''
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

        this.model = new Model(this.props.strModel);


    }

    _openForm(){

        this.grid.rowData = this.grid.rowData.map((item)=>{
            return {
                code:item.code,
                ...this.props.fields
                
            }
            
        });
        
        this.setState({
            isOpen:true
        });

    }
    _compareColumns(columns=[]){
        
        return columns.equals(this.state.columns)
    }
    _handleFile(e){
        if (e.target.files && e.target.files.length > 0) {
            
            let msg = 'Định dạng cột trong tập tin Excel không hợp lệ';

            const reader = new FileReader();
            reader.readAsArrayBuffer(e.target.files[0]);
    
            reader.onload = (e)=>{

              const data = new Uint8Array(reader.result);
              const wb = XLSX.read(data,{type:'array'});
    
              const sheetName  = wb.SheetNames[0];
              const worksheet = wb.Sheets[sheetName];
              
              let list = XLSX.utils.sheet_to_json(worksheet,{raw:true});
              
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
    }
    
    _uploadNow(){

        const data = this.grid.rowData[this._index]; 
        

        if(this._index < this.grid.rowData.length){

            this.model.axios('post',data,(res)=>{

                if(res.name==='ok' || res.name === 'success'){

                    this._index +=1 ;
                    this._percentage = (this._index * 100)/this.grid.rowData.length;
                    
                    this.setState({
                        status:res.name,
                        msg:res.name
                    });
                    this._uploadNow();
                    
                }else{  

                    let data_fail = this.state.data_fail; 
                    data_fail.push(data); 

                    this.setState({
                        data_fail:data_fail,
                        msg: this.state.data_fail.length +' '+ res.message
                    });

                    this._index +=1 ;
                    this._percentage = (this._index * 100)/this.grid.rowData.length;
                    this._uploadNow();

                    

                }
            })
            
        }else{ 

            if(this.state.msg==='success' || this.state.msg ==='ok'){
                
                this.setState({
                    status:'finish'
                });
                this.props.onComplete(true);
            }    

            
        }
        
    }
    _onSubmit = ()=>{
        
        if(this.props.total === this.grid.rowData.length ){
            this._index = 0 ;
            this._percentage = 0 ;
            this._uploadNow();
        }else{
            BenMessage({
                message:'Số lượng serial/imei không khớp'
            });
        }
        
        
    }

    render() {
        return (
            <Button style={this.props.style} className="btn btn-normal">
                <ViewModal  
                    width={this.props.width}
                    name={this.props.strModel+' : '+this.grid.rowData.length}
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
                                <Col md={12}>
                                    <div style={{display: this.state.status ==='' ? 'none':'block' }} className="progress progress-sm ">
                                        <div 
                                            className="progress-bar progress-bar-success progress-bar-striped" 
                                            style={{width:  this._percentage+'%' }}>
                                            <span> { Math.floor(this._percentage) + '%' } Complete</span>
                                        </div>
                                    </div>   
                                </Col>
                            </Row>

                            <Row style={{marginTop:30}}>
                                <Col md={3}>
                                    <Button onClick={ this._onSubmit } className="btn btn-normal bg-green">
                                        <i className="fa fa-cloud-upload"></i> Tải lên
                                    </Button>
                                </Col>
                                <Col md={7} style={{
                                    margin:'auto'
                                }}>
                                    <span className="text-red font-12"> { this.state.msg } </span>
                                </Col>
                                <Col md={2} className="font-12" style={{textAlign:'right'}}>
                                    {   this.state.data_fail.length +'/'+this.grid.rowData.length }
                                </Col>
                            </Row>
                        </div>
                    </div>
                </ViewModal>

                <i className={this.props.icon}></i> { this.props.title }    
                <Input 
                    accept=".xlsx"
                    style={{width: '100%',height: 50,position: 'absolute', top:0, left: 15, opacity: 0}} id="photo" type="file" onChange={ (e)=> { this._handleFile(e) } } >
                </Input>
            </Button>            
        );
    }
}

ButtonImportSerial.defaultProps = {

    onComplete:(isSuccess)=>{},
    total:0,
    strModel:'products',
    columns:['code','name','type','supplier_codes','price_1','price_2','price_3','price_4','is_serial'],
    fields:{
        product_code:'vt300'
    },
    icon:"fa fa-cloud-upload mr-5",
    title:'.xlsx',
    width:'81%',
    height:'55vh'
}

export default ButtonImportSerial;
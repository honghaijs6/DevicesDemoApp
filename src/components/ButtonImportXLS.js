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


class ButtonImportXLS extends Component {

    _index = 0 ;
    _percentage = 0 ;

    constructor(props){
        super(props);

        this.state = {
            status:'',
            columns:props.columns,

            isOpen:false
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
    }
    
    _uploadNow(){
        const data = this.grid.rowData[this._index]; 
        

        if(this._index < this.grid.rowData.length){

            this.model.axios('post',data,(res)=>{
                this._index +=1 ;
                this._percentage = (this._index * 100)/this.grid.rowData.length;
                
                this.setState({
                    status:res.name
                });

                this._uploadNow();
            })
            
        }else{ 

            BenMessage({
                message:'Đã upload thành công'
            });
            
            this.setState({
                status:'finish',
                isOpen:false
            });

            this.props.onComplete(true);
        }
        
    }
    _onSubmit = ()=>{
        
        this._index = 0 ;
        this._percentage = 0 ;
        this._uploadNow();
        
    }

    render() {
        return (
            <Button style={this.props.style} className="btn btn-normal">
                <ViewModal  
                    width={this.props.width}
                    name={this.props.strModel}
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
                                    <Button onClick={ this._onSubmit } className="btn btn-normal bg-green">
                                        <i className="fa fa-cloud-upload"></i> Tải lên
                                    </Button>
                                </Col>
                                <Col md={11} style={{
                                    margin:'auto'
                                }}>
                                    <div style={{display: this.state.status ==='' ? 'none':'block' }} className="progress progress-sm ">
                                        <div 
                                            className="progress-bar progress-bar-success progress-bar-striped" 
                                            style={{width:  this._percentage+'%' }}>
                                            <span> { Math.floor(this._percentage) + '%' } Complete</span>
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
                    style={{width: '100%',height: 50,position: 'absolute', top:0, left: 15, opacity: 0}} id="photo" type="file" onChange={ (e)=> { this._handleFile(e) } } >
                </Input>
            </Button>            
        );
    }
}

ButtonImportXLS.defaultProps = {

    onComplete:(isSuccess)=>{},
    strModel:'products',
    columns:['code','name','type','supplier_codes','price_1','price_2','price_3','price_4','is_serial'],
    
    icon:"fa fa-cloud-upload mr-5",
    title:'.xlsx',
    width:'81%',
    height:'55vh'
}

export default ButtonImportXLS;
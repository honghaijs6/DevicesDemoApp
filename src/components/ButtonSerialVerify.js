// DATA 
import Model from '../model/model';


import React, { Component } from 'react';
import { Input, Button, Row, Col, FormGroup } from 'reactstrap';

import BenMessage from './BenMessage'; 
import ViewModal  from './ViewModal';


export default class ButtonSerialVerify extends Component {


    _percentage = 0;
    _index=0;

    constructor(props){
        super(props);

        this.state = {
            status:'',
            isOpen:false,
            data:[],
            data_fail:[],
            text:'',
            msg:''

        }


        this._setup();
    }

    _setup(){
        this.model = new Model(this.props.strModel);
    }

    


    _onChange = (e)=>{
        let text = e.target.value;
        text = text.replace(/\n/g,',');
        const data =  text.split(',');
        
        this.setState({
            text:text,
            data:data,
            msg:''
        });
    }

    _detectCode(){
        let ret = true ;
        this.state.data.map((item)=>{
            if(item===''){
                ret = false
            }
        })
        return ret
    }

    _uploadNow(){

        
        
        if(this._index < this.state.data.length){   

            const data = {
                code:this.state.data[this._index],
                ...this.props.fields
            };

            this.model.putCustom('verify',data,(res)=>{
                if(res.name==='ok'){
      
                    this._index +=1 ;
                    this._percentage = (this._index * 100)/this.state.data.length;
                    
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
                        msg: data_fail.length +' '+ res.message
                    });
                    
                    this._index +=1 ;
                    this._percentage = (this._index * 100)/this.state.data.length;
                    this._uploadNow();

                }
            });
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
        // detect code
        
        let msg = '';
        if(this._detectCode()){
            if(this.props.total !== this.state.data.length ){
                msg = 'Tổng số serial/emei cần xác nhận không khớp '
            }else{
                this._uploadNow();

            }
        }else{ msg = 'Vui lòng xem lại số serial/emei' }

        this.setState({
            msg:msg
        })


    }
    render() {
        return (
            <Button onClick={()=>{ this.setState({isOpen:true}) }} style={this.props.style} className="btn btn-normal">
                <ViewModal  
                    
                    width={this.props.width}
                    name={this.props.strModel}
                    isOpen={ this.state.isOpen }
                    onToggle={(isOpen)=>{  this.setState({isOpen:isOpen})  }}
                >
                    <div className="view-modal-body">
                        <FormGroup row>
                            <Col md={12}>
                                <label> Số serial/Imei </label>
                                <Input value={this.state.text} onChange={ this._onChange }  type="textarea" style={{height:120}} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={10}>
                                <Button onClick={this._onSubmit} className="btn btn-normal bg-green">
                                   <i className="fa fa-bug mr-5"></i> Xác nhận
                                </Button>
                                <span className="text-red form-response ml-10  font-11"> { this.state.msg } </span>
                            </Col>
                            <Col md={2} style={{
                                textAlign:'right'
                            }}>
                                <span className="text-red">  { this.state.data_fail.length } </span> / <span className="text-green"> { this.state.data.length } </span>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={12}>
                                <div style={{display: this.state.status ==='' ? 'none':'block' }} className="progress progress-sm ">
                                    <div 
                                        className="progress-bar progress-bar-success progress-bar-striped" 
                                        style={{width:  this._percentage+'%' }}>
                                        <span> { Math.floor(this._percentage) + '%' } Complete</span>
                                    </div>
                                </div>
                            </Col>
                        </FormGroup>
                    </div>
                </ViewModal>
                <i className={this.props.icon}></i> { this.props.title }    
            </Button>
        );
    }
}

ButtonSerialVerify.defaultProps = {
    onComplete:()=>{},
    icon:"fa fa-cloud-upload mr-5",
    title:'.xlsx',
    width:'81%',
    height:'55vh',  
    strModel:'model',
    total:0,
    fields:{
        warehouse_receipt_code_out:''
    }
}
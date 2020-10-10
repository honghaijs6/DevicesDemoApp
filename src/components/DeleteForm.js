
// HOOKS
import detectForm from '../hook/before/detectform';

import React, { Component } from 'react';
import { Row, Col, Button, FormGroup } from 'reactstrap';

import ViewModal from '../components/ViewModal';
import SelectListModel from '../components/SelectListModel' ; 



export default  class DeleteForm extends Component {
    

    
    _curInfo = {}

    constructor(props){
        super(props);

        this.state = {
            delete_reason_id:0
        }

        this._cancel = this._cancel.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    
    _cancel(){
        document.querySelector('.close').click();

    }
    _onSubmit(){

        const fields = ['delete_reason_id']
        if(detectForm(fields,this.state)===''){
            
            const data = {
               id:this._curInfo.id,
               delete_reason_id:this.state.delete_reason_id 
            };
            
            this.props.model.putCustom('cancel',data,(res)=>{
            
                if(res.name === 'success' || res.name==='ok'){
                    this.props.onSubmitForm(res);
                }
            });


        }
        
    }

    componentDidMount(){
        this.model = this.props.model ; 

    }
    
    componentWillReceiveProps(newProps){
        this._curInfo = newProps.data;
    }
    render() {
        return (
            <ViewModal name="Cảnh báo" { ...this.props } onToggle={(isOpen)=>{  this.props.onToggle(isOpen)}} >
                <div style={{
                    padding:'20px 10px'
                }}>
                    <p> Bạn có chắc là muốn xoá dữ liệu này? </p>
                    <FormGroup>
                        <Row>
                            <Col md={12}>
                                <label> Lý do xoá </label>
                                <SelectListModel id="delete_reason_id" onChange={(e)=>{ this.setState({delete_reason_id:e.target.value}) }} strModel="delete_reasons" name="Vui lòng chọn" />
                            </Col>
                        </Row>
                    </FormGroup>
                
                </div>
                <div style={{
                    padding:'30px 0px',
                    marginBottom:20
                }}>
                    <div className="float-left">
                        <div className="form-err text-red" id="form-err"></div>
                    </div>
                    <div className="float-right">
                        <div role="group" className="btn-group">
                            <Button className="btn-ubuntu bg-dark" onClick={ this._cancel }> <i className="fa fa fa-reply"></i> Từ Chối  </Button>
                            <Button  className="btn-ubuntu-ok bg-green" onClick={  this._onSubmit }> <i className="fa fa-chevron-circle-right"></i> Đồng Ý </Button>
                        </div>
                    </div>
                </div>                  
            </ViewModal>
        );
    }
}


DeleteForm.defaultProps = {
    onSubmitForm:()=>{},
    data:{}
}
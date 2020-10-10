
// HOOKS
import detectForm from '../../../../../hook/before/detectform'
import { myTime } from '../../../../../hook/ultil/myTime';
import moment from 'moment';

import React from 'react';
import {
    Col, FormGroup, Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from 'reactstrap';


import ViewModal from '../../../../../components/ViewModal';
import SelectList from '../../../../../components/SelectList';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};


class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _resetForm(){

        const test = this.state.id !== undefined ? delete this.state.id : null;

        return {
            code:'',
            value:10,
            number_offer:1,
            date_begin:new Date(myTime.curDateEn()),
            date_finish:new Date(myTime.curDateEn()).addDays(30),
            card_type:1
        }
    }

    _onSubmit = ()=>{

        const fields = ['number_offer','value'];
        if(detectForm(fields,this.state)===''){

            const start = moment(this.state.date_begin,"YYYY-MM-DD");
            const end = moment(this.state.date_finish,"YYYY-MM-DD");
            const numDays = this._calculateDay();
            if(numDays>0){
                this.props.onSubmit(this.state);
            }else{ document.getSelection('#form-err').innerHTML = ' Please check your date begin - finish  '; }

        }
    }

    _onChange = (field,value)=>{

        document.querySelector('#form-err').innerHTML = '';
        this.setState({
            [field]:value
        })
    }

    _calculateDay(){
        const start = moment(this.state.date_begin,"YYYY-MM-DD");
        const end = moment(this.state.date_finish,"YYYY-MM-DD");



        return parseInt(moment.duration(end.diff(start)).asDays());

    }

    componentWillReceiveProps(newProps){

        let state = this._resetForm();
        if(newProps.typeAction==='put'){

            const data = newProps.data;
            Object.assign(state,{
                id:data.id,
                code:data.code,
                value:data.value,
                number_offer:data.number_offer,
                date_begin: new Date( moment(data.date_begin).format('YYYY-MM-DD') ),
                date_finish: new Date( moment(data.date_finish).format('YYYY-MM-DD') ),
                card_type:data.card_type

            })
        }

        this.setState(state);
    }

    render() {

        const valueTypes = ['%','$'];
        return (
            <ViewModal name='Vé' {...this.props} isFooter={true} onSubmit={this._onSubmit} >
                <div className="view-modal-body">
                    <FormGroup row>


                        <Col md={4}>
                            <label>Mã </label>
                            <Input
                              type="text"
                              onChange={(e)=>{ this._onChange('code',e.target.value) }}
                              defaultValue={ this.state.code }
                            />
                        </Col>

                        <Col md={4}>
                            <label> Kiểu vé  </label>
                            <SelectList defaultValue={1} onChange={(e)=>{ this._onChange('card_type',e.target.value) }} rows={[
                              { code:0, name:'QRCode'},
                              { code:1, name:'Mifare'},

                            ]} />
                        </Col>



                        {/*}<Col md={5}>
                            <label> Từ - Đến ngày : <span className="text-red"> { this._calculateDay() } days</span></label>
                            <div>
                                <DatePicker
                                    selected={ this.state.date_begin }
                                    dateFormat="yyyy-MM-dd"
                                    className="input-datepicker-start"
                                    onChange={(value)=>{ this.setState({date_begin:value}) }}
                                />
                                <DatePicker
                                    selected={ this.state.date_finish }
                                    dateFormat="yyyy-MM-dd"
                                    className="input-datepicker-end"
                                    onChange={(value)=>{ this.setState({date_finish:value}) }}
                                />
                            </div>

                        </Col>*/}
                        <Col md={3}>
                            <label> Loại </label>
                            <SelectList defaultValue="nguoilon" onChange={(e)=>{ this._onChange('type',e.target.value) }} rows={[
                              { code:'nguoilon', name:'Người lớn'},
                              { code:'treem', name:'Trẻ em'},

                            ]} />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col md={4}>
                            <label> Số lần cho phép </label>
                            <Input
                                id="number_offer"
                                onChange={(e)=>{ this._onChange('number_offer',e.target.value) }}
                                defaultValue={this.state.number_offer} min={1} max={1000000} type="number" />
                        </Col>
                        <Col md={4}>
                            <label> Giá trị </label>
                            <InputGroup>
                                <Input
                                    onChange={(e)=>{ this._onChange('value',e.target.value) }}
                                    type="number" min="0" max="100"
                                    defaultValue={this.state.value} id="value"
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText> $Xu </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </FormGroup>

                </div>
            </ViewModal>
        );
    }
}

MyForm.defaultProps = {
    data:{},
    typeAction:'post',
    onSubmit:()=>{}
}

export default MyForm;

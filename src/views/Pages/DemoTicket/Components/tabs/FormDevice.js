
// HOOKS
import detectForm from '../../../../../hook/before/detectform'

import React from 'react';
import {
    Col, FormGroup, Input,
} from 'reactstrap';


import ViewModal from '../../../../../components/ViewModal';
import SelectList from '../../../../../components/SelectList';




class MyForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    _resetForm(){

        const test = this.state._id !== undefined ? delete this.state._id : null;

        return {
            name:'',
            gate_no:'',
            iconType:2
        }
    }

    _onSubmit = ()=>{


        const fields = ['name','gate_no'];

        if(detectForm(fields,this.state)===''){

          const data = Object.assign({},this.state)
          this.props.onSubmit(data);

        }

        /*const fields = ['number_offer','value'];
        if(detectForm(fields,this.state)===''){

            const start = moment(this.state.date_begin,"YYYY-MM-DD");
            const end = moment(this.state.date_finish,"YYYY-MM-DD");
            const numDays = this._calculateDay();
            if(numDays>0){
                this.props.onSubmit(this.state);
            }else{ document.getSelection('#form-err').innerHTML = ' Please check your date begin - finish  '; }

        }*/
    }

    _onChange = (field,value)=>{

        document.querySelector('#form-err').innerHTML = '';
        this.setState({
            [field]:value
        })
    }



    componentWillReceiveProps(newProps){

        let state = this._resetForm();
        if(newProps.typeAction==='put'){

            const data = newProps.data;
            Object.assign(state, data) ;

        }

        this.setState(state);
    }

    render() {


        return (
            <ViewModal {...this.props} isFooter={true} onSubmit={this._onSubmit} >
                <div className="view-modal-body">
                    <FormGroup row>


                        <Col md={4}>
                            <label> Tên thiết bị </label>
                            <Input
                              type="text"
                              id="name"
                              onChange={(e)=>{ this._onChange('name',e.target.value) }}
                              defaultValue={ this.state.name }
                            />
                        </Col>

                        <Col md={4}>
                            <label> Serial No  </label>
                            <Input
                              id="sn"
                              disabled={true}
                              type="text"
                              onChange={(e)=>{ this._onChange('sn',e.target.value) }}
                              defaultValue={ this.state.sn }
                            />

                            {/*<SelectList defaultValue={1} onChange={(e)=>{ this._onChange('sn',e.target.value) }} rows={[
                              { code:0, name:'QRCode'},
                              { code:1, name:'Mifare'},

                            ]} />*/}

                        </Col>

                        <Col md={4}>
                            <label> IP Address </label>
                            <Input
                              type="text"
                              id="IPAddress"
                              disabled={true}
                              onChange={(e)=>{ this._onChange('IPAddress',e.target.value) }}
                              defaultValue={ this.state.IPAddress }
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col md={4}>
                            <label> Icon Type </label>
                            <SelectList defaultValue={ this.state.iconType || 2 } onChange={(e)=>{ this._onChange('iconType',e.target.value) }} rows={[
                              { code:0, name:'Door'},
                              { code:1, name:'Parking barrier'},
                              { code:2, name:'Plap barrier'},
                            ]} />
                        </Col>
                        <Col md={4}>
                            <label> Mã Khu vực </label>
                            <Input
                              type="text"
                              id="gate_no"
                              onChange={(e)=>{ this._onChange('gate_no',e.target.value) }}
                              defaultValue={ this.state.gate_no }
                            />

                            {/*<InputGroup>
                                <Input
                                    onChange={(e)=>{ this._onChange('value',e.target.value) }}
                                    type="number" min="0" max="100"
                                    defaultValue={this.state.value} id="value"
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText> $Xu </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>*/}
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

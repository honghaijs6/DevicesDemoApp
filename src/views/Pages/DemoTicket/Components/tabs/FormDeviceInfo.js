
// HOOKS
import moment from 'moment';

import React from 'react';
import {
    Col, FormGroup, Input,
} from 'reactstrap';


import ViewModal from '../../../../../components/ViewModal';




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



    render() {



        const data = Object.assign({},this.props.data);

        delete data.EventTypes ;
        delete data._id;
        delete data.json;
        delete data.SessionID ;
        delete data.updatedAt;



        return (
            <ViewModal {...this.props} isFooter={false}  >
                <div className="view-modal-body" style={{ height: '70vh', overflowY:'auto', overflowX:'hidden'}}>

                  {
                    Object.keys(data).map((item)=>{
                      return(
                        <FormGroup row>
                          <Col md={4}>
                            <label> { item } </label>
                          </Col>
                          <Col md={8} className="text-green">
                             { data[item] }
                          </Col>
                        </FormGroup>
                      )
                    })
                  }


                </div>
            </ViewModal>
        );
    }
}

MyForm.defaultProps = {
    data:{},

}

export default MyForm;

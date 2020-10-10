
// HOOKS
import detectForm from '../../../../../hook/before/detectform'

import React from 'react';
import {
  Col, FormGroup, Input,
} from 'reactstrap';

import ViewModal from '../../../../../components/ViewModal';
import SelectList from '../../../../../components/SelectList';







class FormInputCommand extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

          sObject:'',
          sFunction:'',
          cmd:''
        };

        this.arrObject = [
          {
            code:'user', name:'User', cmds:[
              { code:'update', desc:'DATA UPDATE user cardno=20002	pin=1000	password=	starttime=0	endtime=0	name=Keith	superauthorize=0	disable=0'},
              { code:'delete', desc:'DATA DELETE user pin=1000'},
              { code:'query', desc:'DATA QUERY tablename=user,fielddesc=*,filter =*'},
              { code:'count', desc:'DATA COUNT user'},
            ]

          },
          { code:'timezone', name:'Timezone', cmds:[
              { code:'update',desc:'DATA UPDATE timezone timezoneid=1	suntime1=91750430'},
              { code:'delete',desc:'DATA DELETE timezone timezoneid=1'},
              { code:'query',desc:'DATA QUERY tablename=timezone,fielddesc=*,filter =*'},
              { code:'count',desc:'DATA COUNT timezone'}
            ]

          },
          { code:'userauthorize', name:'Access level', cmds:[

              { code:'update', desc:'DATA UPDATE userauthorize pin=1000	authorizetimezoneid=1	authorizedoorid=1' },
              { code:'delete', desc:'DATA DELETE userauthorize pin=1000	authorizedoorid=1' },
              { code:'query', desc:'DATA QUERY tablename=userauthorize,fielddesc=*,filter =*' },
              { code:'count', desc:'DATA COUNT userauthorize' },
            ]

          },
          { code:'transaction', name:'Transaction', cmds:[

              { code:'update', desc:''},
              { code:'delete', desc:'DATA DELETE transaction *'},
              { code:'query', desc:'DATA QUERY tablename=transaction,fielddesc=*,filter =*'},
              { code:'count', desc:'DATA COUNT transaction'},

            ]

          },
          { code:'device', name:'Device', cmds:[
              { code:'update', desc:''},
              { code:'delete', desc:''},
              { code:'query', desc:''},
              { code:'count', desc:''},

              { code:'opendoor', desc:'CONTROL DEVICE 01010103'},
              { code:'cancelalarm', desc:'CONTROL DEVICE 02000000'},
              { code:'rebot', desc:'CONTROL DEVICE 03000000'},

            ]

          },
        ];

        this.arrFunction = [
          { code:'update', name:'Add/Update'},
          { code:'delete', name:'Delete'},
          { code:'query', name:'Query all'},
          { code:'count', name:'Count'},
          { code:'opendoor', name:'Open Door'},
          { code:'cancelalarm', name:'Cancel Alarm'},
          { code:'rebot', name:'Reboot device'}
        ];


    }

    _resetForm(){

        // USED FOR NEDB ONLY
        const test = this.state._id !== undefined ? delete this.state._id : null;

        return {
            cmd:'',
            sn:''
        }
    }

    _onSubmit = ()=>{


      const fields = ['cmd','sn'];

      if(this.state.sn!==''){
        if(detectForm(fields,this.state)===''){

          const data = Object.assign({},this.state) ;

          this.props.onSubmit(data);


        }
      }else{
          document.querySelector('#form-err').innerHTML = 'Vui lòng chọn thiết bị';
      }




    }

    _onChange = (field,value)=>{

      // RESET FORM ERR HERE
      document.querySelector('#form-err').innerHTML = '';
      this.setState({
          [field]:value
      })
    }


    componentWillReceiveProps(newProps){

      let state = this._resetForm();


      if(JSON.stringify(newProps.data) !=='{}'){

          const data = newProps.data;
          Object.assign(state, data);

      }

      this.setState(state);
    }



    _onChangeType(type,value){


        let cmd = '';
        this.setState({[type]:value},()=>{
          let { sFunction, sObject } = this.state

          if(sFunction !== '' && sObject !==''){

            const listCmd =  this.arrObject.filter((item)=> item.code === sObject )[0]['cmds'] ;

            try{
              cmd = listCmd.filter((item)=> item.code === value)[0]['desc'];
            }catch(err){}

          }

          this.setState({ [type]:value, cmd:cmd})
        })

    }


    render() {
      return (
            <ViewModal {...this.props} isFooter={true} onSubmit={this._onSubmit} >
                <div className="view-modal-body">
                    <FormGroup row>


                        <Col md={4}>
                            <label> Đối tượng  </label>
                            <SelectList onChange={(e)=>{ this._onChangeType('sObject',e.target.value) }} rows={  this.arrObject } />
                        </Col>

                        <Col md={4}>
                            <label> Phương thức  </label>
                            <SelectList onChange={(e)=>{ this._onChangeType('sFunction',e.target.value) }} rows={  this.arrFunction } />

                            {/*<SelectList defaultValue={1} onChange={(e)=>{ this._onChange('sn',e.target.value) }} rows={[
                              { code:0, name:'QRCode'},
                              { code:1, name:'Mifare'},

                            ]} />*/}


                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col md={12}>
                            <div>
                              <label> Command </label>
                              <Input
                                type="textarea"
                                id="cmd"

                                value={ this.state.cmd }
                                onChange={(e)=>{ this._onChange('cmd',e.target.value) }}


                                style={{ background:'#333', height:90, color:'#fff'}}
                              />
                            </div>

                            <div style={{ marginTop:10}}>
                              <label> Response </label>
                              <pre id="data-response" style={{ height:340, width:'100%', background:'#333', color:'#fff'}}>

                              </pre>
                            </div>



                        </Col>
                    </FormGroup>


                </div>
            </ViewModal>
        );
    }

}

FormInputCommand.defaultProps = {
  data:{}
}

export default FormInputCommand;

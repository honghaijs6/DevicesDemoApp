import React, {Component} from 'react';

import {Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';


/*
BenModal : props
  - onAction :  rule state : { onAction, status}
  - modal : it is a controller class
  - name : string

  refErr : React.createRef  object
*/

export default class ViewModal extends Component{


  constructor(props){

    super(props)

    this.state = {}

    this.toggle = this.toggle.bind(this);
    this._cancel = this._cancel.bind(this);
    this._onSubmit = this._onSubmit.bind(this);


  }

  toggle(){

    const isOpen = !this.state.isOpen;
    this.setState({
        isOpen:isOpen
    });

    this.props.onToggle(isOpen);


  }

  componentWillReceiveProps(newProps){
      this.setState(newProps)
  }

  _cancel(){
    document.querySelector('.close').click();
  }
  _onSubmit(){
    this.props.onSubmit();
  }
  render(){

    const FormFooter = this.props.isFooter ? (
      <ModalFooter>

            <div className="float-left mr-10">
                <div className="form-err text-red" id="form-err"></div>
            </div>

            <ButtonGroup className="float-right">
              <Button className="btn-ubuntu-ok bg-dark" style={{ border:0}} onClick={ this._cancel }> <i className="fa fa fa-reply"></i> Từ Chối  </Button>
              <Button  className="btn-ubuntu-ok bg-green" style={{ border:0}} onClick={  this._onSubmit }> <i className="fa fa-chevron-circle-right"></i> Đồng Ý </Button>
            </ButtonGroup>

      </ModalFooter>
    ) : <div></div>

    return(
      <Modal  style={{
          'minWidth': this.props.width,

        }}  isOpen={ this.state.isOpen } fade={false}   toggle={ this.toggle } >

        <ModalHeader toggle={ this.toggle }> { this.props.name }  </ModalHeader>

        <ModalBody style={{
            fontFamily:'Roboto',
            padding:20,

          }}>


            { this.props.children }

        </ModalBody>

        { FormFooter }

      </Modal>
    )
  }
}

ViewModal.defaultProps = {
  onToggle:()=>{},
  onSubmit:()=>{}
}

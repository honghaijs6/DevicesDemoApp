import React, {Component} from 'react';

import { Button, Modal, ModalHeader, ModalBody, Form} from 'reactstrap';

class BenModal extends Component{


  constructor(props){

    super(props)

    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  toggle(){
    this.props.modal.toggle()
  }

  onSubmit(){
    this.props.modal.onSubmit()
  }

  render(){

    return(
      <Modal  size="lg" style={{
          'minWidth': this.props.width
        }}  isOpen={ this.props.modal.active } fade={false}   toggle={ this.toggle } >
        <ModalHeader toggle={ this.toggle }> { this.props.name }  </ModalHeader>

        <ModalBody style={{
            padding:30
          }}>
          <Form>
            { this.props.children }
          </Form>
        </ModalBody>

        <div className="my-modal-footer">
           <div className="float-left" style={{marginTop:10}}>
              <div className="form-err text-muted" id="form-err"></div>
           </div>
           <div className="float-right">
               <div role="group" className="btn-group">
                     <Button className="btn-ubuntu bg-dark" onClick={ this.toggle }> <i className="fa fa fa-reply"></i> Từ Chối  </Button>
                     <Button  className="btn-ubuntu-ok bg-green" onClick={  this.onSubmit }> <i className="fa fa-chevron-circle-right"></i> Đồng Ý </Button>
               </div>

           </div>

        </div>
        
      </Modal>
    )
  }
}

BenModal.defaultProps = {
  modal:{
    active:false,
    toggle:function(){ alert('toggle close Modal') },
    onSubmit:function(){ alert('on submit form') }
  }
}

export default BenModal;

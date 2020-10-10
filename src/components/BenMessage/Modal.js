import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

export default class MessageModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: true
        };

        
    }

    toggle(result = true) {
        this.setState({
            modalOpen: !this.state.modalOpen
        });

        if (typeof this.props.onClose === 'function') {
            this.props.onClose(result);
        }
    }


    render() {
        const {
            message,
            title,
            confirmText,
            cancelText,
            confirmColor,
            cancelColor,
            className
        } = this.props;

        let modalHeader = null;
        let cancelButton = null;

        if (title) {
            modalHeader = (
                <ModalHeader toggle={() => {
                    this.toggle(false);
                }}>{title}</ModalHeader>
            );
        }

       

        return (
            <Modal isOpen={this.state.modalOpen} toggle={() => {
                this.toggle(false);
            }} className={className}>
                {modalHeader}
                <ModalBody style={{textAlign:'center',fontFamily:'Roboto',padding:20}}>{message}</ModalBody>
            </Modal>
        );
    }
}

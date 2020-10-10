
import { render } from 'react-dom';
import React from 'react';
import Modal from './Modal';

export default class Message {
    constructor(options) {


        this.options = {
          message: 'Are you sure?',
          title: 'Message',
          confirmText: 'I Agree',
          cancelText: 'Cancel',
          confirmColor: 'primary',
        }
        Object.assign(this.options,options);


        this.el = document.createElement('div');
    }

    open() {
        
        return render(
            <Modal
                {...this.options}
                
            />,
            this.el
        );
    }
}


import { render } from 'react-dom';
import React from 'react';
import Modal from './Modal';

export default class Confirm {
    constructor(options) {


        this.options = {
          message: 'Are you sure?',
          title: 'Warning!',
          confirmText: 'Đồng ý',
          cancelText: 'Từ chối',
          confirmColor: 'primary',
        }
        Object.assign(this.options,options);


        this.el = document.createElement('div');
    }

    open() {
        let confirmPromise = new Promise(resolve => {
            render(
                <Modal
                    {...this.options}
                    onClose={result => {
                        resolve(result);
                    }}
                />,
                this.el
            );
        });

        return confirmPromise;
    }
}


import  uploadPhoto  from '../hook/ultil/uploadPhoto';

import React from 'react';
import { Input  } from 'reactstrap';

class ButtonUploadImage extends React.Component {


    constructor(props){
        super(props);
        

        this.state = {
            onAction:'',
            photo_base64:'',
            photo:{
              base64:'',
              name:'',
              type:''
            }
        }
        
    }

    async _handleFile(e){
        
        if (e.target.files && e.target.files.length > 0) {
            
            const res = await uploadPhoto(e.target.files[0]);
            

            if(this.props.onUploaded!==undefined){
                this.props.onUploaded(res);
            }
            
            
        }
    }
    render() {
        return (
            <button className="btn btn-ubuntu" style={{
                width: 90,height: 90
              }}>
                <i className="fa fa-upload" style={{fontSize: 20}}></i>
                
                <Input 
                    accept=".png,.jpg"
                    style={{width: 90,height: 90,position: 'absolute', top:0, left: 15, opacity: 0}} id="photo" type="file" onChange={ (e)=> { this._handleFile(e) } } ></Input>
                    

            </button>
        );
    }
}


export default ButtonUploadImage;

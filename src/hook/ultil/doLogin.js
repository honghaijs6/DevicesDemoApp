
import {preLoad} from '../before' ; 

import axios from 'axios';
import server from '../../config/server';




// info = {email:'',password:''}
const doLogin = (email='',password='')=>{
    

    return new Promise((resolve,reject)=>{

        const url = server.base()+'/authentication';
        
        const data = {
            "strategy":"local",
            "email":email,
            "password":password
        }
        
        preLoad('post');

        axios.post(url,data)
          .then((res)=>{
            
            preLoad('stop'); 

            if(res.data !== undefined){
                resolve({
                    token:res.data.accessToken
                });
            }

            resolve(res);

          },(error)=>{

            preLoad('stop'); 
            
            resolve({
                token:'no-key'
            });
            

    });

    })

}

export default doLogin;

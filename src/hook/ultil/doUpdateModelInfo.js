import axios from 'axios';
import server from '../../config/server' ; 

import {preLoad} from '../before' ; 


const doUpdateModelInfo = (strModel=null,data={})=>{

    let ret = {
        name:'hook-error',  
        message:''
    }

    return new Promise((resolve,reject)=>{

        if(strModel !==null && JSON.stringify(data)!=={}){
            
            if(data.id !== undefined){
                const id = data.id ;     
                
                const url = server.base() + '/' + strModel + '?id='+id;
                
                preLoad('put');
                

                axios.put(url,data,server.setHeader())
                    .then((res)=>{
                        
                        resolve(res.data) ; 
                        preLoad('stop'); 


                    },(error)=>{

                         
                        preLoad('stop'); 

                })
            }else{  
                ret.message = 'Thiếu gia trị ID ';
                resolve(ret); 

            }   
                        
        }else{
            resolve(ret);
        }
        
    })

}

export default doUpdateModelInfo ; 
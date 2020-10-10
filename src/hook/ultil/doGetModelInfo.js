
import axios from 'axios';
import server from '../../config/server';


export default function(strModel=null,id=0){

    let ret = {
        name:'hook-error',
        message:''
    };  

    return new Promise((resolve,reject)=>{

        if(strModel!==null){

            const url = server.base()+'/'+strModel+'/getInfo/'+id;

            axios.get(url)  
                .then((res) => {
                    
                    
                    if(JSON.stringify(res.data) !=='{}'){
                        Object.assign(ret,{
                            name:'success',
                            data:res.data
                        });
                    }

                    resolve(ret);
                },
                (error) => {

                    var status = error.response.status;
                    alert(JSON.stringify(error));

                }
            );
            
        }else{
            ret.message = 'Thiếu strModel';
            resolve(ret)
        }

        

    })

}
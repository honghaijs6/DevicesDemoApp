
import axios from 'axios' ;
import server from '../config/server';
import { reject } from 'q';



class zkpush {

  constructor(){


    this.base =  server.base()+'/pushapi/createCmd?cmdType=userDefined'


  }

  static loadDevice(){

    return new Promise((resolve, reject)=>{

      const url = server.base()+'/pushapi/deviceServlet?type=1';
      axios.post(url).then((responese)=>{
        const res = responese.data ;
        if(res.desc==='ok'){


          resolve(res.data) ;


          //this.grid.rowData = res.data ;

        }
      });

    })


  }

  createCmd(cmd='',sn=''){


    return new Promise((resolve,reject)=>{



      const url = server.base()+'/pushapi/createCmd?cmdType=userDefined&sn='+sn.trim();

        axios.post(url,{

          "originalCmd":cmd
        }).then((responese)=>{
          const res = responese.data ;

          resolve(res) ;


        });


    })



  }





}

export default zkpush ;

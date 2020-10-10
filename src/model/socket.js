

import feathers from '../feathers'

const  CREATED = 'created';
const  UPDATED = 'updated';
const  REMOVED = 'removed';


export default class Socket {

  static client = feathers

  constructor(service){


    /* WHAT : DATA */
    this.model = service;
    this.state = {
      onAction:'',
      status : '',
      timeout:5000,
      time_resp:2000,
      res:{}
    };


    /*  initial WHO */
    this._setup()


  }

  /* WHEN */
  clientListenServer(onSuccess){
      const _this = this ;

      this.service.on(CREATED,(res)=>{

        this._socketResp(res);

        window.setTimeout(()=>{
          onSuccess(res);
        },this.state.time_resp)

      });

      this.service.on(UPDATED,(res)=>{

        this._socketResp(res);

        window.setTimeout(()=>{
          onSuccess(res);
        },this.state.time_resp)
      });

      this.service.on(REMOVED,(res)=>{

        this._socketResp(res);

        window.setTimeout(()=>{
          onSuccess(res);
        },this.state.time_resp)
      });

  }
  /* END WHEN */


  /* HOW */
  _setup(){
    this.service = feathers.service(this.model) ;
    this.service.timeout = this.state.timeout ;

    this._whereStateChange({
      onAction:'setup',
    })
  }

  _reset(status){
    this.service = feathers.service(this.model) ;
    this.service.timeout = this.state.timeout ;

    this._whereStateChange({
      onAction:'reset',
      status:status
    })
  }
  
  setTimeDelay(num){
      this.state['time_resp'] = num;
      this._reset('setTimeout');

  }
  setTimeout(num){
    this.state['timeout'] = num ;
    this._reset('setTimeout');
  }

  _socketResp(res){

    this._whereStateChange({
      onAction:'socketResp',
      res:res
    });
  }
  /* END HOW  */


  /* WHERE */
  _whereStateChange(newState){
    Object.assign(this.state,newState);

    /* write socket log here */
  }

  /* RESONE TRUC TIẾP */



  /*create(data={}){ this.socket.create(data)}
  update(id=null,data={}){ this.socket.update(id,data,{}) }
  remove(id=null){ this.socket.remove(id,{ query:{ cascade:true} })  }*/



}


// DATABASE
import server from '../config/server';
import axios from 'axios';

// HOOK
import { preLoad } from '../hook/before';

class Model {

  constructor(model,dispatcher=null){

    this.model = model; // string
    this.dispatcher = dispatcher ;


    this.data = [];
    this.state = {}

    /*database*/
    this.db = {
      type:'GET',
      url:'',
      base:server.base() + '/'+ this.model+'?',
      config:'',
      total:0
    };

    this.paginate = {
      p:0,
      offset:0,
      max:20,
      is_deleted:0,
      key:'',
      sort_by:'date_created',
      sort_type:'DESC'
    }

    this.total = 0


    this.setup();


  }

  setup(){

    this.jwt = localStorage.getItem('feathers-jwt');
    // SETUP MAC DINH
    this.set('method',{
      name:'listAll',
      params:'all'
    });

    // database
    this.configDB();

  }

  configDB(){

    let  url = this.db.base +   Object.keys(this.paginate).map((key)=>{
        return key +'='+ this.paginate[key]
    }).join('&');

    /* RECONFIG DB QUERY */
    if(typeof this.db.method !== 'undefined'){

      const base  = this.db.base.replace('?','');

      url = base +'/'+ this.db.method.name+'/'+this.db.method.params+'?'+ Object.keys(this.paginate).map((key)=>{
          return key +'='+ this.paginate[key]
      }).join('&');

    }

    this.db.url = url;
    this.db.config = server.setHeader();


  }

  resetConfigDB(name,value){
    if(name==='paginate'){
        //this.paginate = value ; // value = {}
        Object.assign(this.paginate,value);

    }else{
      this.db[name] = value;

    }

    this.configDB();


  }

  /* WHEN */
  /* start listen to socket server -> save LocalData -> send to reducers
    tren cung 1 may tinh se ko cap nhat socket realtime
  */

  /********WHEN *********** */
  onError(err){


    console.log(err);

    /*const data = err.response.data ;
    const msg = data.errors[0];
    if(typeof msg === 'object'){
      msg = msg.message.indexOf('must be unique') >-1 ? 'Mã này đã được dùng' : msg.message ;
    }

    let el = document.querySelector("#form-err");
    console.log(err);

    if(el !== null){
      el.innerHTML = msg;
      setTimeout(()=>{
        el.innerHTML = 'status';
      },2000)
    }else{  console.log(msg);}*/

    // end show
  }


  axios(method,data={},onSuccess){

    switch (method) {
      case 'post':
          this.post(data,onSuccess);
      break;
      case 'put':

          const id = data.id;
          this.put(id,data,onSuccess);
      break;

    }

  }

  /* [id1,id2,id3] */
  deleteMulti(list=[]){



    if(list.length>0){

      const id = list[0].id;
      this.delete(id,(res)=>{
        if(res.name==='success' || res.name ==='ok' ){
          let newlist = list.filter((item) => { return parseInt(item.id) !== parseInt(id) })
          this.deleteMulti(newlist);
        }
      })
    }

  }

  delete(id,onSuccess){

    this.db.type = 'DELETE';
    const url = server.base() + '/' + this.model+'/'+id ;

    preLoad('delete');


    axios.delete(url,this.db.config)
          .then((res)=>{
            this.listenDataChange(res);
            onSuccess(res.data);
          },(error)=>{
            this.onError(error)

      })

  }

  post(data,onSuccess){

    this.db.type = 'POST';
    this.status = data ;

    const url = server.base()+ '/' + this.model;

    //preLoad('post');
    axios.post(url,data,this.db.config)
          .then((res)=>{

            this.listenDataChange(res) // CAP NHAT REDUX STORE
            onSuccess(res.data) // callback for auto notification


          },(error)=>{

          this.onError(error);

    });

  }

  put(id,data,onSuccess){

    this.db.type = 'PUT';
    this.status = data ;

    const url = server.base() + '/' + this.model + '?id='+id;

    preLoad('put');


    axios.put(url,data,this.db.config)
          .then((res)=>{
            this.listenDataChange(res);
            onSuccess(res.data)
          },(error)=>{

            this.onError(error)

    })

  }

  putCustom(method,data,onSuccess){

    this.db.type = method === 'cancel' || method ==='delete' || method ==='remove' ? 'DELETE' :  'PUT';
    this.status = data ;

    const url = server.base() + '/' + this.model + '/'+method;

    preLoad('put');


    axios.put(url,data,this.db.config)
          .then((res)=>{
            this.listenDataChange(res);
            onSuccess(res.data)
          },(error)=>{

            this.onError(error)

    })

  }


  goto(p=0,onSuccess){

    const paginate  = this.paginate ;

    let offset = 0 ;
    offset = parseInt(paginate.max) * (p);

    this.resetConfigDB('paginate',Object.assign(paginate,{
      offset:offset,
      p:p
    }));

    this.fetch((res)=>{

      this.listenDataChange(res);
      onSuccess(res);
    },(err)=>{

      this.onError(err);

    });

  }

  pre(onSuccess){

    const { total } = this.db ;
    const paginate = this.paginate ;

    let next = paginate.p - 1;

    let pages = Math.ceil( parseInt(total) / parseInt(paginate.max));
    next = next < pages ? next : pages - 1 ;

    let offset = 0 ;
    let page = next ;

    offset = parseInt(paginate.max) * (page);

    this.resetConfigDB('paginate',Object.assign(paginate,{
      offset:offset,
      p:page
    }));


    this.fetch((res)=>{
      this.listenDataChange(res);
      onSuccess(res);
    },(err)=>{
      this.onError(err);

    });

  }

  next(onSuccess){

    const { total } = this.db ;
    const paginate = this.paginate;
    let next = paginate.p + 1;

    let pages = Math.ceil( parseInt(total) / parseInt(paginate.max));
    next = next < pages ? next : pages - 1 ;

    let offset = 0 ;
    let page = next ;

    offset = parseInt(paginate.max) * (page);

    this.resetConfigDB('paginate',Object.assign(paginate,{
      offset:offset,
      p:page
    }));


    this.fetch((res)=>{
      this.listenDataChange(res);
      onSuccess(res);
    },(err)=>{
      this.onError(err);

    });


  }

  // initial data : and start socket
  async initData(){

    return new Promise((resole,reject)=>{
      this.fetch((res)=>{
        this.listenDataChange(res);

        resole(res);

      });
    })

  }

  // START LOAD DATA ON THE FIRST TIME
  load(){

    this.fetch((res)=>{
      this.listenDataChange(res);
    });

  }

  // auto send to redux store - callback : using on doLoadSubregion Hook
  get(onSuccess){

      this.fetch((res)=>{
        this.listenDataChange(res); // auto send data to redux store
        onSuccess(res.data)
      })


  }

  doCall(url,onSuccess){

    this.db.type = 'GET';
    const {config} = this.db ;

    url = server.base()+'/'+this.model+url;




    axios.get(url,config)
          .then((res) => {
            //this.restResp(res); // KHÔNG LUU localStorage
            onSuccess(res)

          },
          (error) => {
              var status = error.response.status;
              this.onError(error)

            }
          );

  }

  call(url,onSuccess){

    this.db.type = 'GET';
    const {config} = this.db ;

    axios.get(url,config)
          .then((res) => {
            //this.restResp(res); // KHÔNG LUU localStorage
            onSuccess(res)

          },
          (error) => {
              var status = error.response.status;
              this.onError(error)

            }
          );
  }

  find(key){

    this.set('paginate',{
      key:key
    });

    this.load();

  }

  fetch(onSuccess){

    this.db.type = 'GET';
    const {url, config} = this.db ;



    axios.get(url,config)
            .then((res) => {
              //this.restResp(res); // KHÔNG LUU localStorage
              onSuccess(res);

            },
            (error) => {
                //var status = error.response.status;
                this.onError(error)

              }
    );
  }

  /*
  listenOnSocketTick(){

    const _this = this ;
    this.socket.clientListenServer((res)=>{

        // CÂP NHẬT REDUX STORE
        let list = store.getState()[this.model].list;
        let idata = res.data ;

        if(res.name==='success'){
          switch(res.type){

            case 'create':
              list.unshift(idata);

            break ;

            case 'update':

              list.forEach((item,index)=>{

                if(parseInt(item.id) === parseInt(idata.id)){
                   list[index] = idata;
                }
              });

            break;

            case 'remove':

              list = list.filter((item) => {
                return parseInt(item.id) !== parseInt(res.id)
              });

            break ;


          }

          this.socketResp(res,list);
        }



    })



  }
  */

  listenDataChange(res){

    if(res){

      preLoad('stop');

      let idata = res.data ; // format data
      let list = this.data ;  //store.getState()[this.model].list;
      let { total } =  this.db;


      if(idata.name==='success' || idata.name==='ok'){
        switch (this.db.type) {

          case 'CALL':

            this.restResp({
              list:[]
            });


          break ;
          case 'GET':

            // ADD TO REDUX STORE
            res = res.data ;
            this.data = res.rows ;



            this.resetConfigDB("total",res.count);

            this.restResp({
              list:res.rows
            });


          break;

          case 'POST':

            list.unshift(idata.data);
            this.restResp({
              list:list
            });


            total += 1;
            this.resetConfigDB("total",total);


          break ;

          case 'PUT':

            /*UPDATE REDUX STORE*/

            if(this.dispatcher !== null){
              const id = idata.data.id;
              list.forEach((item,index)=>{

                if(parseInt(item.id) === parseInt(id)){
                  list[index] = idata.data;
                }
              })

              this.restResp({
                list:list
              });
            }



          break ;

          case 'DELETE':

            // UPDATE DELETE ITEM : REDUX STORE

            list = list.filter((item) => {
              return parseInt(item.id) !== parseInt(idata.id)  ;
            });

            total -= 1;
            this.resetConfigDB("total",total);

            this.restResp({
              list:list
            });
          break ;


        }

      }else{

        // SHOW ERROR HERE
        //let el = document.querySelector("#form-err");
        //el.innerHTML = '<span class="text-danger">'+idata.message+'</span>';
        console.log(idata.message);


      }


    }

  }
  /* END WHEN*/

  /**** HOW ***/
  restResp(res){

    // SAU KHI ĐÃ CẬP NHẬT REDUX STORE

    this.whereStateChange({
      type:this.db.type+'-'+this.model,
      list:res.list,
      res:res.res || {}
    })

  }
  /*socketResp(res,list){

    if(this.jwt !== res.token){

      // SAU KHI ĐÃ CẬP NHẬT REDUX STORE
      this.whereStateChange({
        type:'reset-'+res.model,
        list:list,
        res:res || {}
      })

    }
  }*/
  /**** END HOW *****/

  /******WHERE*******/
  whereStateChange(newState){


    Object.assign(this.state,newState);

    this.data = newState.list;


    if(this.dispatcher!==null){
      this.dispatcher(newState);
    }

    //store.dispatch(newState);


  }
  /*********END WHERE*************/

  remove(name){

    delete this.paginate[name] ;
    this.configDB();
  }
  set(name,value){
    this.resetConfigDB(name,value);
  }


  getData(name){
    name = name || this.model;
    return this.data[name];
  }

}

export default Model


/*
action = {
  type:'ACTION_TYPE',
  model:Model,
  data:{}
  id:0
}

nhật ký : thu - chi : từ tài khoản
*/


const MODE = 'product_logs';
const NAME = 'Lịch sử kho';

const iniState = {
  mode:MODE,
  name:NAME,
  state:{
    onAction:'',   // function call name
    typeAction:'', // refer to model type action : post - put - update - delete 
    status:'' // refer to form status 
  },
  list:[]
}


export default function(state = iniState ,action = {}){

  switch(action.type){


    /* PROACTIVE : DATA */
    case 'GET-'+MODE:

      return {
        ...state,
        list:action.list
      }

    break ;

     default:

      return state;

  }
};

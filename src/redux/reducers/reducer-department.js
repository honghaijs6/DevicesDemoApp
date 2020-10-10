
/*
action = {
  type:'ACTION_TYPE',
  model:Model,
  data:{}
  id:0
}
*/

import { toast } from '../../hook/after';


import { DEPARTMENTS } from '../../model/model-mode';
import { DEPARTMENTS_NAME } from '../../model/model-name';



const MODE = DEPARTMENTS;
const NAME = DEPARTMENTS_NAME;

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


    case 'STATE-'+MODE:
      return {
        ...state,
        state:action.state

      }
    break;

    /* PROACTIVE : DATA */
    case 'GET-'+MODE:

      return {
        ...state,
        list:action.list
      }

    break ;

    case 'POST-'+MODE:

      toast('post',msg);

      return {
        ...state,
        list:action.list
      }

    break ;

    case 'PUT-'+MODE:

      const msg = NAME;

      toast('put',msg);

      //console.log(action.res);


      return {
        ...state,
        list:action.list
      }

    break ;

    case 'DELETE-'+MODE:

      toast('delete',msg);

      return {
        ...state,
        list:action.list
      }

    break ;

    /* PASSIVE DATA : realtime received on listenServer  */
    case 'reset-'+MODE:

      console.log(action.list);

      return {
        ...state,
        list:action.list
      }
    break ;


    default:

      return state;

  }
};

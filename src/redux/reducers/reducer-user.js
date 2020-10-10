
/*
action = {
  type:'ACTION_TYPE',
  model:Model,
  data:{}
  id:0
}
*/


import { myToast } from '../../hook/after';


import { USERS } from '../../model/model-mode';
import { USERS_NAME } from '../../model/model-name';


const MODE = USERS;
const NAME = USERS_NAME;

const iniState = {
  mode:MODE,
  name:NAME,
  state:{
    onAction:'',   // function call name
    typeAction:'', // refer to model type action : post - put - update - delete 
    status:'' // refer to form status 
  },
  list:[],
  info:{},
  userRoles:[]
};



export default function(state = iniState ,action = {}){
  switch(action.type){


    // SAVE USER INFO 
    case 'SAVE_USER':
      return {
        ...state,
        info:action.info
      }
    break;

    case 'SAVE_USER_ROLE':
      return {
        ...state,
        userRoles:action.userRoles
      }
    break;

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

      myToast('post',state)



      return {
        ...state,
        list:action.list
      }

    break ;

    case 'PUT-'+MODE:

      myToast('put',state);


      return {
        ...state,
        list:action.list
      }

    break ;

    case 'DELETE-'+MODE:


      myToast('delete',state);


      return {
        ...state,
        list:action.list
      }

    break ;

    /* PASSIVE DATA : realtime received on listenServer  */
    case 'reset-'+MODE:

      return {
        ...state,
        list:action.list
      }
    break ;


    default:

      return state;

  }
};

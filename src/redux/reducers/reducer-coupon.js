
/*
action = {
  type:'ACTION_TYPE',
  model:Model,
  data:{}
  id:0
}

nhật ký : thu - chi : từ tài khoản
*/

import { toast } from '../../hook/after';

const MODE = 'coupons';
const NAME = 'Coupons';

const iniState = {
  mode:MODE,
  name:NAME,
  state:{},
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

      return {
        ...state,
        list:action.list
      }
    break ;


    default:

      return state;

  }
};



import { toast } from "react-toastify";


const successMsg = {
  "post":"Đã tạo ",
  "put":"Đã cập nhật ",
  "delete":"Đã xoá"
}

let state ;

export default (type,reduxState)=>{


   if(reduxState.state.onAction !== 'toggle_modal'){

     const msg = successMsg[type] + ' '+ reduxState.name + ' thành công' ;
     toast.info(msg);


   }



}

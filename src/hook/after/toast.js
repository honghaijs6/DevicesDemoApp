

import { toast } from "react-toastify";
const successMsg = {
  "post":"Đã tạo thành công",
  "put":"Đã cập nhật thành công",
  "delete":"Đã xoá thành công"
}

export default (type,msg='')=>{

   msg = successMsg[type] + ' ' +msg ;
   toast.info(msg);
}

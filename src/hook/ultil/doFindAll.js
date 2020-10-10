
import Model from '../../model/model';
 
export default function(MODE='',key=''){

  return new Promise((resolve,reject)=>{
    if(MODE!==''){
    
      const modeler = new Model(MODE);
      
      modeler.set('method',{
        name:'listAll',
        params:'all'
      });  
  
      modeler.set('paginate',{
        offset:0,
        p:0,
        max:6,
        key:key,
        sort_by:'name', 
        sort_type:'asc' 
      });
  
      modeler.get((res)=>{
        resolve(res);
      })
      
    }else{
      resolve({
        count:0,
        name:'hook-erro',
        rows:[]
      });
    }
  }) 
  
}

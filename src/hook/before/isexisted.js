export default function(list=[],id=0){

  let ret = false ;

  if(list.length>0){

    list.map((item)=>{
      if(parseInt(item.id) === id){
        ret = true;
      }
    })

  }


  return ret ;
}

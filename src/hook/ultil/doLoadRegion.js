
import Model from '../../model/model';
import { REGIONS } from '../../model/model-mode';

export default function(dispatcher){

  const Regions = new Model(REGIONS,dispatcher);

  Regions.set('method',{
    name:'listAll',
    params:'all'
  });

  Regions.set('paginate',{
    offset:0,
    p:0,
    max:'all',
    sort_by:'name',
    sort_type:'asc'
  });


  Regions.get((res)=>{});


}

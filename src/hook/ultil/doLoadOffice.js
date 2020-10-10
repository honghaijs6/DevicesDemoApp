import Model from '../../model/model';
import { OFFICES } from '../../model/model-mode';

export default function(){

  const Offices = new Model(OFFICES);
  Offices.set('paginate',{
    offset:0,
    p:0,
    max:'all',
    is_deleted:0
  });

  Offices.load();

}

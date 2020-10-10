import Model from '../../model/model';
import { DEPARTMENTS } from '../../model/model-mode';

export default function(){

  const Departments = new Model(DEPARTMENTS);
  Departments.set('paginate',{
    offset:0,
    p:0,
    max:'all',
    is_deleted:0
  });

  Departments.load();

}

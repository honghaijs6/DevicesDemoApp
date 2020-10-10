import React, {Component} from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Row, Col, ButtonGroup, Button, Input } from 'reactstrap';


class GridFooter extends Component{

  constructor(props){

    super(props);


    this.state = {
      pages:0,
      p:0,
    }


    this.model = props.model || null ;

    this.first = this.first.bind(this);
    this.next = this.next.bind(this);
    this.last = this.last.bind(this);
    this.pre = this.pre.bind(this);


  }


  onChange(e){
    const p = e.target.value ;

    if(this.model !==null){
      this.model.goto(p,(res)=>{})
    }else{
      this.props.onGoto(p) ;
    }

  }

  first(){
    if(this.model !==null){
      this.model.goto(0,(res)=>{})
    }else{
      this.props.onGoto(0);

    }

  }
  last(){

    const p = this.state.pages - 1;

    if(this.model !== null ){
      this.model.goto(p,(res)=>{})
    }else{
      this.props.onGoto(p);

    }

  }

  next(){

    if(this.model !== null){
      this.model.next((res)=>{});
    }else{
      this.props.onGoNext();
    }

  }
  pre(){
    if(this.model !== null){
      this.model.pre((res)=>{});
    }else{
      this.props.onGoPre();
    }
  }


  render(){

    const { total } = this.model !== null  ? this.model.db : this.props.paginate ;
    const paginate = this.model !== null ? this.model.paginate : this.props.paginate  ;
    this.state.pages =  Math.ceil(total /  paginate.max);


    let list = [] ;
    for(let a = 0; a < this.state.pages ; a++){

      const stt = a + 1 ;
      list.push(<option value={a} key={a} > { stt } </option>)
    }



    return(
      <div className="ag-footer">
         <div className="pull-left">
            <ButtonGroup>
              <Button size="xs" onClick={ this.first } className="btn-datagrid" > <i className="fa fa-step-backward"></i> </Button>
              <Button size="xs" onClick={ this.pre } className="btn-datagrid" > <i className="fa fa-chevron-left"></i> </Button>
              <Input className="btn-datagrid"  onChange={ (e)=>{ this.onChange(e) } } type="select" style={{
                borderRadius:0,
                borderLeft:0,
                borderRight:0,
                fontWeight:500

              }} value={ this.model !==null ? paginate.p : paginate.offset } >
                { list }
              </Input>
              <Button className="btn-datagrid" onClick={ this.next } size="xs" > <i className="fa fa-chevron-right"></i> </Button>
              <Button size="xs" onClick={ this.last } className="btn-datagrid" > <i className="fa fa-step-forward"></i> </Button>

            </ButtonGroup>
         </div>
         <div className="pull-right" style={{marginTop:10}}>

             <span className="info" >
                { paginate.max} dòng / trang
                { ' của '+ total }
             </span>

         </div>

      </div>
    )
  }
}

GridFooter.defaultProps = {
  paginate:{
    max:10,
    offset:0,
    total:0
  },
  model: null,
  onGoto(){}, // jump to
  onGoNext(){},
  onGoPre(){}
}
export default GridFooter;

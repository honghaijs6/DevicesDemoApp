
/*
props : nextColums : []
        model    : Object
        rowData : []
*/

import React, { Component } from 'react';

import {   Row, Col, ButtonGroup, Button, Input } from 'reactstrap';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import GridFooter from './GridFooter';

import BenConfirm from '../BenConfirm';
import BenMessage from '../BenMessage';




class BenGrid extends Component{

  constructor(props){
    super(props);


    const gridID = props.gridID || '_id';

    this.tools = {
      add:{
        icon:'fa fa-plus',
        name:'Add'
      },
      edit:{
        icon:'fa fa-pencil',
        name:'Remove'
      },
      remove:{
        icon:'fa fa-trash',
        name:'Remove'
      }

    }

    this.state = {
      isGridReady:false,
      height: props.height || '68vh',
      key:'',
      isRightTool:props.isRightTool || false,
      isLeftTool: props.isLeftTool === undefined ? true : props.isLeftTool  ,
      isChecked:false,
      columnDefs: [
        {
          headerName: "SID",
          field: gridID,
          width:120,
          checkboxSelection: true,
          filterParams: { newRowsAction: "keep" },
          checkboxSelection: function(params) {

            return params.columnApi.getRowGroupColumns().length === 0;
          },
          headerCheckboxSelection: function(params) {
            return params.columnApi.getRowGroupColumns().length === 0;
          }

        },
        ...props.nextColums
      ],
      rowSelection:  props.rowSelection || "multiple" ,

          /*defaultColDef: {
            editable: true,
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true
          },*/
      rowData: [],
      count: props.model ? props.model.db.total : 0 ,
      selectedData:[],
      displayBtn: props.displayBtn ||  ['add','edit','remove']
    }

    this.model = props.model;


    this.onFindKeyUp = this.onFindKeyUp.bind(this);
    this.onBtnFind = this.onBtnFind.bind(this);

  }

  /* WHEN*/
  componentWillReceiveProps(newProps){

    //this.gridApi.refreshCells();

    if(newProps.model){



        if(this.state.isGridReady){

          //this.gridApi.setRowData(newProps.rowData);
          //this.gridApi.refreshCells();

          // ADD ROW
          if( newProps.model.db.total > this.state.count){
            //this.gridApi.updateRowData({ add: [newProps.rowData[0]],addIndex: 0 });
            this.gridApi.setRowData(newProps.rowData);

          }else if(newProps.model.db.total < this.state.count){
            // REMOVE ROW
            this.gridApi.updateRowData({ remove: this.state.selectedData });
          }else if(newProps.model.db.total === this.state.count){


            if(newProps.formStatus==='success' || newProps.formStatus==='ok'){
              this.gridApi.setRowData(newProps.rowData);
            }

          }


          this.state.count = newProps.model.db.total;

        }

        this.setState({
          rowData:newProps.rowData,
          count:newProps.model.db.total
        });
      }else{

        // THIS USE FOR NEDB OR FREE

        if(this.state.isGridReady){
          /* UPDATE GRID HERE  */
          if(newProps.formStatus==='success' || newProps.formStatus==='ok'){

              this.gridApi.setRowData(newProps.rowData);

          }


        }

      }

  }


  error(msg){
    console.log(msg);
  }


  onGridReady(params){

     this.gridApi = params.api;
     this.state.isGridReady = true ;

  }

  onFindKeyUp(e){

    if(this.model){
      e.key === 'Enter' ? this.model.find(this.state.key) :  this._whereStateChange({key:e.target.value}) ;
    }else{

      e.key === 'Enter' ?  this.props.onFind(e.target.value) :  this._whereStateChange({key:e.target.value}) ;

    }


  }

  onBtnFind(){

    if(this.model){
      this.model.find(this.state.key);
    }else{
      this.props.onFind(this.state.key) ;

    }

  }

  async _remove(){

    const records = this.state.selectedData.length;

    let result = await BenConfirm({
      title: 'Cảnh báo',
      message: "Bạn có chắc là muốn xoá "+ records+' dữ liệu này ?',
    });

    if(result){

      this.props.onDeleted(this.state.selectedData) ;

      if(this.model){
        if(this.state.selectedData.length>1){
          this.model.deleteMulti(this.state.selectedData);
        }else{
          const id = this.state.selectedData[0].id;
          this.model.delete(id,(res)=>{  })
        }
      }

    }


  }

  _onBtnClick(action){


    if(action==='add'){

      if(this.props.onBtnAdd !== undefined){
        this.props.onBtnAdd();
      }

    }else{

      const records = this.state.selectedData.length;
      if(records>0){

        switch(action){

          case 'edit':
            this.props.onBtnEdit(this.state.selectedData[0]);
          break ;

          case 'remove':
            this._remove();
          break ;

        }
      }else{ BenMessage({message:'You have to select record first!'}) }

    }


  }

  onSelectionChanged(){


    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data );

    this.setState({
      selectedData:selectedData
    });

    // alway call back data on selected ;
    this.props.onCellSelected(selectedData.length > 0 ? selectedData[0] : {});



  }

  /* HOW */

  /* WHERE*/
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }
  render(){


    const clnRightTool =  this.state.isRightTool ? '' : 'hidden';


    return (

      <div>
          <div className="toolbar">
            <Row>
              <Col md={2}>
                <ButtonGroup>
                  {
                    this.state.displayBtn.map((item,index)=>{
                       return(
                        <Button key={index}  onClick={ ()=>{ this._onBtnClick(item) } } className={ 'btn-ubuntu'} > <i className={ this.tools[item]['icon'] }></i> </Button>
                       )
                    })
                  }
                  </ButtonGroup>

                  { this.props.leftButton }
              </Col>
              <Col md={10} className={'text-right '+ clnRightTool}>

                { this.props.customButton }
                <ButtonGroup>

                    <Input  placeholder={ this.props.searchTile || "Search" } onKeyUp={ this.onFindKeyUp }  style={{borderRadius:0}}  />
                    <Button  onClick={ this.onBtnFind }  className="btn-ubuntu"> <i className="fa fa-search"></i> </Button>


                </ButtonGroup>

              </Col>
            </Row>
          </div>

          <div className="ag-theme-material" id="myGrid" style={{boxSizing: "border-box", border:"0px solid #000", height: this.state.height, paddingBottom:'2.5rem',  paddingTop:'1rem'}}>
              <AgGridReact

                  onCellDoubleClicked={()=>{ this.props.onCellDoubleClicked() }}
                  onSelectionChanged={this.onSelectionChanged.bind(this)}
                  enableSorting={true}
                  rowSelection={this.state.rowSelection}
                  enableColResize={true}
                  defaultColDef={this.state.defaultColDef}
                  onGridReady={this.onGridReady.bind(this)}
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData}>

              </AgGridReact>

              <GridFooter
                paginate={ this.props.paginate } model={ this.model }
                onGoto={(p)=>{ this.props.onGoto(p) }}
                onGoNext={()=>{ this.props.onGoNext() }}
                onGoPre={()=>{ this.props.onGoPre() }}
              />


          </div>
      </div>

    )
  }
}

BenGrid.defaultProps = {
  onCellSelected:()=>{},
  onDeleted:()=>{},
  paginate:{},
  onFind:()=>{},
  onGoto(){},
  onGoPre(){},
  onGoNext(){}
}

export default BenGrid;

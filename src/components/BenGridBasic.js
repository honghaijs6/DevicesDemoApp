
/*
props : nextColums : []
        model    : Object
        rowData : []
*/

import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';



class BenGridBasic extends Component{

  constructor(props){
    super(props);


    this.state = {
      key:'',
      isRightTool:props.isRightTool || false,
      isChecked:false,
      columnDefs: [
              {
                headerName: "SID",
                field: "id",
                width:140,
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
      rowSelection: "multiple",//"multiple",

          /*defaultColDef: {
            editable: true,
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true
          },*/
      rowData: [],
      selectedData:[]
    }

    this.model = props.model;

    this.onBtnNew = this.onBtnNew.bind(this);
    this.onFindKeyUp = this.onFindKeyUp.bind(this);
    this.onBtnFind = this.onBtnFind.bind(this);

  }

  /* WHEN*/
  componentWillReceiveProps(newProps){
    this.setState({
      rowData:newProps.rowData
    });

  }


  onGridReady(params){

     //alert('grid ready ');
     this.gridApi = params.api;

     //console.log(this.gridApi);

    /*this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      "GET",
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };*/
  }

  onFindKeyUp(e){

     e.key === 'Enter' ? alert(this.state.key) :  this._whereStateChange({key:e.target.value}) ;


  }

  onBtnFind(){
    alert('find key')
  }

  onBtnNew(){
    this.props.onBtnNew();
  }
  onBtnEdit(){

    this.props.onBtnEdit(this.state.selectedData[0]);

  }

  onDownload(){
    alert('download clicked');
  }

  async onBtnDel(){


    //this.props.onBtnDel(this.state.selectedData);

  }

  onSelectionChanged(){
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data );

    this.setState({
      selectedData:selectedData
    })

    // document.querySelector("#selectedRows").innerHTML = selectedRowsString;

  }

  /* HOW */

  /* WHERE*/
  _whereStateChange(newState){
    //this.setState(Object.assign(this.state,newState));
  }
  render(){


    return (





          <div className="ag-theme-material" id="myGrid" style={{boxSizing: "border-box", height: this.props.height , paddingTop:'1rem' }}>
              <AgGridReact

                  onSelectionChanged={this.onSelectionChanged.bind(this)}
                  enableSorting={true}
                  rowSelection={this.state.rowSelection}
                  enableColResize={true}
                  defaultColDef={this.state.defaultColDef}
                  onGridReady={this.onGridReady.bind(this)}
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData}>

              </AgGridReact>


          </div>



    )
  }
}

export default BenGridBasic;

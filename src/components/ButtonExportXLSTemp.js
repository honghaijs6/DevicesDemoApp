import React, { Component } from 'react';
import { Button } from 'reactstrap';

// LIBS 
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';



export default class ButtonExportXLSTemp extends Component {


  
    _onExportXLS = ()=>{
        const wb = new XLSX.utils.book_new();

        wb.props = {
            Title:this.props.strModel,
            Subject:this.props.strModel,
            Author:"Hong Hai",
            CreateDate: new Date()
        }

        wb.SheetNames.push('Sheet1');
        var ws = XLSX.utils.aoa_to_sheet([this.props.columns]);
        

        wb.Sheets["Sheet1"] = ws;
        var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

        function s2ab(s) { 
            var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
            var view = new Uint8Array(buf);  //create uint8array as viewer
            for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
            return buf;    
        }

        const title = this.props.strModel+'-temp'; 
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), title+'.xlsx');
    }
    render() {
        return (
            <Button 

                onClick={ this._onExportXLS }
                title="Download file mẫu" 
                className="btn btn-normal">  
                <i className="fa fa-file-excel-o"></i>
            </Button>
        );
    }
}

ButtonExportXLSTemp.defaultProps = {
    columns:[],
    strModel:'products'
}
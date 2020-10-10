
// HOOKS 
import doLoadAll from '../hook/ultil/doLoadAll'; 
import { preLoad } from '../hook/before';


// LIBS 
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';



import React, { Component } from 'react';
import { Button } from 'reactstrap';


class ButtonExportXLS extends Component {

    state = {
        rows:[]
    }


    
    async _loadAllData(){

        preLoad('get');

        const res =  await doLoadAll(this.props.strModel);
        const data = res.rows; 

        const wb = new XLSX.utils.book_new();
        wb.props = {
            Title:this.props.strModel,
            Subject:this.props.strModel,
            Author:"Hong Hai",
            CreateDate: new Date()
        }

        wb.SheetNames.push('Sheet1');
        var ws = XLSX.utils.json_to_sheet(data);
        

        wb.Sheets["Sheet1"] = ws;
        var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

        function s2ab(s) { 
            var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
            var view = new Uint8Array(buf);  //create uint8array as viewer
            for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
            return buf;    
        }


        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), this.props.strModel+'.xlsx');
        


    }
    _onSubmit = ()=>{
        this._loadAllData();

    }
    render() {
        return ( 
            <Button style={this.props.style} onClick={this._onSubmit } className="btn btn-normal">
                <i className={this.props.icon}></i> { this.props.title }
            </Button>
        );
    }
}

ButtonExportXLS.defaultProps = {
    strModel:'products',
    columns:['code','name','type','supplier_codes','price_1','price_2','price_3','price_4','is_serial'],
    
    icon:"fa fa-cloud-download mr-5",
    title:'.xlsx'
}

export default ButtonExportXLS;
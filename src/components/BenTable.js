import React, { Component } from 'react';
import { Table } from 'reactstrap';


export default class BenTable extends Component {
  render() {
    return (
        <Table className="product-board  vk-table">
            <thead>
                <tr>
                    { 
                        this.props.grid.colums.map((item,index)=>{
                            return(
                                <th key={index} style={{width:item.width}}>{ item.headerName } </th> 
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody style={{height: this.props.height }}>
                {
                    this.props.grid.rowData.map((item,index)=>{

                        return(
                        <tr key={index}>
                            {
                            this.props.grid.colums.map((item2,index2)=>{

                                //console.log(item2.width);

                                return(
                                    <td key={index2} style={{
                                        width: item2['width']
                                    }}> 
                                        { item[item2['field']] }

                                    </td>
                                )
                            })
                            }
                        </tr>
                        )
                    })
                }
            </tbody>
            <tfoot style={{borderTop:'1px solid #ddd'}}></tfoot>
        </Table>
    );
  }
}

BenTable.defaultProps = {
    height:'60vh'
}

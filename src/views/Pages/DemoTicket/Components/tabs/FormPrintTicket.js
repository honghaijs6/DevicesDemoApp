import doPrint from '../../../../../hook/ultil/doPrint';

import React, { Component } from 'react';
import ViewModal from '../../../../../components/ViewModal';

import numeral from 'numeral' ;
import moment from 'moment' ;



export default class FormPrint extends Component {



    constructor(props){
      super(props) ;

      this.state = {
        isReady:false
      }

    }



    _formatHtml(data){

        const types = {
          nguoilon:'Người lớn',
          treem:'Trẻ em'
        };

        const prices = {
          nguoilon:120000,
          treem:60000
        };

        const TOTAL = data.number_offer * prices[data.type]  ;

        let HTML = ``;
        if(JSON.stringify(data) !=='{}'){

            HTML = `<div style="width:340px; margin:auto; font-size:12px; font-family:Tahoma !important">
                        <h5 style="text-transform:uppercase; text-align:center; font-size:12px">Trung tâm quản lý và điều hành vé  <br> khu du lịch văn hoá SUỐI TIÊN  </h5>
                        <h3 style="text-align:center"> VÉ THAM QUAN </h3>

                        <div style="text-align:center">
                            <img style="width:100px; height:100px;" src="https://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=${ data.code }&chld=H|0" />
                            <p>
                              ${data.code}
                            </p>

                        </div>

                        <p>
                          Nhân viên phụ trách : 001
                        </p>


                        <p> Loại vé : ${types[data.type]}  - ${ data.number_offer > 1 ? 'Vé đoàn' : 'Vé đơn' } </p>


                        <p> Ngày IN : ${ moment(moment(new Date())).format('DD-MM-YYYY') } </p>

                        <p>
                          Quý khách vui lòng giữ vé QRCODE để scan vào cổng, lưu ý chỉ sử dụng được 1 lần duy nhất
                        </p>
                        <p>
                          Mã QRCODE có giá trị cho ${data.number_offer} lượt truy cập
                        </p>

                        <p style="font-size:20px" >
                            Giá trị :  ${ numeral(prices[data.type]).format('0,0') } x ${ data.number_offer } = ${ numeral(TOTAL).format('0,0') } đ
                        </p>

                        <br> <br>
                        <i> Cám ơn quý khách đã sử dụng dịch vụ </i>
                        <br>
                        <p></p>

                    </div>
            `;

        }

        return HTML ;
    }

    componentWillReceiveProps(newProps){

      if(newProps.isOpen){

        /*const HTML = this._formatHtml(newProps.data);

        setTimeout(()=>{
          doPrint(HTML) ;
          this.props.onToggle(false)
        },1000)*/


      }
    }
    render() {

        const HTML = this._formatHtml(this.props.data);


        return (
            <ViewModal {...this.props}>
                <div className="view-modal-body" onClick={()=>{ doPrint(HTML) }}>


                    <div
                        ref={el => (this.componentRef = el)}
                        style={{
                                paddingBottom:20
                        }}
                            dangerouslySetInnerHTML={{ __html: HTML  }}
                    />
                </div>
            </ViewModal>
        );
    }
}

import React from 'react';

import { Table, Row, Col } from 'reactstrap';

export default class ToturialPage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status

      tab:'tutorialPage',

      rowData:[

      ]

    }

  }
  render() {
    return (
      <div hidden={  this.props.onTab === this.state.tab ? false : true } >
        <div className="guidebook">

            <h3> Tài liệu về Device Command Code </h3>

            <h5> 1. Add / Update data </h5>

            <div style={{
                background:'#DEEAF6',
                padding:10,
                border:'1px solid #ddd',
                margin:20,
            }}>

                <p> - Cấu trúc lệnh  : DATA UPDATE tablename parameter1=value1$(HT)parameter2=value2$(HT)parameter3=value3 </p>

                <ul>
                <li>  TableName : Tên table trên thiết bị   </li>
                <li>  parameter  : các field trên table của thiết bị, đối chiếu thêm ở bảng bên dưới  </li>
                <li>  VD : DATA UPDATE user CardNo= Pin=1 Password=234 Group=0 StartTime=0 EndTime=0 Name=SuperAuthorize=0 </li>
                </ul>

            </div>




            <h5> 2. Delete Data : </h5>

            <div style={{
                background:'#DEEAF6',
                padding:10,
                border:'1px solid #ddd',
                margin:20,
            }}>
                <p> - Cấu trúc lệnh : DATA DELETE $(TableName) $(Condition) </p>
                <ul>
                    <li> + TableName : table name on device  </li>
                    <li> + Condition    :  điều kiện :  </li>
                    <li>
                        <ul>
                            <li> - Format : parameter1=value1$(HT)parameter2=value2$(HT)parameter3=value3 </li>
                            <li> - Nếu format : * là tất cả  </li>
                        </ul>

                    </li>
                    <li> + VD : 	DATA DELETE user Pin=1 </li>
                </ul>
            </div>




           <h5> 3. Count Data : </h5>

           <div style={{
                background:'#DEEAF6',
                padding:10,
                border:'1px solid #ddd',
                margin:20,
            }}>
                <p>  - Cấu trúc command : DATA COUNT $(TableName) $(Coditions) </p>
                <ul>
                    <li>+ TableName : table name on device  </li>
                    <li>   + Condition    :  điều kiện :  </li>
                </ul>
            </div>


            <h5> 4. Query Data  </h5>

            <div style={{
                background:'#DEEAF6',
                padding:10,
                border:'1px solid #ddd',
                margin:20,
            }}>
                <p> - Cấu trúc command : :DATA QUERY tablename=$(XXX),fielddesc=$(XXX),filter=$(XXX) </p>
                <ul>
                        <li>  + TableName : table name on device  </li>
                        <li> + fielddesc :  các trường của bảng trên thiết bị  :  </li>
                        <li>
                            <ul>
                                <li> - trường hợp : fielddesc=* 	// không có điều kiện </li>
                                <li>  - trường hơp : fielddesc=“NewRecord” và tablename=transaction // nó chỉ lấy những transaction mới nhất  </li>

                            </ul>
                        </li>
                        <li> + filter : điều kiện  </li>

                        <li> VD : DATA QUERY tablename=user,fielddesc=*,filter=*  // Lấy tất cả record của table user  </li>
                        <li> VD : DATA QUERY tablename=transaction, filter=“starttime= \t endtime=”  // nó chỉ lấy  trong khoản thời gian  </li>
                </ul>
            </div>




            <h5>5. Controll Device  </h5>
            <div style={{
                background:'#DEEAF6',
                padding:10,
                border:'1px solid #ddd',
                margin:20,
            }}>
                <p> - Cấu trúc  : :CONTROL DEVICE AABBCCDDEE </p>
                <ul>
                    <li> AABBCCDDEE : tham số hành động </li>
                </ul>
            </div>

            <div style={{padding:30}}>
                <h6> Bảng đối chiếu tham số </h6>
                <img src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2FCONTROLL-PARA.JPG?alt=media" ></img>
                <h6> VD </h6>
                <ul>
                    <li>
                        CONTROL DEVICE 01010105 // Mở cửa 01 trong 5 giây
                    </li>
                    <li>
                        CONTROL DEVICE 02010000 // Huỷ alarm door 01
                    </li>
                    <li> CONTROL DEVICE 03000000 // Rebote</li>
                </ul>

            </div>





            <br></br>

            {/* ------------------------------------ */}
            <h5>6. Dữ liệu trên thiết bị  </h5>
            <div style={{
                background:'#DEEAF6',
                padding:10,
                border:'1px solid #ddd'
            }}>

                <p>
                    Format Datetime : DateTime= ((Year-2000)*12*31 + (Month -1)*31 + (Day-1))*(24*60*60) + Hour* 60 *60 +
                    Minute*60 + Second;
                </p>
            </div>
            <div style={{padding:30}}>
                <p>
                    vd : hôm nay là ngày 2019-03-29 12:57:55 ==> DateTime= { (2019-2000)*12*31 + (12-1)*31 + (29-1)*(24*60*60) + 12*60*60 + 57*60 + 55 };
                </p>

                <p>
                    Và cách tính toán ngược lại để lấy thời gian từ thiết bị
                </p>
                <p>
                    Second = DateTime % 60；<br></br>
                    Minute = ( DateTime / 60 ) % 60； <br></br>
                    Hour = ( DateTime / 3600 ) % 24；<br></br>
                    Day = ( DateTime / 86400 ) % 31 + 1；<br></br>
                    Month= ( DateTime / 2678400 ) % 12 + 1；<br></br>
                    Year = (DateTime / 32140800 ) + 2000；<br></br>
                </p>
            </div>
            {/* ==------------------------------------- */}

            {/* -------- BẢNG ĐỐI CHIẾU EVENT TYPE----------- */}
            <h5>7. Bảng đối chiếu Event Type  </h5>
            <div style={{padding:30}}>
                <img src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2Fevent%20type%20code.JPG?alt=media" /> <br></br>
                <img src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2Fevent%20type%20code-2.JPG?alt=media"></img> <br></br>
                <img src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2Fevent%20type%20code-3.JPG?alt=media"></img> <br></br>


            </div>
            {/* ------------------------------------ */}


            {/* -------- BẢNG ĐỐI CHIẾU VERIFY MODE----------- */}
            <h5>7. Bảng đối chiếu Verify Mode  </h5>
            <div style={{padding:30}}>
                <img src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2FVerify%20Mode.JPG?alt=media" /> <br></br>


            </div>
            {/* ------------------------------------ */}

            {/* -------- BẢNG ĐỐI CHIẾU REALTIME EVENT - STATUS TABLE----------- */}
            <h5>7. Bảng đối chiếu REALTIME EVENT - STATUS TABLE  </h5>
            <div style={{padding:30}}>
                <img src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2Frealevent%20status%20table.JPG?alt=media" /> <br></br>


            </div>
            {/* ------------------------------------ */}

            {/* -------- BẢNG ĐỐI CHIẾU CÁC TABLE TRÊN THIẾT BỊ----------- */}
            <h5>7. Bảng đối chiếu CÁC TABLE TRÊN THIẾT BỊ  </h5>
            <div style={{padding:30}}>
                <img src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2FDesc-Table-On-Device.JPG?alt=media" /> <br></br>
                <img src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2FDesc-Table-On-Device-2.JPG?alt=media" /> <br></br>
                <img src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2FDesc-Table-On-Device-3.JPG?alt=media" /> <br></br>
                <img src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2FDesc-Table-On-Device-4.JPG?alt=media" /> <br></br>
                <img src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2FDesc-Table-On-Device-5.JPG?alt=media" /> <br></br>
                <img src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2FDesc-Table-On-Device-6.JPG?alt=media" /> <br></br>




            </div>
            {/* ------------------------------------ */}

            {/* -------- BẢNG ĐỐI CHIẾU các giá tri trả về----------- */}
            <h5>7. Bảng đối chiếu CÁC GIÁ TRỊ TRẢ VỀ  </h5>
            <div style={{padding:30}}>
                <img src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2Freturn%20value-1.JPG?alt=media" /> <br></br>
                <img src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2Freturn%20value-2.JPG?alt=media" /> <br></br>
                <img src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2Freturn%20value-3.JPG?alt=media" /> <br></br>



            </div>
            {/* ------------------------------------ */}



        </div>

      </div>
    );
  }
}

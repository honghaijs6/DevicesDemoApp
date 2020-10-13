import React from 'react';

export default class SettingDevicePage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status

      tab:'settingDevicePage',

    }

  }
  render() {
    return (
      <div hidden={  this.props.onTab === this.state.tab ? false : true } >
        <div className="guidebook">

              <h3> Hướng dẩn kết nối thiết bị   </h3>
              <p> 
                  Bước 1 : Thiết lập các thiết bị cửa, khoá vào inbio pro như mô hình bên dưới 
              </p>
              <p>
                  <img src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2Finbio-diagram.png?alt=media"/>
              </p>

              <br></br>
              <p> 
                Bước 2 : Thiết lập IP của Inbio pro trỏ về Push Cloud server <br></br>
                bằng cách truy cập trực tiếp vào địa chỉ IP của Inbio và tiến hành config<br></br>
              </p>
              <p>
                username: admin <br></br>
                password:admin <br></br>
                trỏ về Push Cloud : http://27.74.250.26 <br></br>
                Port : 8080 

              </p>
              <p>
              <img style={{width:1000}} src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2FconfigIP-1.png?alt=media"></img>
              </p>

              <br></br>
              <br></br>
              
              <p>
              <img style={{width:1000}} src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2FconfigIP-2.png?alt=media"></img>
              </p>
              <br></br>
              <br></br>
              <p> Reboot Thiết bị, chờ trong 30 giây </p>
              <p>
              <img style={{width:1000}} src="https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2FconfigIP-3.png?alt=media"></img>
              </p>

              <br></br>
              <br></br>
      
              <p> Đã hoàn tất thiết lập Push Cloud server </p>
              <p> Tiếp theo  Xem các chương trình mẫu  </p>


          </div>      
      </div>
    );
  }
}

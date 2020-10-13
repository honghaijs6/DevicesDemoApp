import React from 'react';

import { Table, Row, Col } from 'reactstrap';

export default class IntroPage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status

      tab:'introPage',

    }

  }
  render() {
    return (
      <div hidden={  this.props.onTab === this.state.tab ? false : true } >
        <div className="guidebook">

            <h3> Giới thiệu PUSH API  </h3>
            <p>
                Chào mừng bạn đến với PUSH API. dành cho các thiết bị <span className="txt-green"> Inbio Pro </span> Với sự mở rộng tính năng cũng như tập trung vào đơn vị phát triển ứng dụng, VI KHANG không ngừng cải tiến dịch vụ
            </p>
            <p>
                Việc cung cấp các Web Service cho đối tác tích hợp là một trong những tiện ích mà đội ngũ kỹ sư VIKHANG mang đến.
            </p>
            <p> Tất cả web service hiện tại đều bắt đầu bằng đường dẫn bên dưới, gọi tắt là <span className="txt-red">BASE_URL</span>:  </p>

            <br></br>
            <p className="txt-green"> http://27.74.250.26:3333/pushapi  </p>
            <br></br>
            <p>
                Khi đề cập đến các web service trong phần này, chúng tôi sẽ không kèm theo BASE_URL và bạn mặc định hiểu là khi truy vấn sẽ nối thêm chuỗi BASE_URL phía trước đường dẫn cụ thể của web service, <br></br>
                ví dụ: /realEvent sẽ là http://27.74.250.26:3333/pushapi/realEvent
            </p>
            <br></br>
            <br></br>

            <h3> Các API Chính </h3>
            <Table>
                <thead style={{ border:0, background:'#222D32', color:'#fff' }}>
                    <tr>
                        <th style={{width:200}}> HTTP method : POST </th>
                        <th style={{width:500}}>Module</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>/pushapi/deviceServlet</td>
                        <td> Thao tác thiết bị </td>
                    </tr>
                    <tr>
                        <td>/pushapi/createCmd</td>
                        <td> API Tập các câu lệnh gủi đến thiết bị thi hành</td>
                    </tr>

                    <tr>
                        <td>/pushapi/realEvent</td>
                        <td>  Lấy trạng thái thời gian thực của thiết bị </td>
                    </tr>


                </tbody>
            </Table>

            <p> Trong các phần sau là các chương trình demo kèm theo code hướng dẩn và môi trường sandbox, </p>
            <p>
                Cơ bản Push SDK chỉ có 3 services tương tác với thiết bị, và 1 tập các lệnh trong service <span className="txt-green"> createCmd </span>
                để thao tác tuỳ chỉnh các đối tượng của thiết bị
                <br></br>
                <br></br>


                    <li> Users </li>
                    <li> Time Segment </li>
                    <li> Access level  </li>
                    <li> Transactions  </li>
                    <li> Device controll  </li>

            </p>
            <br></br>
            <br></br>



        </div>
      </div>
    );
  }
}

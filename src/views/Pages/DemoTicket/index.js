import React, { Component } from 'react';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import Header from './Components/Header';
import RealTimeBox from './Components/RealtimeBox';
import TicketManager from './Components/TicketManager' ;

/* Toast plugin */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





class DemoTicket extends Component {
  render() {
    return (
      <div className="animated fadeIn">

          <Header />

          {/* BODY */}
          <div style={{ height:'95vh'}}>
            <Row>
              <Col md={9} style={{ marginTop:20}}>
                  <TicketManager />
              </Col>
              <Col md={3} style={{ marginTop:20}}>
                  <RealTimeBox />
              </Col>
            </Row>

          </div>

          <ToastContainer autoClose={2000} />

      </div>
    );
  }
}

export default DemoTicket;

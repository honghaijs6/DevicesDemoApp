
import socket from '../../../../model/socket' ;
import React, { Component, StyleSheet } from 'react';
import { Row, Col } from 'reactstrap';



class RealtimeBox extends Component{

  constructor(props) {
    super(props);


    this.state = {

      activeTab: '1',
      tabs:[
        {
          icon:'fa fa-list-alt',
          code:'1',
          name:'Evtlogs'
        },
        /*{
          icon:'fa fa-bell-o',
          code:'2',
          name:'CdmLogs'
        },
        {
          icon:'fa fa-legal',
          code:'3',
          name:'QueLogs'
        }*/
      ],
      log1:[],
      log2:[],
      log3:[]
    };


  }

  _onChangeTab(code){
    this.setState({
      activeTab:code
    });

  }

  componentDidMount(){
    this._iniSocket() ;
  }

  _iniSocket(){


    socket.client.service('realtime-logs').on('logs',(data)=>{

      //console.log(data) ;
      //const data = res.data;

      //const { data } = res ;
      if(data){
          let logs = Object.assign([],this.state.log1) ;
          logs.push(data) ;

          this.setState({ log1:logs },()=>{

            const scrollBox = document.getElementById('scroll-box') ;
            scrollBox.scrollTop = scrollBox.scrollHeight;

          });

      }
    });

    // COMMAND REALTIME LOGS
    socket.client.service('command_logs').on('logs',(data)=>{

      console.log(data) ;


    });

    // DATA RESPONE FROM DEVICE REALTIME
    socket.client.service('query_logs').on('logs',(res)=>{

      console.log(res);

    });
  }

  render(){


    return(
      <div className="box-realtime-activity" style={{position: 'relative', width: '95%', top: 0}}>
        <div className="nav-tabs-custom" id="task-holder">

            <ul className="nav nav-tabs" style={{ borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
              {
                this.state.tabs.map((item,index)=>{

                  const isActive = this.state.activeTab === item.code ? "active" :"" ;

                  return(
                    <li key={ index } className={isActive} onClick={()=>{ this._onChangeTab(item.code) }}>
                      <a>  { item.name+' ('+ this.state['log'+item.code].length+')' } </a>
                    </li>
                  )
                })
              }

            </ul>

            <div id="scroll-box" className="slimScrollDiv" style={{position: 'relative', overflowY: 'auto', width: 'auto', height: '80vh',}}>

                  {/* CONTENT TAB : REALTIME */}
                  <div className={` tab-pane chat ${ this.state.activeTab === "1" ? "active" : "hidden"}  `}  style={{ marginTop:14, marginLeft:7}}>

                      {
                        this.state.log1.map((item,index)=>{
                          return (
                            <div key={index} className="item" style={{ lineHeight:'8px', paddingBottom:10, paddingTop:10, borderBottom:'1px solid #f0f0f0'}}>
                                <div className="float-left">
                                  <label className="font-17 text-green">
                                      { item.name} ( no : { item.gate_no})
                                  </label>
                                  <span>  @{ item.inoutstatus }    </span>
                                  <br />
                                  <small><i className="fa fa-ticket"></i> { item.cardno }</small>
                                  <small>
                                    - { item.verifytype+' - '+ item.eventName + ' - '+ item.eventaddr }
                                  </small>

                                </div>
                                <div className="float-right">
                                  <small>{  item.time ?  item.time.substr(-8) : '' }</small>
                                </div>
                                <div style={{ clear:'both'}}></div>
                            </div>
                          )
                        })
                      }
                  </div>

                  {/*  CONTENT TAB COMMAND LOGS */}
                  <div className={` tab-pane chat ${ this.state.activeTab === "2" ? "active" : "hidden"}  `}  style={{ marginTop:14, marginLeft:7}}>
                      dasdasd command
                  </div>

                  {/* CONTENT TAB QUERY LOGS */}
                  <div className={` tab-pane chat ${ this.state.activeTab === "3" ? "active" : "hidden"}  `}  style={{ marginTop:14, marginLeft:7}}>
                      asdas query
                  </div>

            </div>


        </div>

      </div>
    )
  }
}

export default RealtimeBox ;

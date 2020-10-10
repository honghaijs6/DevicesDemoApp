

import React from 'react';

import  BenTabs from '../../../../components/BenTabs';

import Device from './tabs/Devices';
import Ticket from './tabs/Tickets' ;

class TicketManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      onTab:'device',
      tabs:[
            { icon:'fa fa-plug',code:'device',name:'Thiết bị' },
            { icon:'fa fa-ticket',code:'ticket',name:'Trung tâm thẻ' },
            { icon:'fa fa-pie-chart',code:'report',name:'Báo cáo' }
      ],

    };
  }

  render() {
    return (
      <div style={{ paddingLeft:20, fontFamily:'Roboto'}}>
          <BenTabs
            onChangeTab={(code)=>{ this.setState({onTab:code}) }}
            tabs={ this.state.tabs }
          >

              {/* TAB ORDER */}
              <div className={  `tab-pane  ${ this.state.onTab==='device'?'active':'' } ` }>
                  <Device />
              </div>

              <div className={  `tab-pane  ${ this.state.onTab==='ticket'?'active':'' } ` }>
                  <Ticket />
              </div>

              <div className={  `tab-pane  ${ this.state.onTab==='report'?'active':'' } ` }>
                  report
              </div>


          </BenTabs>
      </div>
    );
  }
}



export default TicketManager;


import {myTime} from '../hook/ultil/myTime'


import React, { Component } from 'react';
import { Button, ButtonGroup} from 'reactstrap' ; 

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


Date.prototype.addDays = function (num) {
    var value = this.valueOf();
    value += 86400000 * num;
    return new Date(value);
}   

class RankDatePicker extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            startDate: new Date( myTime.headMonthEn() ),
            endDate: new Date(myTime.curDateEn())
        }


        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    handleChangeStart(date){

        this.props.onChange({
            start:date,
            end:this.state.endDate
        });

        this.setState({
            startDate:date
        });
        
    }
    handleChangeEnd(date){
        
        this.props.onChange({
            start:this.state.startDate,
            end:date
        });
        
        this.setState({
            endDate:date
        });
        

    }
    render(){
        return(
            <ButtonGroup>
                <Button style={{background:'#fff', borderRight:0}} disabled> <i className="fa fa-calendar"></i> </Button>
                <DatePicker
                    dateFormat="yyyy-MM-dd"

                    selected={this.state.startDate}
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeStart}
                    className="input-datepicker-start"
                />
                <DatePicker
                    dateFormat="yyyy-MM-dd"

                    selected={this.state.endDate}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeEnd}
                    className="input-datepicker-end"
                      />
            </ButtonGroup>

        )
    }
}

RankDatePicker.defaultProps = {
    onChange:()=>{}
}

export default RankDatePicker;
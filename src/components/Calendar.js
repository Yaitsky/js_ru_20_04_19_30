import React, { Component } from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

class Calendar extends Component {
    state = {
        selectedDay: null
    }

    handleDayClick = (day, { selected }) => {
        this.setState({
            selectedDay: selected ? undefined : day
        })
    }
    
    render() {
        const { selectedDay } = this.state
        const style = {
            textAlign: 'center',
            fontSize: 20
        };

        return (
            <div>
                <DayPicker 
                    disabledDays={{ daysOfWeek: [0]}}
                    selectedDays={this.state.selectedDays}
                    onDayClick={this.handleDayClick}
                />
                <div style={style}>{selectedDay ? selectedDay.toLocaleDateString() : 'Please select a day'}</div>
            </div>   
        );
    }
}

export default Calendar;
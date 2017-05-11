import React, { Component } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

class Calendar extends Component {
    state = {
        from: null,
        to: null
    }

    handleDayClick = day => {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
    }

    handleResetClick = e => {
        e.preventDefault();
        this.setState({
            from: null,
            to: null
        });
    }
    
    render() {
        const { from, to } = this.state;
        const style = {
            textAlign: 'center',
            fontSize: 20
        };

        return (
            <div>
                <DayPicker
                    numberOfMonths={1}
                    selectedDays={[from, { from, to }]}
                    onDayClick={this.handleDayClick}
                />
                <div style={style}>
                    From: {from ? from.toLocaleDateString() : 'Выберите начало'} --- To: {to ? to.toLocaleDateString() : 'Выберите конец'}
                    <br />
                    <a href="#" onClick={this.handleResetClick}>Отменить выбор</a>
                </div>
            </div>   
        );
    }
}

export default Calendar;
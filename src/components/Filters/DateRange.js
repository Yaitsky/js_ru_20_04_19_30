import React, { Component } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import {connect} from 'react-redux'
import {dataSelection} from '../../AC/index'

import 'react-day-picker/lib/style.css';

class DateRange extends Component {

    handleDayClick = (day) => {
        const {dataSelection} = this.props
        dataSelection(DateUtils.addDayToRange(day, this.props.selection))
    }

    render() {
        const { from, to } = this.props.selection;
        const selectedRange = from && to && `${from.toDateString()} - ${to.toDateString()}`
        return (
            <div className="date-range">
                <DayPicker
                    ref="daypicker"
                    selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
                    onDayClick={ this.handleDayClick }
                />
                {selectedRange}
            </div>
        );
    }
}

function mapStateToProps(storeState) {
    return {
        selection: storeState.dataSelection
    }
}

export default connect(mapStateToProps, { dataSelection })(DateRange)
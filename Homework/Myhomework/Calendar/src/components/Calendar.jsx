import React, { Component } from 'react';
// import DefaultStyle from './DefaultStyle';
// import LineStyle from './LineStyle';
import MonthContent from './MonthContent';
// import ContentData from './ContentDate';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: 'default'
        };
    }

    switchStyle = () => {
        if (this.state.style === 'default') {
            this.setState({ style: 'line' });
        } else {
            this.setState({ style: 'default' });
        }
    };

    render() {
        return (
            <div
                className={
                    this.state.style === 'default'
                        ? 'calendar default'
                        : 'calendar line'
                }
            >
                <div className="header">
                    <div className="switchBtn" onClick={this.switchStyle}>
                        <i className="fas fa-calendar-alt" />
                        <span>
                            {this.state.style === 'default'
                                ? '切換列表顯示'
                                : '切換月曆顯示'}
                        </span>
                    </div>
                </div>
                <MonthContent
                    {...this.props}
                    // test={this.props}
                    CalendarStyle={this.state.style}
                />
            </div>
        );
    }
}

export default Calendar;

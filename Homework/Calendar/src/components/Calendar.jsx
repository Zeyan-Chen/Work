import React, { Component } from 'react';
import DefaultStyle from './DefaultStyle';
import LineStyle from './LineStyle';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: 'line'
        };
    }

    whenClicked(e) {
        console.log(e.target);
        if (e.target.classList.contains('next')) {
            alert('右');
        } else [alert('左')];
    }

    switchStyle() {
        if (this.state.style === 'default') {
            this.setState({ style: 'line' });
        } else {
            this.setState({ style: 'default' });
        }
    }

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
                    <div
                        className="switchBtn"
                        onClick={() => {
                            this.switchStyle();
                        }}
                    >
                        <i className="fas fa-calendar-alt" />
                        <span>
                            {this.state.style === 'default'
                                ? '切換列表顯示'
                                : '切換月曆顯示'}
                        </span>
                    </div>
                </div>
                <div className="sliderMonth">
                    <div
                        className="fas fa-caret-right next"
                        onClick={e => this.whenClicked(e)}
                    />
                    <div
                        className="fas fa-caret-left prev"
                        onClick={e => this.whenClicked(e)}
                    />
                    <ul className="tab">
                        <li>2018 10月</li>
                        <li className="active">2018 11月</li>
                        <li>2018 12月</li>
                        <li>2018 01月</li>
                        <li>2018 02月</li>
                        <li>2018 03月</li>
                    </ul>
                </div>

                {this.state.style === 'default' ? (
                    <DefaultStyle />
                ) : this.state.style === 'line' ? (
                    <LineStyle />
                ) : null}
            </div>
        );
    }
}

export default Calendar;

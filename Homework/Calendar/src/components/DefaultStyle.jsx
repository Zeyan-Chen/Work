import React, { Component } from 'react';

class CalendarDefault extends Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <ul className="week">
                    <li>星期日</li>
                    <li>星期一</li>
                    <li>星期二</li>
                    <li>星期三</li>
                    <li>星期四</li>
                    <li>星期五</li>
                    <li>星期六</li>
                </ul>
                <ul className="contentDates">
                    <li className="disable" />
                    <li>
                        01
                        <div className="guaranteedLabel">成團</div>
                        <div className="dataContent">
                            <span className="sign">報名</span>
                            <p>
                                可賣:
                                <span className="availableV">31</span>
                            </p>
                            <p>
                                團位:
                                <span className="totalV">32</span>
                            </p>
                            <p>
                                <span className="price">$40,999</span>
                            </p>
                        </div>
                    </li>
                    <li>
                        02
                        <div className="signContent" />
                    </li>
                    <li>
                        03
                        <div className="signContent" />
                    </li>
                    <li>
                        04
                        <div className="signContent" />
                    </li>
                    <li>
                        05
                        <div className="signContent" />
                    </li>
                    <li>
                        06
                        <div className="signContent" />
                    </li>
                    <li>
                        07
                        <div className="signContent" />
                    </li>
                    <li>
                        08
                        <div className="signContent" />
                    </li>
                    <li>
                        09
                        <div className="signContent" />
                    </li>
                    <li>
                        10
                        <div className="signContent" />
                    </li>
                    <li>
                        11
                        <div className="signContent" />
                    </li>
                    <li>
                        12
                        <div className="signContent" />
                    </li>
                    <li>
                        13
                        <div className="signContent" />
                    </li>
                    <li>
                        14
                        <div className="signContent" />
                    </li>
                    <li>
                        15
                        <div className="signContent" />
                    </li>
                    <li>
                        16
                        <div className="signContent" />
                    </li>
                    <li>
                        17
                        <div className="signContent" />
                    </li>
                    <li>
                        18
                        <div className="signContent" />
                    </li>
                    <li>
                        19
                        <div className="signContent" />
                    </li>
                    <li>
                        20
                        <div className="signContent" />
                    </li>
                    <li>
                        21
                        <div className="signContent" />
                    </li>
                    <li>
                        22
                        <div className="signContent" />
                    </li>
                    <li>
                        23
                        <div className="signContent" />
                    </li>
                    <li>
                        24
                        <div className="signContent" />
                    </li>
                    <li>
                        25
                        <div className="signContent" />
                    </li>
                    <li>
                        26
                        <div className="signContent" />
                    </li>
                    <li>
                        27
                        <div className="signContent" />
                    </li>
                    <li>
                        28
                        <div className="signContent" />
                    </li>
                    <li>
                        29
                        <div className="signContent" />
                    </li>
                    <li>
                        30
                        <div className="signContent" />
                    </li>
                </ul>
            </React.Fragment>
        );
    }
}

export default CalendarDefault;

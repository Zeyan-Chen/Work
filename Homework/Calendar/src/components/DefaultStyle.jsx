import React, { Component } from 'react';

class MonthDate extends Component {
    fillInContent(domDays, matchDays) {
        for (let i = 0; i < matchDays.length; i++) {
            // matchDays array 裡符合 dom 的天的話就填入相關的資訊
            if (domDays === matchDays[i].date) {
                let content = (
                    <React.Fragment>
                        {matchDays[i].guaranteed ? (
                            <div className="guaranteedLabel">成團</div>
                        ) : null}
                        <div className="dataContent">
                            <span className="sign">{matchDays[i].status}</span>
                            <p>
                                可賣:
                                <span className="availableV">
                                    {matchDays[i].availableVancancy}
                                </span>
                            </p>
                            <p>
                                團位:
                                <span className="totalV">
                                    {matchDays[i].totalVacnacy}
                                </span>
                            </p>
                            <p>
                                <span className="price">
                                    ${matchDays[i].price}
                                </span>
                            </p>
                        </div>
                    </React.Fragment>
                );
                return content;
            }
        }
    }

    render() {
        const { monthLen, year, matchDays } = this.props;
        let month =
            this.props.month < 10 ? '0' + this.props.month : this.props.month;
        let days = [];
        let daysLi;

        for (let i = 1; i <= monthLen; i++) {
            if (i < 10) {
                i = '0' + i;
            }
            let domDays = year + '/' + month + '/' + i;
            daysLi = (
                <li key={i}>
                    {i}
                    {this.fillInContent(domDays, matchDays)}
                </li>
            );
            days.push(daysLi);
        }
        return days; // render 出來 days
    }
}

class Disable extends Component {
    render() {
        let disables = []; // 放 disable li 的容器
        let disableDIV;
        let ifFirstDayZero; // 第一天是否為 0
        this.props.firsday === 0
            ? (ifFirstDayZero = 7)
            : (ifFirstDayZero = this.props.firsday); // 如果第一天為 0 時，就傳 7 天 disable

        for (let i = 0; i < ifFirstDayZero; i++) {
            disableDIV = <li key={i} className="disable" />;
            disables.push(disableDIV);
        }
        return disables; // render 出來 disable li
    }
}

class ContentData extends Component {
    constructor(props) {
        super(props);
        this.RefConteneDate = React.createRef();
        this.state = { year: null, month: null };
    }

    // 當月第一天
    getFirstDay(year, month) {
        let firstDay = new Date(year, month - 1, 1);
        return firstDay.getDay();
    }

    // 當月有幾天
    getMonthLen(year, month) {
        let nextMonth = new Date(year, month, 0);
        return nextMonth.getDate();
    }

    // getFirstAndMonthLen(year, month) {
    //     let firstDay = this.getFirstDay(year, month); // 取得每個月第一天哪一天
    //     let monthLen = this.getMonthLen(year, month); // 取的每個月長度
    //     return { firstDay: firstDay, monthLen: monthLen };
    // }

    handlePropsDate(year, month, propsData) {
        const { dataSource } = propsData;
        let matchMonth = [];
        for (let i = 0; i < dataSource.length; i++) {
            let propsYear = parseInt(dataSource[i].date.substr(0, 4), 10);
            let propsMonth = parseInt(dataSource[i].date.substr(5, 2), 10);

            if (propsYear === year) {
                if (propsMonth === month) {
                    matchMonth.push(dataSource[i]);
                }
            }
        }
        return matchMonth;
    }

    render() {
        const { year, month, data } = this.props;

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
                <ul className="contentDates" ref={this.RefConteneDate}>
                    <Disable firsday={this.getFirstDay(year, month)} />
                    <MonthDate
                        monthLen={this.getMonthLen(year, month)}
                        year={year}
                        month={month}
                        matchDays={this.handlePropsDate(year, month, data)}
                    />
                    {/* 這是 example <li>
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
                    </li> */}
                </ul>
            </React.Fragment>
        );
    }
}

export default ContentData;

import React, { Component } from 'react';

class MonthDate extends Component {
    // 整理符合日期的
    hadledMonth(year, month, dataSource) {
        let matchMonthArr = [];
        if (month < 10) {
            month = '0' + month;
        }
        let getNowYearMonth = year + '/' + month;
        for (let i = 0; i < dataSource.length; i++) {
            const weeks = [
                '星期日',
                '星期一',
                '星期二',
                '星期三',
                '星期四',
                '星期五',
                '星期六'
            ];
            if (dataSource[i].date.substr(0, 7) === getNowYearMonth) {
                let setTime = new Date(dataSource[i].date); // 幾年幾月幾日 ex: 2018/12/25
                let week = weeks[setTime.getDay()]; // 把值進去看看取得當天是星期幾

                // 符合資料的 Object
                let matchObject = {
                    date: dataSource[i].date,
                    price: dataSource[i].price, // 價錢
                    guaranteed: dataSource[i].guaranteed, // 是否出團
                    availableVancancy: dataSource[i].availableVancancy, // 可賣
                    totalVacnacy: dataSource[i].totalVacnacy, // 總出團
                    status: dataSource[i].status, // 目前狀態
                    week: week, // 星期幾
                    day: dataSource[i].date.substr(8, 2) // 日
                };
                matchMonthArr.push(matchObject); // push 進陣列
            }
        }

        // 依照日期排序
        let sortedArr = matchMonthArr.sort(function(obj1, obj2) {
            return obj1.day - obj2.day;
        });

        // 過濾重複值
        let filteredArr = sortedArr.filter((data, index, arr) => {
            return arr.map(item => item['date']).indexOf(data.date) === index;
        });

        return filteredArr;
    }

    // render li
    createMatchMonthLi(year, month, dataSource) {
        let data = this.hadledMonth(year, month, dataSource);
        return data.map((tags, i) => {
            return (
                <li key={i}>
                    <div className="left">
                        <div className="day">
                            <h1>{tags.day}</h1>
                            <h3>{tags.week}</h3>
                        </div>

                        <div className="availablePosition">
                            <span>可賣: {tags.availableVancancy}</span>
                            <span>團位: {tags.totalVacnacy}</span>
                            {tags.guaranteed ? (
                                <div className="guaranteedLabel">
                                    <i className="fas fa-flag" />
                                    成團
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="right">
                        <p className="sign">{tags.status}</p>
                        <p className="price">${tags.price.toLocaleString()}</p>
                    </div>
                </li>
            );
        });
    }

    render() {
        const { year, month, data } = this.props;
        return this.createMatchMonthLi(year, month, data.dataSource);
    }
}

class LineStyle extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { data, month, year } = this.props;
        return (
            <React.Fragment>
                <ul className="contentDates">
                    <MonthDate year={year} month={month} data={data} />

                    {/* 這是 HTML example
                    <li>
                        <div className="left">
                            <div className="day">
                                <h1>7</h1>
                                <h3>星期三</h3>
                            </div>
                            <div className="availablePosition">
                                <span>可賣: 31</span>
                                <span>團位: 32</span>
                            </div>
                        </div>
                        <div className="right">
                            <p className="sign">報名</p>
                            <p className="price">$39,999</p>
                        </div>
                    </li>
                    <li>
                        <div className="left">
                            <div className="day">
                                <h1>7</h1>
                                <h3>星期三</h3>
                            </div>
                            <div className="availablePosition">
                                <span>可賣: 31</span>
                                <span>團位: 32</span>
                            </div>
                        </div>
                        <div className="right">
                            <p className="sign">報名</p>
                            <p className="price">$39,999</p>
                        </div>
                    </li>
                    <li>
                        <div className="left">
                            <div className="day">
                                <h1>7</h1>
                                <h3>星期三</h3>
                            </div>
                            <div className="availablePosition">
                                <span>可賣: 31</span>
                                <span>團位: 32</span>
                            </div>
                        </div>
                        <div className="right">
                            <p className="sign">報名</p>
                            <p className="price">$39,999</p>
                        </div>
                    </li>
                    <li>
                        <div className="left">
                            <div className="day">
                                <h1>7</h1>
                                <h3>星期三</h3>
                            </div>
                            <div className="availablePosition">
                                <span>可賣: 31</span>
                                <span>團位: 32</span>
                            </div>
                        </div>
                        <div className="right">
                            <p className="sign">報名</p>
                            <p className="price">$39,999</p>
                        </div>
                    </li>
                    <li>
                        <div className="left">
                            <div className="day">
                                <h1>7</h1>
                                <h3>星期三</h3>
                            </div>
                            <div className="availablePosition">
                                <span>可賣: 31</span>
                                <span>團位: 32</span>
                            </div>
                        </div>
                        <div className="right">
                            <p className="sign">報名</p>
                            <p className="price">$39,999</p>
                        </div>
                    </li> */}
                </ul>
            </React.Fragment>
        );
    }
}

export default LineStyle;

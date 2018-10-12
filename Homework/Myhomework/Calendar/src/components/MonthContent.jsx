import React, { Component } from 'react';
// import ContentData from './ContentDate';
import DefaultStyle from './DefaultStyle';
import LineStyle from './LineStyle';

class MonthContent extends Component {
    constructor(props) {
        super(props);
        this.sliderRef = React.createRef();

        this.state = {
            nowIndex: 1,
            totallW: null, // Month slider 整體的寬
            liW: null, // Month slider 一個 li 的寬
            move: 0, // Month slider 移動
            year: null,
            month: null
        };
    }

    // 畫面渲染前要做的事
    componentWillMount() {
        this.setState({
            year: this.handleInitYearMonth(this.props.initYearMonth)['year'],
            month: this.handleInitYearMonth(this.props.initYearMonth)['month']
        });
    }

    // 畫面渲染完畢，只要setstate他會直接執行這函式一次
    componentDidMount() {
        const tabLi = this.sliderRef.current.children;
        for (let i = 0; i < tabLi.length; i++) {
            if (tabLi[i].classList.contains('active')) {
                this.setState({ nowIndex: i });
                break;
            }
        }
        tabLi[1].classList.add('active');
    }

    // 資料更新後
    componentDidUpdate() {
        // 這函式不可以用，setState 會無限循環
        const tab = this.sliderRef.current;
        for (let i = 0; i < tab.children.length; i++) {
            tab.children[i].classList.remove('active');
        }
        tab.children[this.state.nowIndex].classList.add('active'); // 哪個月份被選到
        tab.style.transform = 'translateX(' + -this.state.move + 'px)';
    }

    // Month の slider next
    next = () => {
        // console.log('下一月');
        const tab = this.sliderRef.current;
        // 哪個月份 active 狀態
        let totallW = 100 * tab.childNodes.length;
        let liW = tab.childNodes[0].clientWidth;
        this.setState(currentState => {
            if (currentState.nowIndex >= tab.children.length - 1) {
                return {
                    nowIndex: currentState.nowIndex
                };
            } else {
                let nextIndex = currentState.nowIndex + 1;
                return {
                    year: this.getActiveMonth(nextIndex)['year'],
                    month: this.getActiveMonth(nextIndex)['month'],
                    nowIndex: nextIndex
                };
            }
        });

        // 月份 slider 移動
        this.setState(currentState => {
            if (currentState.move >= totallW || currentState.nowIndex === 1) {
                return { move: currentState.move };
            } else {
                return { move: currentState.move + liW };
            }
        });
    };

    // Month の slider prev
    prev = () => {
        const tab = this.sliderRef.current;
        let liW = tab.childNodes[0].clientWidth;
        this.setState(currentState => {
            if (currentState.move <= 0 || currentState.nowIndex === 5) {
                return { move: currentState.move };
            } else {
                return { move: currentState.move - liW };
            }
        });

        this.setState(currentState => {
            if (currentState.nowIndex <= 0) {
                return { nowIndex: currentState.nowIndex };
            } else {
                let prevIndex = currentState.nowIndex - 1;
                // this.getActiveMonth(prevIndex);
                return {
                    nowIndex: prevIndex,
                    year: this.getActiveMonth(prevIndex)['year'],
                    month: this.getActiveMonth(prevIndex)['month']
                };
            }
        });
    };

    createMonthLi(year, month) {
        const months = [
            '12月',
            '01月',
            '02月',
            '03月',
            '04月',
            '05月',
            '06月',
            '07月',
            '08月',
            '09月',
            '10月',
            '11月'
        ];
        let elLi; // 空的 li DOM
        let newMonth = []; // 存月份
        let MonthLi = []; // 存月份的 DOM

        // 取 props initYearMonth 的六個月
        for (let i = month - 1; i < month + 5; i++) {
            let restartI = i % months.length; // array 循環如果超過 length，就從 0 開始
            newMonth.push(months[restartI]);
        }

        // render 月份出來
        for (let i = 0; i < newMonth.length; i++) {
            elLi = (
                <li key={i}>
                    {year}
                    {' ' + newMonth[i]}
                </li>
            );
            MonthLi.push(elLi);
        }
        return MonthLi;
    }

    // 處理 props 傳過來的 inintYearMonth，分年月
    handleInitYearMonth(time) {
        let year = parseInt(time.substr(0, 4), 10); // 後面的 10 是因為 React 規定用 10 進制
        let month = parseInt(time.substr(4), 10);
        return { year: year, month: month };
    }

    // 取得目前 slider 月份
    getActiveMonth(index) {
        const tabLI = this.sliderRef.current.childNodes;
        let year = parseInt(tabLI[index].innerHTML.substr(0, 4), 10);
        let month = tabLI[index].innerHTML.substr(5);
        month = parseInt(month.substring(0, month.length - 1), 10);

        return { year: year, month: month };
    }

    // 處理　initYearMonth，取出年或月
    createMonth(initData) {
        return (
            <React.Fragment>
                {this.createMonthLi(
                    this.handleInitYearMonth(initData)['year'],
                    this.handleInitYearMonth(initData)['month']
                )}
            </React.Fragment>
        );
    }

    render() {
        const { year, month } = this.state;

        return (
            <React.Fragment>
                <div className="sliderMonth">
                    <div
                        className="fas fa-caret-right next"
                        onClick={this.next}
                    />
                    <div
                        className="fas fa-caret-left prev"
                        onClick={this.prev}
                    />
                    <ul className="tab" ref={this.sliderRef}>
                        {this.createMonth(this.props.initYearMonth)}
                    </ul>
                </div>
                {this.props.CalendarStyle === 'default' ? (
                    <DefaultStyle data={this.props} year={year} month={month} />
                ) : this.props.CalendarStyle === 'line' ? (
                    <LineStyle data={this.props} year={year} month={month} />
                ) : (
                    alert('沒有這skin')
                )}
            </React.Fragment>
        );
    }
}

export default MonthContent;

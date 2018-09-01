import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import styles from '../css.scss';

/**
 * Table內容畫面渲染
 */
class TableContent extends Component {
    constructor(props) {
        super(props);
        this.table = React.createRef();

        this.state = {
            chooseData: [],
            chooseIndex: [],
            tdWidth: 0,
            rowMinIndex: []
        }
    }

    componentDidMount () {
        this.init();
        window.addEventListener('resize', () => {
            this.getTdWidth()
        });
    }
    componentWillUnmount () {
        window.removeEventListener('resize', () => {
            this.getTdWidth();
        });
    }

    init () {
        setTimeout(() => {
            this.getTdWidth();
            this.minIndex();
        }, 0);
    }
    getTdWidth () {
        let td = document.querySelector('td');
        this.setState({ tdWidth: td.offsetWidth });
    }
    getClass (i, j) {
        if (this.state.chooseData.indexOf(i * 7 + j) !== -1) {
            return 'active';
        }
        if (this.state.chooseIndex.indexOf(i * 7 + j) !== -1) {
            console.log('asdasd')
            return 'thisActive';
        }
    }
    tdClick (row, col) {
        const { tdData } = this.props;

        let rowChoose = tdData.map((ele, i) => row * 7 + i),
            colChoose = tdData.map((ele, i) => col + 7 * i);

        let thisIndex = [...rowChoose, ...colChoose].filter((ele, i, arr) => arr.indexOf(ele) !== i),
            result = [...rowChoose, ...colChoose].filter((ele, i, arr) => arr.indexOf(ele) === i);

        this.setState({
            chooseData: result,
            chooseIndex: thisIndex
        });
    }
    toThousands (num) {
        num = (num || 0).toString();
        let result = '';
        while (num.length > 3) {
            result = ',' + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }
        if (num) { result = num + result; }
        return result;
    }
    minIndex () {
        const { tdData } = this.props;
        let arr, newArr, outputArr = [];

        tdData.forEach((ele, i) => {
            arr = tdData[i].map((ele) => parseInt(ele, 10));
            newArr = arr.filter(Boolean);
            if (arr.indexOf(Math.min(...newArr)) !== arr.indexOf(Math.max(...newArr))) {
                outputArr.push(i * 7 + arr.indexOf(Math.min(...newArr)));
            }
        });
        this.setState({ rowMinIndex: outputArr });
    }

    render() {
        const { colTh, rowTh, tdData, nowFirstColIndex, speed, callBack } = this.props;
        const { chooseData, chooseIndex, rowMinIndex } = this.state;

        let tableStyle = {
            transition: `transform ${speed}s`,
            transform: `translate3d(${nowFirstColIndex * -this.state.tdWidth}px, 0, 0)`,
        }

        return (
            <div className='table-content'>
                <table style={tableStyle}>
                    <thead>
                        <tr className='tr'>
                            {rowTh.map((ele, i) =>
                                <th key={i} className={i === 0 ? 'th' : null}>
                                    <span>{ele[0]}</span>
                                    <span>{ele[1]}</span>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {tdData.map((ele, i) =>
                            <tr key={i} className='tr'>
                                <th className='th'>
                                    <span>{colTh[i + 1][0]}</span>
                                    <span>{colTh[i + 1][1]}</span>
                                </th>
                                {tdData[i].map((ele, j) =>
                                    <td
                                        key={j}
                                        onClick={(e) => { this.tdClick(i, j); callBack(e.target);}}
                                        className={`${chooseData.indexOf(i * 7 + j) !== -1 ? 'active' : ''}${chooseIndex.indexOf(i * 7 + j) !== -1 ? ' activeThis' : ''}`}
                                    >
                                        {
                                            Number(ele)
                                            ?
                                                <span className='fwb'>${this.toThousands(ele)}<i>起</i></span>
                                            :
                                                <span>{ele}</span>
                                        }
                                        {rowMinIndex.map((ele, k) => i * 7 + j === ele
                                            ?
                                                <span key={k} className='bargain'>最便宜</span>
                                            :
                                                null
                                        )}
                                    </td>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

TableContent.propTypes = {
    colTh: PropTypes.array.isRequired,
    rowTh: PropTypes.array.isRequired,
    tdData: PropTypes.array.isRequired,
    speed: PropTypes.number,
    callBack: PropTypes.func.isRequired
};

export default CSSModules(TableContent, styles, { allowMultiple: true });
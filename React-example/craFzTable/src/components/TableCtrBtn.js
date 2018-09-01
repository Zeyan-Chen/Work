import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import styles from '../css.scss';

/**
 * 手機板移動按鈕
 */
class TableCtrBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            hiddenCol: 0
        }

    }

    componentDidMount () {
        this.init();
    }


    init () {
        setTimeout(() => {
            this.setState({
                count: this.props.nowFirstColIndex,
                hiddenCol: this.props.colNum - this.props.show
            });
        }, 0);
    }
    changeFirstColIndex (val) {
        if (this.state.count + val > this.state.hiddenCol) {
            val = this.state.count + this.state.hiddenCol % this.state.count;
        } else if (this.state.count + val < 0) {
            val = 0;
        } else {
            val = this.state.count + val;
        }
        this.setState({ count: val }, () => {
            this.props.btnClick(this.state.count);
        });
    }
    render() {
        return (
            <div className='table-btn'>
                {
                    this.state.count !== 0
                    ?
                        <div className='btn btn-prev'
                            onClick={(e) => this.changeFirstColIndex(-this.props.slide)}
                        >
                            &lt;
                        </div>
                    :
                        null
                }
                {
                    this.state.count !== this.state.hiddenCol
                    ?
                        <div className='btn btn-next'
                            onClick={(e) => this.changeFirstColIndex(this.props.slide)}
                        >
                            &gt;
                        </div>
                    :
                        null
                }
            </div>
        );
    }
}

TableCtrBtn.propTypes = {
    btnClick: PropTypes.func.isRequired,
    nowFirstColIndex: PropTypes.number.isRequired,
    colNum: PropTypes.number.isRequired,
    slide: PropTypes.number.isRequired,
};

export default CSSModules(TableCtrBtn, styles, { allowMultiple: true });
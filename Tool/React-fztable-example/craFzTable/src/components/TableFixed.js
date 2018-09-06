import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import styles from '../css.scss';

/**
 * 左邊標標題列(column)畫面渲染
 */
class TableFixed extends Component {

    render() {
        return (
            <div className='table-fixed'>
                <table>
                    <tbody>
                        {this.props.colTh.map((ele, i) =>
                            <tr key={i}>
                                <th className='th'>
                                    <span>{ele[0]}</span>
                                    <span>{ele[1]}</span>
                                </th>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

TableFixed.propTypes = {
    colTh: PropTypes.array.isRequired
};

export default CSSModules(TableFixed, styles, { allowMultiple: true });
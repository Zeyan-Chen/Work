import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../css.scss';
import IcRcln from '../../ic_rcln/components/Module';

let Module = props => {
    const classes = classNames.bind(styles)('bt_conx');
    // 範例
    // const classes = classNames(
    //   'lb_conl',
    //   props.name
    // );
    return (
        <a href={props.href} className={classes}>
            {props.children}
            <IcRcln name="toolnext" />
        </a>
    );
};
/**
 * Props default value write here
 */
Module.defaultProps = {
    prop: 'string'
};
/**
 * Typechecking with proptypes, is a place to define prop api. [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
 */
Module.propTypes = {
    prop: PropTypes.string.isRequired
};

export default Module;

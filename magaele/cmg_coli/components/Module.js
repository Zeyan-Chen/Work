import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import styles from '../css.scss';
import LbConl from '../../lb_conl/components/Module';
import BtConx from '../../bt_conx/components/Module';

// 字上面 check 有無超過預設字數，(先保留著)
// function textLenCheck (ifNew, Title) {
// // "有" new 標籤字數限定 18 "沒有"都 21
//     let limitLen = ifNew ? 18 : 21;
//     let newValue;
//     // console.log("Title: " + Title);
//     // console.log("limitLen: " + limitLen);
//     // console.log("TitleLength: " + Title.length);
//     if (Title.length > limitLen) {
//         console.log('超過字數');
//         newValue = Title.substring(0, limitLen) + '...';
//     } else {
//         newValue = Title;
//     }
//     return newValue;
// }

// 數字換算每三個單位 + 一個逗號
const priceUnit = x => {
    // return `$${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // 正規法寫法
    return `$${x.toLocaleString()}`;
};

// li render
const Item = props => {
    const { arrangement } = props; // props
    const { href, targetBlank, label, newest, title, price } = props.tags; // map tags
    return (
        <li className={`arrangement-${arrangement}`}>
            <a href={href} target={targetBlank ? '_blank' : null} />
            <div className="inside-left">
                {label === '' ? (
                    <div className="flag" />
                ) : (
                    <LbConl name="lb_conl_1">{label}</LbConl>
                )}
                {newest ? <LbConl name="lb_conl_2">NEW</LbConl> : null}
                {/* {textLenCheck(newest, title)} 如果要用字數判斷，就打開吧 */}
                {title}
            </div>
            <div className="inside-right">
                <div className="price">{priceUnit(price)}</div>
                <span className="gray">起</span>
            </div>
        </li>
    );
};

let Module = props => {
    console.log(props.data.length);

    const classes = classNames('cmg_coli');
    const { more, arrangement } = props;
    return (
        <div className={classes}>
            <div className="title">
                <div className="circle" />
                <h1>熱門推薦</h1>
            </div>
            <ul>
                {props.data.map((tags, i) => {
                    // 只顯示 10 筆
                    return (
                        <Item key={i} tags={tags} arrangement={arrangement} />
                    );
                })}
            </ul>
            <BtConx href={more.href}>{more.name}</BtConx>
        </div>
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
    prop: PropTypes.string.isRequired,
    arrangement: PropTypes.number,
    anchorName: PropTypes.string
};

export default CSSModules(Module, styles, { allowMultiple: true });

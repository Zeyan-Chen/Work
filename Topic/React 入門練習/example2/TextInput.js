import React, { Component } from 'react';
import TextShow from './TextShow.jsx';

class TextInput extends Component {
    // 建構式
    constructor(props) {
        // super是呼叫上層父類別的建構式
        super(props)
        this.state = {
            text: '',
            testa: ''
        }

    }
    // 處理的方法，用e.target可以獲取到輸入框的值，用箭頭函式可以綁定`this`
    handleChange(e) {
        console.log('e', e);
        console.log('e.target', e.target);
        console.log('e.bubbles', e.bubbles);
        console.log('e.preventDefault', e.preventDefault);
        console.log('e.type', e.type);
        // console.log(e.target);
        if (e.target instanceof HTMLInputElement) {
            this.setState({text: e.target.value})
        }
        // 此代碼將會展示要修改狀態只可以透過setState這個function來修改，該物件是不可寫的
        console.log(this);
        
    }
    // 渲染方法，回傳React Element(元素)
    render() {
        return (
            <div>
                <input type="text"
                    value={this.state.text}
                    placeholder={this.props.initText}
                    // onChange={(e) => this.handleChange(e)}
                    onChange={this.handleChange.bind(this)}
                />
                {
                    ((text) => {
                        if( text === 'React' ) {
                            return <TextShow text={this.state.text}/>;
                        }
                    })(this.state.text)
                }
                <TextShow text={this.state.text}/>
            </div>
        )
    }
}

//加入props的資料類型驗証
TextInput.propTypes = {
    initText: React.PropTypes.string.isRequired
}

//加入props的資料類型驗証
/*
TextInput.propTypes = {
    [propName]: [React.PropTypes],
    ...
}
*/

window.TextInput = TextInput;
export default TextInput;
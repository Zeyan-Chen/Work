import React, { Component } from 'react';
import TodoItem from './TodoItem.jsx';

class TodoList extends Component {
    // 建構式
    constructor(props) {
        // super是呼叫上層父類別的建構式
        super(props)

        // 設定初始的狀態。注意！這裡有個反樣式。
        this.state = {
            items: [],
            inputValue:'',
        }

    }
    handleChange (e) {

        if (e.target instanceof HTMLInputElement) {
            this.setState({
                inputValue: e.target.value,
            });
        }

    }
    handleKeyPress (e) {
        if( e.key === 'Enter' && e.target instanceof HTMLInputElement ) {
            const newItems = [e.target.value, ...this.state.items ]

            //按下enter後，加到列表項目中並清空輸入框
            this.setState({
                items: newItems,
                inputValue: '',
            })
        }
    }
    handleRemoveItem (index) {
        const oldItems = this.state.items

        //從陣列中移除一個index的成員的純粹函式
        const newItems = oldItems.slice(0,index).concat(oldItems.slice(index+1))

        //整個陣列重新更新
        this.setState({
            items: newItems,
        })
    }
    // 渲染方法，回傳React Element(元素)
    render() {
        return (
            <div>
                <input type="text"
                    value={this.state.inputValue}
                    placeholder={this.props.initText}
                    onKeyPress={this.handleKeyPress.bind(this)}
                    onChange={this.handleChange.bind(this)}
                />
                <ul>
                    {
                        this.state.items.map((value, index) => {
                        return <TodoItem
                                
                                text={value}
                                index={index}
                                onItemClick={this.handleRemoveItem.bind(this)}
                               />
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default TodoList;
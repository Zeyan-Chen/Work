import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  state = {
    counters: [
      { id: 0, value: 4 },
      { id: 1, value: 3 },
      { id: 2, value: 2 },
      { id: 3, value: 2 }
    ]
  };

  handleDelete = counterId => {
    console.log("handleDelete called", counterId);

    let c = this.state.counters.filter(c => c.id);
    console.log("c.id:" + c.id, "counterId:" + counterId);

    const counters = this.state.counters.filter(c => c.id !== counterId);
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  render() {
    // return <Counter />;
    // return this.state.counters.map(counter => (
    //   <Counter key={counter.id} selected={true} value={counter.value} />
    // ));

    return (
      // onDelete 去呼叫 handleDelete
      <div>
        <button onClick={this.handleReset} />
        {this.state.counters.map(counter => (
          <Counter
            onClick={this.handleDelete}
            key={counter.id}
            value={counter.value}
            id={counter.id}
            onDelete={this.handleDelete}
          />
        ))}
      </div>
    );
  }
}

export default Counters;

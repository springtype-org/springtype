import React, { Component } from 'react';
import './App.css';
import '@springtype/springtype-incubator-gantt-chart/dist/GanttChart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <gantt-chart />
          <p>
            gantt-chart integrated
          </p>
        </header>
      </div>
    );
  }
}

export default App;

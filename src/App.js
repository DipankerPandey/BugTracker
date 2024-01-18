import './App.css';
import React from 'react';
import Card from './Card.js';
import BugDisplay from "./BugDisplay";
import { buglist } from './buglist.js';
import SearchBox from './SearchBox.js';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <body>
          <h1 className='heading'>Bug Tracker</h1>
          <Card />
          <h3 className='headingtwo'>Current Bugs</h3>
          <SearchBox />
          <BugDisplay buglist={ buglist }/>
        </body>
      </div>
    );
  }
}

export default App;

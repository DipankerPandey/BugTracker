import './App.css';
import React from 'react';
import Card from './Card.js';
import Bug from './Bug.js';
import BugDisplay from "./BugDisplay";
import { buglist } from './buglist.js';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <body>
          <h1 className='heading'>Bug Tracker</h1>
          <Card />
          <BugDisplay buglist={ buglist }/>
        </body>
      </div>
    );
  }
}

export default App;

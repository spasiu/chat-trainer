import React, { Component } from 'react';
import './App.css';
import Text from './Text.js';
import Intro from './Intro.js';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

class App extends Component {
  render() {
    const menuStyle = { color:'#ddd', padding: '1em', textDecoration: 'none' };
    const activeMenuStyle = Object.assign({}, menuStyle, { color:'#000' });

    const style = {
      fontFamily: 'Perpetua Titling',
      display: 'flex',
      justifyContent: 'center',
      fontSize: '1.5em'
    };
    return (
      <Router>
        <div className="App">
          <div style={style}>
            <NavLink to='/intro/' activeStyle={activeMenuStyle} style={menuStyle}>{'{intro}'}</NavLink>
            <NavLink to='/section-1/' activeStyle={activeMenuStyle} style={menuStyle}>I</NavLink>
            <NavLink to='/section-2/' activeStyle={activeMenuStyle} style={menuStyle}>II</NavLink>
          </div>
          <hr />
          <Route path="/intro/" component={Intro} />
          <Route path="/section-1/" component={Text}/>
          <Route path="/section-2/" component={() => <p>Hello World</p>} />
        </div>
      </Router>
    );
  }
}

export default App;

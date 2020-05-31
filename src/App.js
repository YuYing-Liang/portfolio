import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/navbar';
import './css/main.css'
import Skills from './pages/skills';
import Footer from './components/footer';
import Work from './pages/work';
import Game from './pages/game';

function App() {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route path="/portfolio/" exact component={Skills}/>
        <Route path="/portfolio/work" exact component={Work}/>
        <Route path="/" exact component={Game}/>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;

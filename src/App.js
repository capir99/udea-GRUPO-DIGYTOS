
import './css/App.css';
import './css/estilos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './shared/Header';
import Content from './home/components/Content';
import Home from './home/pages/Home';
import Error from './shared/pages/Error';
import  { BrowserRouter as Router, Switch, Redirect, Route} from "react-router-dom";
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'


function App() {
  return (

    
    <div className="App">
      
      <Router>
          <Switch>
            <Route path='/' exact>   
              <Header />
              <Content />
            </Route>
            <Route path='/home' exact>
              <Home />
            </Route>
            <Route path='/error' exact>
              <Error />
            </Route>
            <Redirect to='/error' />
        
          </Switch>
      </Router>
    
      
      
    </div>
  );
}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeComponent from './components/HomeComponent';
import FormComponent from './components/FormComponent';
import LibroInfoComponent from "./components/LibroInfoComponent";
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Link to="/">Home</Link>
            <Link className="ml-3" to="/addBook">Añadir libro</Link>
          </Nav> 
        </Navbar> 

        <Switch>
          <Route exact path="/">
            <HomeComponent />
          </Route>
          <Route exact path="/addBook">
            <FormComponent />
          </Route>
          <Route exact path="/libros/:isbn" component={LibroInfoComponent} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import './App.css';
import { Provider } from 'react-redux';
import store from './store/store'
import {
  BrowserRouter as Router,
  useHistory,
} from "react-router-dom";
import NavBar from './component/nav-bar/nav-bar';

function App() {
  let history=useHistory()
  return (
    <Router history={history}>
      <Provider store={store} >
        <div className="App">
          <div>
            <NavBar></NavBar>
          </div>
        </div>
      </Provider>
    </Router>
  );
}

export default App;

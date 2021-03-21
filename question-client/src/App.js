import './App.css';
import { Provider } from 'react-redux';
import store from './store/store'
import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  useHistory,
} from "react-router-dom";
// import SignIn from "./component/login/sign-in/sign-in";
// import SignUp from "./component/login/sign-up/sign-up";
// import AllQuestion from './component/question/all-questions/all-questions';
import NavBar from './component/nav-bar/nav-bar';
// import ViewQuestion from './component/question/view-question/view-question';
// import LogQuestion from './component/question/log-question/log-question';
// import AddQuestion from './component/question/add-question/add-question';
// import EditQuestion from './component/question/edit-question/edit-question';
// import history from "./history-browser";
// import { withRouter } from "react-router";

function App() {
  let history=useHistory()
  return (
    <Router history={history}>
      <Provider store={store} >
        <div className="App">


          <div>

            <NavBar></NavBar>
            {/* <Switch>
              <Route path="/sign-up">
                <SignUp />
              </Route>
              <Route path="/all-questions">
                <AllQuestion></AllQuestion>
              </Route>
              <Route path="/view-question/:index">
                <ViewQuestion></ViewQuestion>
              </Route>
              <Route path="/log-question">
                <LogQuestion></LogQuestion>
              </Route>
              <Route path="/add-question">
                <AddQuestion></AddQuestion>
              </Route>
              <Route path="/edit-question/:index">
                <EditQuestion></EditQuestion>
              </Route>
              <Route path="/">
                <SignIn></SignIn>
              </Route>
            </Switch> */}

          </div>

        </div>
      </Provider>
    </Router>
  );
}

export default App;

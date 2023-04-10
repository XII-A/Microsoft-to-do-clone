import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Menu from "./Menu";
import { useState, useEffect, Fragment } from "react";
import Home from './Home';
import ListContent from './ListContent';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {

  

  const [data, setData] = useState([
    "My Day",
    "Important",
    "Planned",
    "Assigned to me", //14
    "Tasks",
  ]);

  
  const [filteredData, setFilteredData] = useState(data);

  const [paramindex, setParamindex] = useState(null);

  const [username,setUserName] = useState('Jack Waterson');
  const [userEmail,setUserEmail] = useState('jackwaterson@gmail.com');

  return (
    <Router>

      <div className="grid-container">
        <Menu data = {data} setData = {setData} filteredData = {filteredData} setFilteredData = {setFilteredData} paramindex = {paramindex} setParamindex = {setParamindex} username = {username} userEmail = {userEmail}>

        </Menu>
        <div className="content">
          <Switch>
            <Route  path="/Home">
              <Home userEmail = {userEmail} setUserEmail = {setUserEmail} username = {username} setUserName = {setUserName}>
                
              </Home>
            </Route>
            <Route path="/:name/:index">
              <ListContent data = {data} setData = {setData} paramindex = {paramindex} setParamindex = {setParamindex}></ListContent>
            </Route>
              
          </Switch>

        </div>


      </div>

      <ToastContainer
        position="top-right"
        autoClose={1100}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        />
    </Router>
  );
}

export default App;

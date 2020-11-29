// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import registerServiceWorker from './registerServiceWorker';
// import reportWebVitals from './reportWebVitals';
import AddBook from './Components/AddBook';
import EditBook from './Components/EditBook';
import {BrowserRouter, Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Show from './Components/ShowBook';
import AddBeacon from './Components/AddBeacon';
import DisplayBeacon from './Components/DislayBeacon';
import ShowBeacon from './Components/ShowBeacon';
import EditBeacon from './Components/EditBeacon';
import Login from './Login/Login';

ReactDom.render(<BrowserRouter>
<Route exact path="/" component = {Login}></Route>
<Route path="/create" component = {AddBook}></Route>
<Route path="/show/:id" component = {Show}></Route>
<Route path="/edit/:id" component = {EditBook}></Route>
<Route path="/beacon" component = {DisplayBeacon}></Route>
<Route path="/creates/beacon" component = {AddBeacon}></Route>
<Route path="/shows/beacon/:id" component = {ShowBeacon}></Route>
<Route path="/edits/beacon/:id" component = {EditBeacon}></Route>

</BrowserRouter>, document.getElementById('root'));

// reportWebVitals();
serviceWorker.unregister();
// registerServiceWorker.unregister();
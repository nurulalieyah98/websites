import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import App from './Apps';
import * as serviceWorker from './serviceWorker';
import AddBook from './AddBook';
import EditBook from './EditBook';
import ShowBook from './ShowBook';
import {BrowserRouter, Route} from 'react-router-dom';
ReactDom.render(<BrowserRouter>
<Route exact path="/" component = {App}></Route>
<Route path="/create" component = {AddBook}></Route>
<Route path="/show:id" component = {ShowBook}></Route>
<Route path="/edit:id" component = {EditBook}></Route>

</BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();


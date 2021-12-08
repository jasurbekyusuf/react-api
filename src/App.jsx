import React from 'react';
import {Link,Route,Switch} from "react-router-dom";
import Posts from "./Component/Posts";
import Users from "./Component/Users";
import Todos from "./Component/Todos";
import './main.css'
import OnePost from "./Component/OnePost";

function App(props) {
    return (
        <div className={'container mt-5'}>
            <div className="card">
                <div className="card-body">
                    <h1>Json Placeholder</h1>
                  <Link to={'/posts'}><button className={'btn mx-2 btn-dark'}>Posts</button></Link>
                  <Link to={'/todos'}><button className={'btn mx-2 btn-dark'}>Todos</button></Link>
                  <Link to={'/users'}><button className={'btn mx-2 btn-dark'}>Users</button></Link>
                  <Switch>
                      <Route path={'/posts/:id'} component={OnePost} />
                      <Route path={'/posts'} component={Posts} />
                      <Route path={'/users'} component={Users} />
                      <Route path={'/todos'} component={Todos} />
                  </Switch>
                </div>
            </div>

        </div>
    );
}

export default App;
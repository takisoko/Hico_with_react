import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Counter from './components/Counter';
import { Home } from './components/Home';
import Root from './components/root';

const App = () => {

    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>

            <hr />
        </div>
    );
    
}
export default App;
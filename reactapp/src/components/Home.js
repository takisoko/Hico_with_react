import React, { Component } from 'react';

import Root from './root';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            <div className="conainer">
                <h1>Hello, Hico!</h1>
                <p>This is a project I made based on given requirements</p>
                <p>These are the ways I would do to improve this project:</p>
                
                <ul>
                  <li>Improve the UI (either hire a designer, use a theme...)</li>
                  <li>Add authorization and users</li>
                  <li></li>
                </ul>
                <p></p>
            </div>
        </div>
    );
  }
}

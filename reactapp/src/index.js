//import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Counter from './components/Counter';
import { Home } from './components/Home';
import Root from './components/root';
import reportWebVitals from './reportWebVitals';
import { FetchData } from './components/FetchData';
import { Materials } from './components/Materials/materials';
import { Units } from './components/Units/units';
import { Tasks } from './components/tasks';


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Root />,
        children: [
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'counter',
                element: <Counter />
            },
            {
                path: 'fetchdata',
                element: <FetchData />
            },
            {
                path: 'materials',
                element: <Materials />
            },
            {
                path: 'units',
                element: <Units />
            },
            {
                path: 'tasks',
                element: <Tasks />
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

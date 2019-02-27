import * as dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

dotenv.config();

ReactDOM.render(<App/>, document.getElementById('root'));

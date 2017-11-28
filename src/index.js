import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PhotoTransformerApp from './PhotoTransformerApp/PhotoTransformerApp.container';
import registerServiceWorker from './registerServiceWorker';

registerServiceWorker();
ReactDOM.render(<PhotoTransformerApp />, document.getElementById('root'));

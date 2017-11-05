import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PhotoTransformer from './PhotoTransformerApp/PhotoTransformer.display';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PhotoTransformer />, document.getElementById('root'));
registerServiceWorker();

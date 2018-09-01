import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './HelloWorld.jsx';

ReactDOM.render(
	<div>
		<HelloWorld text="今天就開始學React!Compoennts" />
		<HelloWorld text="今天就開始學React!Compoennts2" />
	</div>,
	document.getElementById('root')
);
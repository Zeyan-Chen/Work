import { CORE } from './script/core.js'
import Promise from 'es6-promise';

const root = ( (root) => {
	if ( typeof root === 'object' && ( root.self === root || root.global === global ) && root ) {
		return root;
	}
} )(self || global || {});

if ( typeof root.Promise === 'undefined' ) {
  root.Promise = Promise.Promise;
}

root.core = CORE;
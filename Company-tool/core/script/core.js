import { _private } from './internal/private.js';

class Module {
	constructor ( obj ) {
		this.original = obj;
		this.edited = obj;
	}
	stringify () {
		this.edited = CORE.stringify(this.edited);
		return this;
	}
	parse () {
		this.edited = CORE.parse(this.edited);
		return this;
	}
};

let CORE = ( object ) => {
	
	if ( object instanceof Module ) {
		return object;
	} else {

	}
	if ( !( object instanceof Module ) ) {
		return new Module(object);
	}
};

let self = CORE;

CORE.VERSION = '0.0.1';

CORE.extend = require('extend');

CORE.stringify = ( obj ) => {
	if ( typeof obj === 'object' ) {
		return JSON.stringify(obj, function (key, value) {
			let fn;
			if ( value instanceof Function || typeof value == 'function' ) {
				fn = value.toString();

				if ( fn.length < 8 || fn.substring(0, 8) !== 'function' ) { //this is ES6 Arrow Function
					return '_NuFrRa_' + fn;
				}
				return fn;
			}
			if (value instanceof RegExp) {
				return '_PxEgEr_' + value;
			}
			return value;
		}).replace(/\s|\\t|\\n|\\r/g, '');
	} else {
		throw new Error('This method requires a object');
		// console.log('This method requires a object!');
	}
};

CORE.parse = ( str, date2obj ) => {
	let iso8061 = date2obj ? /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/ : false;
	if ( typeof str === 'string' ) {
		return JSON.parse(str, function ( key, value ) {
			let prefix;

			if ( typeof value != 'string' ) {
				return value;
			}
			if ( value.length < 8 ) {
				return value;
			}

			prefix = value.substring(0, 8);

			if ( iso8061 && value.match(iso8061) ) {
				return new Date(value);
			}
			if ( prefix === 'function' ) {
				return eval('(' + value + ')');
			}
			if ( prefix === '_PxEgEr_' ) {
				return eval(value.slice(8));
			}
			if ( prefix === '_NuFrRa_' ) {
				return eval(value.slice(8));
			}
			return value;
		});
	} else {
		throw new Error('This method requires a string');
		// console.log('This method requires a string');
	}
};

CORE.clone = ( obj, date2obj ) => {
	return self.parse(self.stringify(obj), date2obj);
};

CORE.cookies = ( key, value, attributes ) => {
	let defaults = {};
	if ( typeof document === 'object' ) {
		return arguments.length === 1 ? self.cookies.get(key) : self.cookies.set(key, value, attributes);
	} else {
		throw new Error('This method requires a `window` with a `document` object, or arguments length must more than 1');
		// console.log('This method requires a `window` with a `document` object, or arguments length must more than 1!');
	}
};

CORE.cookies.set = ( key, value, attributes ) => {
	if ( typeof key === 'string' ) {
		attributes = self.extend(_private.cookies.defaults, attributes);
	    attributes.expires = _private.cookies.getExpiresDate(value === undefined ? -1 : attributes.expires);
	    _private.cookies.document.cookie = _private.cookies.generateCookieString(key, value, attributes);
	    return self.cookies;
	} else {
		throw new Error('First param must be string');
	}
};

CORE.cookies.get = ( key ) => {
	if ( typeof key === 'string' ) {
		if ( _private.cookies.cachedDocumentCookie !== _private.cookies.document.cookie ) {
			_private.cookies.renewCache();
		}
		let value = _private.cookies.cache[_private.cookies.cacheKeyPrefix + key];
		return value === undefined ? undefined : decodeURIComponent(value);
	} else {
		throw new Error('First param must be string');
	}
};

CORE.cookies.getjson = ( key ) => {
	if ( typeof key === 'string' ) {
		return self.parse( self.cookies( key ) );
	} else {
		throw new Error('First param must be string');
	}
};

CORE.cookies.remove = ( key ) => {
	return self.cookies.set(key, undefined);
};

CORE.crosstorage = ( param, option ) => {
	if ( typeof document === 'object' ) {
		if ( typeof param === 'string' ) {
			return new self.crosstorage.client(param, option);
		} else if ( typeof param === 'object' && Array.isArray(param) ) {
			if ( param.every(( ele ) => typeof ele === 'object' && ele.hasOwnProperty('origin')) ) {
				self.crosstorage.hub(param);
			} else {
				throw new Error('Every of array must be object');
			}
		}
	} else {
		throw new Error('This method requires a `window` with a `document` object, or arguments length must more than 1');
		// console.log('This method requires a `window` with a `document` object, or arguments length must more than 1!');
	}
};

CORE.crosstorage.hub = require('cross-storage').CrossStorageHub.init;

CORE.crosstorage.client = require('cross-storage').CrossStorageClient;

CORE.isDate = ( dateString ) => {
	if ( typeof dateString === 'string' ) {
		let D = new Date(dateString);
		return Object.prototype.toString.call(D) === '[object Date]' && !isNaN(D.getTime());
	} else if ( Object.prototype.toString.call(dateString) === '[object Date]' ) {
		return !isNaN(dateString.getTime());
	} else {
		throw new Error('First param must be string or Date object');
	}
};

export { CORE };
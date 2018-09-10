import { CORE } from '../core.js';

let _private = {
	cookies : {
		document: window.document,
		cache: null,
		cacheKeyPrefix: 'cookey.',
		cachedDocumentCookie: null,
		maxExpireDate: new Date('Fri, 31 Dec 9999 23:59:59 UTC'),
		defaults: {
	        path: '/',
	        secure: false
    	},
    	renewCache: () => {
            _private.cookies.cache = _private.cookies.getCacheFromString(_private.cookies.document.cookie);
            _private.cookies.cachedDocumentCookie = _private.cookies.document.cookie;
        },
        generateCookieString: ( key, value, options ) => {

        	key = key.replace(/[^#$&+\^`|]/g, encodeURIComponent);
            key = key.replace(/\(/g, '%28').replace(/\)/g, '%29');
            if ( typeof value === 'object' ) {
            	value = CORE.stringify(value);
            }
            value = (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
            options = options || {};

            var cookieString = key + '=' + value;
            cookieString += options.path ? ';path=' + options.path : '';
            cookieString += options.domain ? ';domain=' + options.domain : '';
            cookieString += options.expires ? ';expires=' + options.expires.toUTCString() : '';
            cookieString += options.secure ? ';secure' : '';

            return cookieString;
        },
        getCacheFromString: ( documentCookie ) => {
        	var cookieCache = {};
            var cookiesArray = documentCookie ? documentCookie.split('; ') : [];

            for (var i = 0; i < cookiesArray.length; i++) {
                var cookieKvp = _private.cookies.getKeyValuePairFromCookieString(cookiesArray[i]);

                if (cookieCache[_private.cookies.cacheKeyPrefix + cookieKvp.key] === undefined) {
                    cookieCache[_private.cookies.cacheKeyPrefix + cookieKvp.key] = cookieKvp.value;
                }
            }

            return cookieCache;
        },
        getKeyValuePairFromCookieString: ( cookieString ) => {
            var separatorIndex = cookieString.indexOf('=');
            separatorIndex = separatorIndex < 0 ? cookieString.length : separatorIndex;
            var key = cookieString.substr(0, separatorIndex);
            var decodedKey;
            try {
                decodedKey = decodeURIComponent(key);
            } catch (e) {
                if (console && typeof console.error === 'function') {
                    console.error('Could not decode cookie with key "' + key + '"', e);
                }
            }
            return {
                key: decodedKey,
                value: cookieString.substr(separatorIndex + 1)
            };
        },
        getExpiresDate: ( expires, now = new Date() ) => {
        	var expiresDays = new Date();
            if ( typeof expires === 'number' ) {
                expires = expires === Infinity ?
                    _private.cookies.maxExpireDate : new Date(now.getTime() + expires * 1000);
            } else if ( typeof expires === 'string' && expires.length < 4 ) {
        		expiresDays.setMilliseconds(expiresDays.getMilliseconds() + parseInt(expires) * 864e+5);
        		expires = expiresDays;
            } else {
        		expires = new Date(expires);
        	}

            if ( expires && !CORE.isDate(expires) ) {
                throw new Error('`expires` parameter cannot be converted to a valid Date instance');
            }

            return expires;
        }
	}
};

export { _private };
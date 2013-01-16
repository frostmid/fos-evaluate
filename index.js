// TODO: Give "memoize" a change

var LRU = require ('lru-cache'),
	cache = LRU ({
		max: 1000,
		maxAge: 1000 * 30
	});

function compile (source, scope) {
	return (function () {
		if (typeof scope == 'object') {
			for (var i in scope) {
				eval ('var ' + i + ' = scope.' + i + ';');
			}
		}

		return eval ('(' + source + ')');
	}) (source);
	
}

module.exports = function (source, scope) {
	var compiled = cache.get (source);

	if (!compiled) {
		compiled = compile (source, scope);
		cache.set (source, compiled);
	}

	return compiled;
};

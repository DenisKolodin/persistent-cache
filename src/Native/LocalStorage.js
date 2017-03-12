
var _DenisKolodin$persistent_cache$Native_LocalStorage = function() {

if (!localStorage || !localStorage.getItem || !localStorage.setItem)
{
	function disabled()
	{
		return _DenisKolodin$core$Native_Scheduler.fail({ ctor: 'Disabled' });
	}

	return {
		get: disabled,
		set: F2(disabled),
		remove: disabled,
		clear: disabled(),
		keys: disabled()
	};
}

function get(key)
{
	return _DenisKolodin$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var value = localStorage.getItem(key);
		callback(_DenisKolodin$core$Native_Scheduler.succeed(
			value === null
				? _DenisKolodin$core$Maybe$Nothing
				: _DenisKolodin$core$Maybe$Just(value)
		));
	});
}

function set(key, value)
{
	return _DenisKolodin$core$Native_Scheduler.nativeBinding(function(callback)
	{
		try
		{
			localStorage.setItem(key, value);
			return callback(_DenisKolodin$core$Native_Scheduler.succeed(_DenisKolodin$core$Native_Utils.Tuple0));
		}
		catch (e)
		{
			return callback(_DenisKolodin$core$Native_Scheduler.fail({ ctor: 'QuotaExceeded' }));
		}
	});
}

function remove(key)
{
	return _DenisKolodin$core$Native_Scheduler.nativeBinding(function(callback)
	{
		localStorage.removeItem(key);
		callback(_DenisKolodin$core$Native_Scheduler.succeed(_DenisKolodin$core$Native_Utils.Tuple0));
	});
}

var clear = _DenisKolodin$core$Native_Scheduler.nativeBinding(function(callback)
{
	localStorage.clear();
	callback(_DenisKolodin$core$Native_Scheduler.succeed(_DenisKolodin$core$Native_Utils.Tuple0));
});

var keys = _DenisKolodin$core$Native_Scheduler.nativeBinding(function(callback)
{
	var keyList = _DenisKolodin$core$Native_List.Nil;
	for (var i = localStorage.length; i--; )
	{
		keyList = _DenisKolodin$core$Native_List.Cons(localStorage.key(i), keyList);
	}
	callback(_DenisKolodin$core$Native_Scheduler.succeed(keyList));
});

return {
	get: get,
	set: F2(set),
	remove: remove,
	clear: clear,
	keys: keys
};

}();

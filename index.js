/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 *
 * to be used in conjonction with jstorage (http://www.jstorage.info/)
 * 
 */

if(typeof define !== 'function')
	var define = require('amdefine')(module);

define(["require", "deep/deep"],function (require, deep)
{
	deep.store.jstorage = deep.store.jstorage || {};
	/**
	 * deep.store.jstorage.Object
	 * @param  {[type]} protocole               (optional)[description]
	 * @param  {[type]} root					(optional)[description]
	 * @param  {[type]} schema                  (optional)[description]
	 * @param  {[type]} options    (optional){ path:{ required string }, TTL:{ time to live (ms) }}
	 */
	deep.store.jstorage.Object = deep.compose.Classes(deep.store.Object,
		function(protocole, root, schema, options){
			options = options || {};
			if(!options.path && !protocole)
				throw deep.errors.Store("jstorage.Object need a path at constructor. please provide a options.path or a protocole.");
			var path = options.path || protocole;
			var current = root || $.jStorage.get(path);
			if(!current)
			{
				current = {};
				$.jStorage.set(path, current, options);
			}
			this.root = current;
			deep.utils.up({
				post:deep.compose.after(function (object, opt) {
					$.jStorage.set(path, this.root, deep.utils.bottom(options, opt));
					return object;
				}),
				put:deep.compose.after(function (object, opt) {
					$.jStorage.set(path, this.root, deep.utils.bottom(options, opt));
					return object;
				}),
				patch:deep.compose.after(function (object, opt) {
					$.jStorage.set(path, this.root, deep.utils.bottom(options, opt));
					return object;
				}),
				del:deep.compose.after(function (object, opt) {
					$.jStorage.set(path, this.root, deep.utils.bottom(options, opt));
					return object;
				})
			}, this);
		},
		{
			flush:function(opt){
				this.root = {};
				$.jStorage.set(path, this.root, opt);
			}
		});
        deep.store.jstorage.Object.create = function(protocole, root, schema)
        {
            return new deep.store.jstorage.Object(protocole, root, schema);
        };
	/**
	 * deep.store.jstorage.Collection
	 * @param  {[type]} protocole                 (optional)[description]
	 * @param  {[type]} collection                (optional)[description]
	 * @param  {[type]} schema                    (optional)[description]
	 * @param  {[type]} options    (optional){ path:{ required string }, TTL:{ time to live (ms) }}
	 */
	deep.store.jstorage.Collection = deep.compose.Classes(deep.store.Collection,
		function(protocole, collection, schema, options){
			options = options || {};
			if(!options.path && !protocole)
				throw deep.errors.Store("jstorage.Collection need a path at constructor. please provide a options.path or a protocole.");
			var path = options.path || protocole;
			var current = collection || $.jStorage.get(path);
			if(!current)
			{
				current = [];
				$.jStorage.set(path, current, options);
			}
			this.collection = current;
			deep.utils.up({
				post:deep.compose.after(function (object, opt) {
					$.jStorage.set(path, this.collection, deep.utils.bottom(options, opt));
					return object;
				}),
				put:deep.compose.after(function (object, opt) {
					$.jStorage.set(path, this.collection, deep.utils.bottom(options, opt));
					return object;
				}),
				patch:deep.compose.after(function (object, opt) {
					$.jStorage.set(path, this.collection, deep.utils.bottom(options, opt));
					return object;
				}),
				del:deep.compose.after(function (object, opt) {
					$.jStorage.set(path, this.collection, deep.utils.bottom(options, opt));
					return object;
				})
			}, this);
		},
		{
			flush:function(opt){
				this.collection = [];
				$.jStorage.set(path, this.collection, opt);
			}
		});
        deep.store.jstorage.Collection.create = function(protocole, collection, schema)
        {
            return new deep.store.jstorage.Collection(protocole, collection, schema);
        };
	//__________________________________________________
	return deep.store.JStorage;
});
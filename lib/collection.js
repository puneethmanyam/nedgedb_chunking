var addon = require('../build/Release/addon');

var cursor = require('./cursor.js');
var convert_find = require('./nosql2sql/convert_find.js');
var convert_insert = require('./nosql2sql/convert_insert.js');
var convert_remove = require('./nosql2sql/convert_remove.js');
var convert_update = require('./nosql2sql/convert_update.js');

var collection = function(tablename,schema){
	this.tablename = tablename;
	this.schema=schema;
}

collection.prototype.find = function(query,list,order,limit,callback) {
	
	if(!query && query!=0){
		var query = {};
	}
	if(!list && list!=0){
		var list = [];
	}
	if(!order && order!=0){
		var order = {};
	}
	if(!limit && limit!=0){
		limit=-1;
	}
	
	query = convert_find(this.tablename,query,list,order,this.schema);
	
	if(callback){
		addon.select(query,limit,function(err, res) {
			if(err == 0 || err == 1 || err == 100) {
				err = 0;
			}
			else {
				err = "ERROR: STATEMENT COULD NOT BE EXECUTED";
			}
			callback(err, JSON.parse(res));
		});
	}
	else{
		var ret_cursor;
		addon.selectSync(query,limit,-1,function(err,res){
			if(err == 0 || err == 1 || err == 100) {
				err = 0;
			}
			else {
				err = "ERROR: STATEMENT COULD NOT BE EXECUTED";
			}
			ret_cursor =  new cursor(err,res);
		});
		return ret_cursor;
	}
}

collection.prototype.findSync = function(query,list,order,limit,chunk_length,callback){
	var ret_cursor;
	if(!query && query!=0){
		var query = {};
	}
	if(!list && list!=0){
		var list = [];
	}
	if(!order && order!=0){
		var order = {};
	}
	if(!limit && limit!=0){
		var limit =-1;
	}
	if(!chunk_length){
		var chunk_length =-1;
	}
	query = convert_find(this.tablename,query,list,order,this.schema);
	if(callback){
		addon.selectSync(query,limit,chunk_length,function(err, res) {
			if(err == 0 || err == 1 || err == 100) {
				err = 0;
			}
			else {
				err = "ERROR: STATEMENT COULD NOT BE EXECUTED";
			}
			callback(err, res);
		});
	}
	else{
		addon.selectSync(query,limit,-1,function(err,res){
			
			if(err == 0 || err == 1 || err == 100) {
				err = 0;
			}
			else {
				err = "ERROR: STATEMENT COULD NOT BE EXECUTED";
			}
			ret_cursor=new cursor(err,res);
		});
		return ret_cursor;
	}
}

collection.prototype.insert = function(record,callback){
	var query = convert_insert(this.tablename,record,this.schema);
	addon.query(query,function(err){
		if(err == 0 || err == 1) {
			err = 0;
		}
		else {
			err = "ERROR: STATEMENT COULD NOT BE EXECUTED";
		}
		if(callback){
			callback(err);
		}
	});
}
collection.prototype.insertSync = function(record,callback){
	var querySync = convert_insert(this.tablename,record,this.schema);
	addon.querySync(query,function(err){
		if(err == 0 || err == 1) {
			err = 0;
		}
		else {
			err = "ERROR: STATEMENT COULD NOT BE EXECUTED";
		}
		if(callback){
			callback(err);
		}
	});
}

collection.prototype.remove = function(query,callback){
	query = convert_remove(this.tablename,query,this.schema);
	addon.query(query,function(err){
		if(err == 0 || err == 1) {
			err = 0;
		}
		else {
			err = "ERROR: STATEMENT COULD NOT BE EXECUTED";
		}
		if(callback){
			callback(err);
		}
	});
}
collection.prototype.removeSync = function(query,callback){
	query = convert_remove(this.tablename,query,this.schema);
	addon.querySync(query,function(err){
		if(err == 0 || err == 1) {
			err = 0;
		}
		else {
			err = "ERROR: STATEMENT COULD NOT BE EXECUTED";
		}
		if(callback){
			callback(err);
		}
	});
}

collection.prototype.update = function(record,query,callback){
	query = convert_update(this.tablename,record,query,this.schema);
	addon.query(query,function(err){
		if(err == 0 || err == 1) {
			err = 0;
		}
		else {
			err = "ERROR: STATEMENT COULD NOT BE EXECUTED";
		}
		if(callback){
			callback(err);
		}
	});
}
collection.prototype.updateSync = function(record,query,callback){
	query = convert_update(this.tablename,record,query,this.schema);
	addon.querySync(query,function(err){
		if(err == 0 || err == 1) {
			err = 0;
		}
		else {
			err = "ERROR: STATEMENT COULD NOT BE EXECUTED";
		}
		if(callback){
			callback(err);
		}
	});
}

module.exports= collection;
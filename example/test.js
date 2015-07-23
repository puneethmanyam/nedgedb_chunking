//Sync Functionallity
var nedgedb = require('nedgedb');

var db = new nedgedb.database("mydsn","pmanyam","","PUB");    //creating a db object with dsn_name="mydsn" username="pmanyam"  and without a password

var records=[];
var collection;

db.connectSync(function(err,res){
	if(err){
		throw err;
	}
	else{
		console.log("\nConnected Successfully");
		collection = db.collection("customer");         //creating a collection object which basically can access the table "customers"
	}
});

console.log("\nconnect is in Sync\n");

/*collection.findSync()  attributes:
	1.query		(Where clause of SQL given in json similar to mongodb)
	2.list		(All the columns that are to be fetched to be given in an array)
	3.order		(Sorted order of the given records to be given in json similat to mongodb)
	4.limit		(SQL_limit)
	5.chunk_length (Not supported for the async version of sync)
	6..callback  (A cursor to records is returned if the callback is not used)
*/

collection.findSync({},[],{},5,3,function(err,res){
	console.log(res.length);
	records.push.apply(records,res);
});
console.log("Total number of records Received = ",records.length);

console.log("\nFind is in Sync\n");

db.disconnectSync(function(err,res){
	if(err){
		throw err;
	}
	else{
		console.log("Disconnected Successfully\n");
	}
});

console.log("Disconnect is in Sync\n");
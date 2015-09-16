var async = require('async');
// var timer = require('./timer');
var faker = require('Faker');

var self = {};

self.insert = function(dataSize,done){
	var mysql = require('mq-node')({
		host     : 'localhost',
		user     : 'root',
		password : '',
	});

	var run = [];

	run.push(function(callback){
		mysql.connection.connect(function(err){
			callback();
		});
	})

	run.push(function(callback){
		mysql.query('CREATE DATABASE IF NOT EXISTS test',function(data,err){
			callback();
		});
	})

	run.push(function(callback){
		mysql.connection.changeUser({database:'test'},function(data,err){
			callback();
		});
	})

	run.push(function(callback){
		mysql.query('DROP TABLE test',function(data,err){
			callback();
		});
	});

	run.push(function(callback){
		mysql.query('DROP TABLE team',function(data,err){
			callback();
		});
	});

	run.push(function(callback){
		mysql.query('CREATE TABLE IF NOT EXISTS test ('+
			'id int(11) NOT NULL AUTO_INCREMENT,'+
			'player varchar(32) NOT NULL,'+
			'score int(11) NOT NULL,'+
			'email varchar(64) NOT NULL,'+
			'team int(10) unsigned NOT NULL,'+
			'PRIMARY KEY (id),'+
			'KEY team (team)'+
		')',function(data,err){
			callback();
		});
	});

	run.push(function(callback){
		mysql.query('CREATE TABLE IF NOT EXISTS team ('+
			'id int(11) NOT NULL AUTO_INCREMENT,'+
			'name varchar(32) NOT NULL,'+
			'country varchar(32) NOT NULL,'+
			'city varchar(32) NOT NULL,'+
			'PRIMARY KEY (id)'+
		')',function(data,err){
			callback();
		});
	});

	for(var i=0;i<dataSize;i++){
		run.push(function(callback){
			mysql.insert('test',{
				player:faker.Name.findName(),
				email:faker.Internet.email(),
				team:Math.floor(Math.random()*dataSize),
				score:Math.floor(Math.random()*1000)
			},function(data,err){
				callback();
			});
		});

		run.push(function(callback){
			mysql.insert('team',{
				city:faker.Address.city(),
				country:faker.Address.ukCountry(),
				name:faker.Company.companyName().split(" ")[0].split(",")[0]
			},function(data,err){
				callback();
			});
		});
	}

	console.time('mysql insert')
	async.series(run,function(err,data){
		console.timeEnd('mysql insert');
		mysql.end();
		if(done) done();
	});
}

self.find = function(dataSize,done){
	var mysql = require('mq-node')({
		host     : 'localhost',
		user     : 'root',
		password : '',
	});

	var run = [];

	run.push(function(callback){
		mysql.connection.changeUser({database:'test'},function(data,err){
			callback();
		});
	});

	run.push(function(callback){
		mysql.select({
			from:['test as t1','team as t2'],
			cols:['player','name'],
			where:'t2.id=t1.team'
		},function(data,err){
			// for(var i in data) console.log(data[i]['player']+" : "+data[i]['name'])
			for(var i in data) if(!data[i]['name']) console.log('mysql error : team no name');
			callback();
		})
	});

	console.time('mysql select')
	async.series(run,function(err,data){
		console.timeEnd('mysql select');
		mysql.end();
		if(done) done();
	});
}

module.exports = function(type,dataSize,done){
	return self[type](dataSize,done);
}

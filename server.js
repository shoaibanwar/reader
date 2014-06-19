var static = require('node-static');
var fs = require('fs');
var sys = require('sys');
var http = require('http');
var file = new(static.Server)();
var app = http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(2013);

var fileName = 'assets/log_file.txt';

var io = require('socket.io').listen(app);
io.sockets.on('connection', function (socket){
	
	function log(){
		var array = [">>> "];
	  for (var i = 0; i < arguments.length; i++) {
	  	array.push(arguments[i]);
	  }
	    socket.emit('log', array);
	}

	socket.on('size', function(){
		fs.stat(fileName, function(err, stat) {
		  if(err) {
		    // handle error
		  }
		  console.log(stat.size); 
		  socket.emit('size', stat.size);   
		});
	});

	socket.on('read', function (start, end) {
		if(start == null || end == null){
			log("wrong values received");
		}else{		
			options = { start:start, end: end,autoClose:false }; 
			console.log(start);
			console.log(end);

			var stream = fs.createReadStream(fileName, options);
			stream.on('data', function(data){
				//sys.puts(data);
				//console.log(data.toString('utf8').replace(/\n/g, '<br>'));
				socket.emit('reading', data.toString('utf8').replace(/\n/g, '<br>'));
			});	

			stream.on('end', function(){
				socket.emit('endreading');
			});
		}
	});

});


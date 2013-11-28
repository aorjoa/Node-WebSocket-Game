var io = require('socket.io').listen(8080);
var lucky_number;
var client = new Array();
io.sockets.on('connection', function(socket) {
		socket.on('newPlayer', function(Cname) {
			var unique = true;
			var clientData = {
				clientName:Cname,
				clientPoint:0
			}
		for(var i=0;i<client.length;i++){
			if(client[i].clientName==Cname){
				unique = false;
				clientData = client[i];
				break;
			}
		}
	if(unique==true){
	 	client[client.length] = clientData;
	}
        io.sockets.emit('setUserInfo', clientData);
	});

    socket.on('getNumber', function() {
        lucky_number = Math.floor((Math.random()*10));
        io.sockets.emit('getLuckyNumber', {lucky: lucky_number});
    });

    socket.on('addPoint', function(Cname) {
    	for(var i=0;i<client.length;i++){
			if(client[i].clientName==Cname){
				client[i].clientPoint++;
				io.sockets.emit('updatePoint',client[i].clientPoint)
				break;
			}
		}
    });

    socket.on('disconnect', function() {
        io.sockets.emit('end');
    });

    socket.on('sa', function(printMyName) {
        console.log('Do ', printMyName);
    });
});

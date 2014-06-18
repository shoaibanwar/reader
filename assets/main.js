var socket = io.connect();
var start = 0;
var limit = 10024; //MB
var end = start+limit;
var fileSize;
var contentLen = 3;

socket.on('size', function (data){
  	fileSize = data;
});

socket.on('reading', function (data){
  	//console.log(data);
	innerContent = $('#content ch');
	if(!innerContent.hasClass(start)){
		if(start > Number(innerContent.last().attr('class'))){
			$('#content').append('<ch class="'+start+'">'+data+'</ch>');
		}
		else{
			$('#content').prepend('<ch class="'+start+'">'+data+'</ch>');
		}		
	}
	console.info(innerContent.length);
	if(!innerContent.length)
		calculateProgress(Number($('#content ch').attr('class')), Number($('#content ch').attr('class')));
	else
		calculateProgress(Number(innerContent.first().attr('class')), Number(innerContent.last().attr('class')));
		
});

socket.on('endreading', function (){
  	console.log('File completed');
});

socket.on('log', function (array){
  console.log.apply(console, array);
});

calculateProgress = function(a, b){
	console.info(a);
	console.info(b);
	console.info(fileSize)
	$('#info').html("Displying Content in range of "+((a/fileSize)*100)+"% - "+((b/fileSize)*100)+"%");
}

readMore = function(start){
	console.info("read more");
	end = start + limit;
	socket.emit('read', start, end);		
}


$(function(){
	socket.emit('size');
	readMore(start);	
	$("#content").scroll(function() {
		if($(this).scrollTop() == 0){
			innerContent = $('#content ch');
			start = innerContent.first().attr('class');
			if(start != 0){ 
				start = start - limit;
				readMore(start); 
				if(innerContent.length > contentLen) {innerContent.last().remove();}
				$(this).scrollTop(60);
			}
		} 
	    	else if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
			innerContent = $('#content ch'); 			
			start = Number(innerContent.last().attr('class')) + limit ;
			readMore(start); 
			if(innerContent.length > contentLen) {innerContent.first().remove();}
	    	}
	});

	$('#controleEl').change(function(){
		start = Number(Number($(this).val())*fileSize/100);
		$('#content').html("");
		readMore(start);

	})
});


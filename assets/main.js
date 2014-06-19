var socket = io.connect();
var start = 0;
var limit = 65536; //1048576(1mb); 10240(10KB) //BYTES //65536
var end = start+limit;
var fileSize;
var contentLen = 100;

socket.on('size', function (data){
  	fileSize = data;
});

socket.on('reading', function (data){
  	console.log(data);
	innerContent = $('#content ch');
	//if(innerContent.hasClass(start)){
		//$('#content .'+start).append(data);
	//}else{
		if(start >= Number(innerContent.last().attr('class'))){
			$('#content').append('<ch class="'+start+'">'+data+'</ch>');
		}
		else{
			$('#content').prepend('<ch class="'+start+'">'+data+'</ch>');
			$('#content').scrollTop(60);
		}		
	//}
	console.info(innerContent.length);
	if(!innerContent.length)
		calculateProgress(Number($('#content ch').attr('class')), Number($('#content ch').attr('class'))+limit);
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
	$('#info').html("Displaying Content in range of <gr>"+((a/fileSize)*100).toPrecision(6)+"% - "+((b/fileSize)*100).toPrecision(6)+"%<gr>");
}

readMore = function(start){
	console.info("read more");
	end = start + limit - 1;
	socket.emit('read', start, end);		
}

getFirst = function(){
	if($('#content ch').length == 0)
		return Number($('#content ch').attr('class'));
	else
		return Number($('#content ch').first().attr('class'));
}

getLast = function(){
	if($('#content ch').length == 0)
		return Number($('#content ch').attr('class'));
	else
		return Number($('#content ch').last().attr('class'));

}


$(function(){
	socket.emit('size');
	readMore(start);	
	$("#content").scroll(function() {
		if($(this).scrollTop() == 0){
			innerContent = $('#content ch');
			start = getFirst();
			if(start != 0){ 
				start = start - limit;
				readMore(start); 
				if(innerContent.length > contentLen) {innerContent.last().remove();}				
			}
		} 
	    	else if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
			innerContent = $('#content ch'); 			
			start = getLast() + limit ;
			readMore(start); 
			if(innerContent.length > contentLen) {innerContent.first().remove();}
	    	}
	});

	$('#controleEl').change(function(){
		start = Number(Number($(this).val())*fileSize/100);
		console.info("jump start: "+start);
		$('#content').html("");
		readMore(start);

	})
});


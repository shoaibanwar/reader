reader
======

##Overview

Application reads large text file and display in the UI

## Prerequisites

git

Python

Node.js

socket.io

## Deployment

clone the application using following command

"git clone https://github.com/shoaibanwar/reader.git"

run "create_log_file.py" file to create sample text file names "log_text.txt"

go to the code directory from terminal

execute follwoing command to install dependencies

"npm install"

then execute following command to run node.js server

node server.js

go to web browser and write "http://localhost:2013" to view the appliation


##Running Application

Apllication loads a small text at a time in the UI

Scroll down to load more text, and scroll up to load previous text.

It keeps around 900000 lines in the UI at a time and loads around 850 new lines each time and remove oldest 800 lines with the addition of new lines.

there is also notification text to inform user about the position of file

you can also jump to any part of file using dropdown.


## Code Overview
	readMore = function(start){
		if(!isNaN(start)){
			end = start + limit - 1;
			socket.emit('read', start, end);
		}		
	}

	This function is called with each scroll, start and end byte is sent to the socket read event
	server returns the content which is handled in socket reading event

	socket.on('reading', function (data){
		innerContent = $('#content ch');

		if(start >= Number(innerContent.last().attr('class'))){
			$('#content').append('<ch class="'+start+'">'+data+'</ch>');
		}
		else{
			$('#content').prepend('<ch class="'+start+'">'+data+'</ch>');
			$('#content').scrollTop(60);
		}		

		if(!innerContent.length)
			calculateProgress(Number($('#content ch').attr('class')), Number($('#content ch').attr('class'))+limit);
		else
			calculateProgress(Number(innerContent.first().attr('class')), Number(innerContent.last().attr('class')));
		
	});

	this method handles if content is to be displayed at end of previous content or before it.
	


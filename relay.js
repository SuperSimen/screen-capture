window.addEventListener('message', function(event) {
	var message = event.data.screenCapture;

	if (message && !message.reply) {
		var reply = {
			reply: true,
			type: message.type
		};

		if (message.type === 'get') {
			chrome.runtime.sendMessage('getMediaSourceId', function(id) {
				reply.id = id;
				sendMessage(reply);
			});
		}
		else if (message.type === 'ping') {
			sendMessage(reply);
		}
		else {
			reply.error = 'Received message did not follow protocol';
			sendMessage(reply);
		}
	}

	function sendMessage(message) {
		window.postMessage({screenCapture: message}, event.origin);
	}

});


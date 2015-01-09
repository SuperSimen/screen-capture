screen-capture
==============

Google Chrome extension that uses the [Desktop Capture API](https://developer.chrome.com/extensions/desktopCapture) to access a media stream of the screen.

To install extension in Google Chrome, open chrome:extensions in the address bar. Then drag and drop the screen-capture.crx file into Google Chrome.


To interact with the extension send a message using `window.postMessage`.

```shell
window.addEventListener('message', function(event) {
	var sourceId = event.data.screenCapture.id;
	console.log(sourceId);
});

var message = {
	screenCapture: {
		type: 'get',
	}
};

window.postMessage(message, '*');
```

Then use the media source id received from the extension to access the media stream.

```shell
navigator.getUserMedia(
	{
		//Constraints
		audio: false,
		video: {
			mandatory: {
				chromeMediaSource: "desktop",
				chromeMediaSourceId: sourceId,
			},
		}
	},
	function(stream) {
		//Success callback
		console.log('got stream: ' + stream);
	},
	function(error) {
		//Error callback
		console.error(error);
	}
);
```

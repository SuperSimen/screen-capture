chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message === 'getMediaSourceId') {
		chrome.desktopCapture.chooseDesktopMedia(
			["screen", "window"],
			sender.tab,
			function(id) {
				sendResponse(id);
			}
		);
	}

	return true;
});

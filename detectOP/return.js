function getInfoAndReturn(){
	var el = document.getElementById('openpublish-detect-answer');
	if(!el){ return; }
	
		var ans = parseInt(el.value);
		var answer = { drupal : (ans > 0), op : (ans > 1) };
		chrome.extension.sendRequest(answer, function(response){});
	
}

if(document.getElementById('openpublish-detect-answer')){
	getInfoAndReturn();
} else {
	var count = 5;
	var intv = setInterval(function(){
		if(document.getElementById('openpublish-detect-answer') || !--count){
			window.clearInterval(intv);
			getInfoAndReturn();
		}
	}, 50);
}
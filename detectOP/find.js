function searchLinksAndSource(){
	var links = document.getElementsByTagName('link');
	var scripts = document.getElementsByTagName('script');
	var ll = links.length; var sl = scripts.length;
	
	while(ll--){
		if(links[ll].href.indexOf('modules/openpublish_core') > -1){
			return true;
		}
		if(links[ll].href.indexOf('themes/openpublish') > -1){
           return true;
		}
	}
	while(sl--){
		if(scripts[sl].src.indexOf('modules/openpublish') > -1){
			return true;
		}
	}
	
	if(document.getElementById('op-content') && document.getElementById('op-content').parentNode.id == 'container'){
		return true;
	}
	
	return false;
}

function checkAllCss(){
    var els = document.getElementsByTagName('*');
    var l = els.length;
    while(l--){
        var back = getComputedStyle(els[l]).backgroundImage;
        if(back.indexOf('modules/openpublish_') >= 0 || back.indexOf('themes/openpublish_') >= 0){
            return true;
        }
    }
    return false;
}

function doWhenReady(){
	var ans = document.getElementById('openpublish-detect-answer');
	ans.value = '0';
	if(document.URL.indexOf('tnr.com') > -1){ //we built it using op but its an old release and extremely customized
		ans.value = '2'
	}
	else if(window.Drupal && window.Drupal.behaviors && window.Drupal.settings){
	   
	  if(window.Drupal.behaviors.openpublish_core || window.Drupal.behaviors.openpublish_menu){
	    ans.value = '2';
	  } else if (searchLinksAndSource() || checkAllCss()){
		ans.value = '2';
	  } else {
		 ans.value = '1';
	  }
	}
	
}

function run() {
	if(document.readyState == 'complete' ){
		doWhenReady();
	} else {
		var count = 0;
		var intv = setInterval(function(){
			if(document.readyState == 'complete' || ++count > 3){
				window.clearInterval(intv);
				doWhenReady();
			}
		}, 50);
	}
}

run();

//This isn't quite implemented in the rest of the plugin
function setTrigger() {
	var trigger = document.createElement('input');
	trigger.type = 'hidden';
	trigger.name = 'detectOPTrigger';
	trigger.id = 'detectOPTrigger';
	
	trigger.onchange = run;
	
	document.body.appendChild(trigger);
	
	var ans = document.createElement('input');
	ans.type = 'hidden';
	ans.id = 'openpublish-detect-answer';
	ans.style.display = 'none';
	
	document.body.appendChild(ans);
}

//setTrigger();

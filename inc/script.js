var FILTER_DEPTH = true;
var COMPACT_DEPTH = 1;

// from http://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function getlinkinfo(should_proceed, text, url, icon, replace_enabled) {
	if(!should_proceed) return '';
	if(replace_enabled) url = url.replaceAll(' ', '').replaceAll('-', '');
	return '<br/><i class="fa '+icon+'"></i>&nbsp;<span onClick="window.open(\''+url+'\');">'+text+'</span>';
}

function getparentnodeinfo(parent, iscompactview) {
	var res = '';
	var link = '?';
	if(iscompactview) link = '?'+(((parent.id == '') || (parent.id == undefined)) ? '' : parent.id);
	res += '<a class="node" href="'+link+'" onClick="window.location = \''+link+'\'; location.reload();">';
	res += ((parent.contacts.facebookid == "" || parent.contacts.facebookid == undefined) ? '' : '<img class="avatar" src="http://graph.facebook.com/'+parent.contacts.facebookid+'/picture"/><br/><br/>'); // see https://www.graphsearcher.com
	res += '<h3>'+parent.name+' '+parent.surname+'</h3>';
	res += ((parent.location.country == "" || parent.location.country == undefined) ? '' : '<br/><span onClick="window.open(\'http://maps.google.com/?q='+((parent.location.city == "" || parent.location.city == undefined) ? '' : parent.location.city.replaceAll(' ', '+')+',+')+parent.location.country.replaceAll(' ', '+')+'\');"><i class="fa fa-location-arrow"></i>&nbsp;'+((parent.location.city == "" || parent.location.city == undefined) ? '' : parent.location.city+', ')+parent.location.country+'</span><br/>');
	res += ((parent.birthdate == "" || parent.birthdate == undefined) ? '' : '<br/><i class="fa fa-birthday-cake"></i>&nbsp;'+parent.birthdate+((parent.deathdate == "") ? '' : '&nbsp;&#x271d;&nbsp;'+parent.deathdate)+'<br/>');
	var d;
	d = parent.contacts.phone; res += getlinkinfo(d!=""&&d!=undefined, d, 'tel:'+d, 'fa-phone', true);
	d = parent.contacts.whatsapp; res += getlinkinfo(d!=""&&d!=undefined, d, 'whatsapp://'+d, 'fa-whatsapp', true);
	d = parent.contacts.facebook; res += getlinkinfo(d!=""&&d!=undefined, d, 'https://www.facebook.com/'+d, 'fa-facebook', false);
	d = parent.contacts.twitter; res += getlinkinfo(d!=""&&d!=undefined, '@'+d, 'https://twitter.com/'+d, 'fa-twitter', false);
	d = parent.contacts.email; res += getlinkinfo(d!=""&&d!=undefined, d, 'mailto://'+d, 'fa-envelope-o', false);
	res += '</a>';
	return res;
}

function getnodesex(parent) {
	var sex = parent.sex.toLowerCase();
	if((sex == 'male') || (sex == 'female')) return sex;
	return '';
}

function getsubtree(parent, iscompactview, level) {
	if((FILTER_DEPTH) && (iscompactview) && (level > COMPACT_DEPTH)) return '';
	var res = '';
	res += '<li class="'+getnodesex(parent)+'">';
	res +=   getparentnodeinfo(parent, iscompactview);
	if(parent.sons.length > 0) {
		res +=   '<ul>';
		for(var i=0; i<parent.sons.length; i++) {
			var son = parent.sons[i];
			res += getsubtree(son, iscompactview, level+1);
		}
		res +=   '</ul>';
	}
	res += '</li>';
	return res;
}

function getfilteredtree(parent, shortcut) {
	if((shortcut == '') || (parent.id == shortcut)) return parent;
	for(var i=0; i<parent.sons.length; i++) {
		var son = parent.sons[i];
		var s = getfilteredtree(son, shortcut);
		if(s != '') return s;
	}
	return '';
}

function gettree(parent) {
	// applying filters
	var shortcut = '';
	var i = window.location.href.indexOf('?');
	if(i >= 0) {
		shortcut = window.location.href.substring(i+1);
	}
	parent = getfilteredtree(parent, shortcut);
	// returning result
	var res = '';
	res += '<div class="tree">';
	res +=   '<ul>';
	res +=      getsubtree(parent, shortcut == '', 0);
	res +=   '</ul>';
	res += '</div>';
	return res;
}

function loadtree(data) {
	var title = data.title+' Family';
	document.title = title;
	var treehtml = gettree(data.parent);
	$('#tree').html(treehtml);
}

function loaddata() {
	$.ajax({
		dataType: "json",
		url: "data.json",
		success: loadtree
	});
}

$(document).ready(loaddata);

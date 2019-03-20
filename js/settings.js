// {
// 	var fps_limit, firing_zone;
// }

// var requestURL = 'https://hostrogru.000webhostapp.com/LieStar/settings.json';
// var request = new XMLHttpRequest();

// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();

// request.onload = function() {
//   var settingsObj = request.response;
//   install_settings(settingsObj);
// }

// function install_settings(jsonObj) {
// 	for (var key in jsonObj) {
// 		alert(jsonObj[key]);
// 	}
// }
var fps_limit = 60;
var firing_zone = 1.5;
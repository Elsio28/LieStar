{
	principal_panel.style.top = document.documentElement.clientHeight/4 - 100;
	principal_panel.style.height = document.documentElement.clientHeight/2;
}
function over_play(active) {
	if (active) {
		var coords = play_panel.getBoundingClientRect();
		play_text.style.transform = "translate("+(coords.left+35)+"px, "+(coords.top+35)+"px)";
		play_text.style.display = "block";
		play_text.style.opacity = 1;
	} else {
		play_text.style.opacity = 0;
	}
}
function over_play_exit(active) {
	if (active) {
		var coords = play_exit.getBoundingClientRect();
		play_exit_text.style.transform = "translate("+(coords.left+65)+"px, "+(coords.top+1000+35)+"px)";
		play_exit_text.style.display = "block";
		play_exit_text.style.opacity = 1;
	} else {
		play_exit_text.style.opacity = 0;
	}
}
function over_settings(active) {
	if (active) {
		var coords = settings_panel.getBoundingClientRect();
		settings_text.style.transform = "translate("+(coords.left+35)+"px, "+(coords.top+35)+"px)";
		settings_text.style.display = "block";
		settings_text.style.opacity = 1;
	} else {
		settings_text.style.opacity = 0;
	}
}
function over_settings_exit(active) {
	if (active) {
		var coords = settings_exit.getBoundingClientRect();
		settings_exit_text.style.transform = "translate("+(coords.left+55)+"px, "+(coords.top-1000+35)+"px)";
		settings_exit_text.style.display = "block";
		settings_exit_text.style.opacity = 1;
	} else {
		settings_exit_text.style.opacity = 0;
	}
}

function up_to_missions(active) {
	if (active) {
		principal_panel.style.transform = "translateY(1000px)";
		principal_title.style.transform = "translateY(1000px)";

		play_exit.style.transform = "translateY("+document.documentElement.clientHeight+"px)";
		missions.style.transform = "translate("+(document.documentElement.clientWidth/2-600/2)+"px, 1050px)";

		missions.style.opacity = 1;
		play_exit.style.opacity = 1;
	} else {
		principal_panel.style.transform = "translateY(0px)";
		principal_title.style.transform = "translateY(0px)";

		play_exit.style.transform = "translateY(0px)";
		missions.style.transform = "translate(0px, 0px)";

		missions.style.opacity = 0;
		play_exit.style.opacity = 0;
	}
}

function down_to_settings(active) {
	if (active) {
		principal_panel.style.transform = "translateY(-1000px)";
		principal_title.style.transform = "translateY(-1000px)";

		settings_exit.style.transform = "translateY(-1000px)";
		settings.style.transform = "translate("+(document.documentElement.clientWidth/2-300/2)+"px, -950px)";

		settings.style.opacity = 1;
		settings_exit.style.opacity = 1;
	} else {
		principal_panel.style.transform = "translateY(0px)";
		principal_title.style.transform = "translateY(0px)";

		settings_exit.style.transform = "translateY(0px)";
		settings.style.transform = "translate(0px, 0px)";

		settings.style.opacity = 0;
		settings_exit.style.opacity = 0;
	}
}
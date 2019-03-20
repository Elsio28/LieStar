	var first_block = document.createElement('div');
	inform.appendChild(first_block);
	var second_block = document.createElement('div');
	inform.appendChild(second_block);
	
	var i = 2;
	function update_by_text(string) {
		if (i == 1) {
			i=2;
			inform.removeChild(second_block);
			first_block.style.opacity = 0;
			first_block.style.transform = "translateY("+ document.documentElement.clientHeight +"px)";
	
			second_block = document.createElement('div');
			inform.insertBefore(second_block, inform.firstChild);
			second_block.className = "new_block";
			second_block.innerHTML = string;
			setTimeout("second_block.style.transform = \"translateY(100px)\";", 30);
			setTimeout("second_block.style.opacity = 1;", 50);
			setTimeout("second_block.style.transition = 5+\"s\";", 100);
	
		} else if (i == 2) {
			i=1;
			inform.removeChild(first_block);
			second_block.style.opacity = 0;
			second_block.style.transform = "translateY("+ document.documentElement.clientHeight +"px)";
	
			first_block = document.createElement('div');
			inform.insertBefore(first_block, inform.firstChild);
			first_block.className = "new_block";
			
			first_block.innerHTML = string;
			setTimeout("first_block.style.transform = \"translateY(100px)\";", 30);
			setTimeout("first_block.style.opacity = 1;", 50);
			setTimeout("first_block.style.transition = 5+\"s\";", 100);
		}
	}
{
	ships.ship.max_speed = 0.001;
}
	// setTimeout(add_text, 1000, "LieStar");
	{
		setTimeout(update_by_text, 1000, "<h3>Welcome to the LieStar!</h3>");
		setTimeout(update_by_text, 5000, "<h3>Tutorial</h3>For beginnings you should go through a little training...<br>Recommendation: before starting the game, press \"F11\" or reduce the scale to 80%.");
		setTimeout(function run() {
			ships.ship.max_speed = 5;
			update_by_text("<h3>Moving</h3>Move the mouse around the screen. Your ship will follow the cursor. It is worth remembering about inertia: the ship cannot instantly stop or turn around.<br>Pressing the spacebar you activate the afterburner. Use it to quickly move in a straight line.");
		}, 15000);
		setTimeout(function run() {
			document.body.onmousedown = function (event) {
				fire(event, true);
			}
			document.body.onmouseup = function (event) {
				fire(event, false);
			}
			document.body.oncontextmenu= function () {
				pulsar_launch(); return false;
			} 
			ships.ship.max_speed = 5;
			update_by_text("<h3>Shooting</h3>Each type of ship has its own weapon mounted on it. Now your ship is a cruiser, equipped with a double-laser cannon and a light pulsator.<br><div id=\"mouse_click\"></div>");
		}, 35000);
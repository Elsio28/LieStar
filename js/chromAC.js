var timerTick = setTimeout(function run() {
  onTick();
  setTimeout(run, 1000/fps_limit);
}, 1000/fps_limit);

function onTick() {
	// statisticate();
	
	for(var key in ships){
		ships[key].move();
	}
	for(var key in shells){
		shells[key].move();
	}
	for(var key in pulsars){
		pulsars[key].move();
	}
	for(var key in enemies){
		enemies[key].move();
	}
	for(var key in void_shells){
		void_shells[key].move();
	}
	for(var key in void_pulsars){
		void_pulsars[key].move();
	}
	possibility_collision();
	for(var key in explosions){
		explosions[key].evolve();
	}
}

{
spaceship.style.width = ship_width;
spaceship.style.height = ship_height;
}

var cursor = {
	move: function(evt){
		this.x = evt.clientX;
		this.y = evt.clientY;

		var vec = new Victor(evt.clientX-ships.ship.left-ship_width/2, evt.clientY-ships.ship.top-ship_height/2);
		ships.ship.acceleration = vec.multiply(Force);
	},
}

// var ticks = 0;
// var seconds = 0;
function statisticate() {
	// ticks++;
	// if (ticks%10==0) {seconds++;}
	statistic.innerHTML = damage_shell_done + " " + damage_shell_taken + "<br>" + damage_pulsar_done + " " + damage_pulsar_taken + "<br>" + toStringFancy(ships.ship.speed)+ "<br>" + toStringFancy(ships.ship.acceleration);
}

var afterburner_bool = true;
function keyboard_signal(evt) {
	if (evt.keyCode == 112) {
		alert("PAUSE... Press 'enter' to start");
		clearInterval(timerFire);
	}
	if (evt.keyCode == 115) {
		enemy_spawn("laser");
	}
	if (evt.keyCode == 97) {
		enemy_spawn("pulsar");
	}
	if (evt.keyCode == 100) {
		enemy_spawn("defender");
	}
	if (evt.keyCode == 107) {
		alert(document.documentElement.clientWidth + " " + document.documentElement.clientHeight);
	}
	if (evt.keyCode == 32 && afterburner_bool) {
		afterburner_bool = false;
		afterburner(1000);
	}
}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
	// randomizer
}
function getRandomInt(min, max) {
  		return Math.floor(Math.random() * (max - min)) + min;
  		// integer randomizer
}
function toStringFancy(obj) {
	if (obj.hasOwnProperty("x") && obj.hasOwnProperty("y")) {
		return (obj.x || 0).toFixed(2) + ", " + (obj.y || 0).toFixed(2);
	} else{
		return "null";
	}
};
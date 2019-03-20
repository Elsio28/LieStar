var damage_shell_done = 0;
var damage_pulsar_done = 0;

var damage_shell_taken = 0;
var damage_pulsar_taken = 0;

function possibility_collision() {
	if (coincidence(shells, enemies, 0)) {
		damage_shell_done++;
		enemies[coincidence_result[1]].treatment(1, "shell");
		exploser("laser", coincidence_result[0]);
		coincidence(shells, enemies, 0);
	}
	if (coincidence(pulsars, enemies, 0.5)) {
		damage_pulsar_done++;
		enemies[coincidence_result[1]].treatment(3, "pulsar");
		exploser("pulsar", coincidence_result[0]);
		coincidence(pulsars, enemies, 0.5);
	}
	if (coincidence(void_shells, ships, 0)) {
		damage_shell_taken++;
		exploser("void_laser", coincidence_result[0]);
		ships[coincidence_result[1]].treatment(1, "shell");
		coincidence(void_shells, ships, 0);
	}
	if (coincidence(void_pulsars, ships, 1)) {
		damage_pulsar_taken++;
		ships[coincidence_result[1]].treatment(3, "pulsar");
		exploser("void_pulsar", coincidence_result[0]);
		coincidence(void_pulsars, ships, 1);
	}
}

var coincidence_result = [];
function coincidence(obj, target_obj, accuracy) {
	for(var key1 in obj){
		for(var key2 in target_obj){
			var target_edges = orientation(target_obj, key2);
			var edges = orientation(obj, key1);
			// console.log(target_edges, edges);
			if (
				edges[0] <= target_edges[0] &&
				edges[1] <= target_edges[1] &&
				edges[2] >= target_edges[2] &&
				edges[3] >= target_edges[3]
			)
			{
				// console.log(target_edges, edges);
				// alert('msg');
				coincidence_result = [key1, key2];
				return true;
			}
		}
	}
}
function orientation(obj, key){
	var dots = [];
	dots[0] = obj[key].rotate_vector(new Victor(obj[key].left, obj[key].top));
	dots[1] = obj[key].rotate_vector(new Victor(obj[key].left + obj[key].width, [key].top));
	dots[2] = obj[key].rotate_vector(new Victor(obj[key].left + obj[key].width, [key].top + obj[key].height));
	dots[3] = obj[key].rotate_vector(new Victor(obj[key].left, obj[key].top + obj[key].height));

	var edges = [];
	edges[0] = Math.min(dots[0].y, dots[1].y, dots[2].y, dots[3].y);
	edges[1] = Math.max(dots[0].x, dots[1].x, dots[2].x, dots[3].x);
	edges[2] = Math.max(dots[0].y, dots[1].y, dots[2].y, dots[3].y);
	edges[3] = Math.min(dots[0].x, dots[1].x, dots[2].x, dots[3].x);

		dot1.style.top=edges[0] + "px";
		dot2.style.left=edges[1] + "px";
		dot3.style.top=edges[2] + "px";
		dot4.style.left=edges[3] + "px";
	return edges;
}

var explosions = {};
var counter_explosions = 0;
function exploser(type, shell_number) {
	var explosion = document.createElement('div');
	space.appendChild(explosion);
	explosion.className = 'explosion';
	if (type == "laser" || type == "void_laser") {
		explosion.style.background = "url(\'../img/explosions/fire/explosion_"+ getRandomInt(1, 6) +".png\')";
	} else if (type == "pulsar" || type == "void_pulsar"){
		explosion.style.background = "url(\'../img/explosions/powerful/explosion_"+ getRandomInt(1, 3) +".png\')";
	}
	else {
		explosion.style.background = "url(\'../img/explosions/light-ray/explosion_"+ getRandomInt(1, 3) +".png\')";
	}
	explosions[counter_explosions] = new Explosion(counter_explosions, explosion, shell_number, type);
	explosions[counter_explosions].starting();
	
	counter_explosions++;
}
function Explosion(number, explosion, shell_number, type) {
	this.number = number;
	this.explosion = explosion;
	this.phase = 0;
	this.phase_tick = 0;
	this.type = type;
	this.starting = function () {
		if (this.type == "laser") {
			this.explosion.style.transition = 2 + "s";
			this.explosion.style.width = 75;
			this.explosion.style.height = 75;
			this.top = shells[shell_number].top + shell_height/2 - 75/2;
			this.left = shells[shell_number].left + shell_width/2 - 75/2;
		} else if (this.type == "void_laser"){
			this.explosion.style.transition = 2 + "s";
			this.explosion.style.width = 75;
			this.explosion.style.height = 75;
			this.top =void_shells[shell_number].top + void_shell_height/2 - 75/2;
			this.left =void_shells[shell_number].left + void_shell_width/2 - 75/2;
		} else if (this.type == "pulsar"){
			this.explosion.style.transition = 3 + "s";
			this.explosion.style.width = 150;
			this.explosion.style.height = 150;
			this.top = pulsars[shell_number].top + pulsar_height/2 - 150/2;
			this.left = pulsars[shell_number].left + pulsar_width/2 - 150/2;
		} else if (this.type == "void_pulsar"){
			this.explosion.style.transition = 3 + "s";
			this.explosion.style.width = 150;
			this.explosion.style.height = 150;
			this.top = void_pulsars[shell_number].top + pulsar_height/2 - 150/2;
			this.left = void_pulsars[shell_number].left + pulsar_width/2 - 150/2;
		} else if (this.type == "destruction"){
			this.explosion.style.transition = 5 + "s";
			this.explosion.style.width = 500;
			this.explosion.style.height = 500;
			this.top = enemies[shell_number].top + enemies[shell_number].height/2 - 500/2;
			this.left = enemies[shell_number].left + enemies[shell_number].width/2 - 500/2;
		}

		this.explosion.style.top = this.top;
		this.explosion.style.left = this.left;
	};
	this.evolve = function () {
		this.phase_tick++;
			// if (this.phase_tick==50) {
			// 	this.explosion.style.transform = "scale("+10+");";
			// }
			// if (this.phase_tick==100) {
			// 	this.explosion.style.opacity = 0.3;
			// }
			// if (this.phase_tick==250) {
			// 	this.explosion.style.opacity = 0.2;
			// }
			if (this.phase_tick==3) {
				this.explosion.style.opacity = 0;
				this.explosion.style.transform = "scale(" + 0.1 + ")";
			}
			if (this.phase_tick==50) {
				this.clean();
			}
		};
		this.clean = function () {
			space.removeChild(this.explosion);
			delete explosions[this.number];
		};
	}








				// if (
				// obj[key1].rotate_vector(new Victor(obj[key1].left, obj[key1].top)).y + obj[key1].height*accuracy >= target_obj[key2].rotate_vector(new Victor(target_obj[key2].left, target_obj[key2].top)).y &&
				// obj[key1].rotate_vector(new Victor(obj[key1].left, obj[key1].top)).x + obj[key1].width*accuracy >= target_obj[key2].rotate_vector(new Victor(target_obj[key2].left, target_obj[key2].top)).x &&
				// obj[key1].rotate_vector(new Victor(obj[key1].left + obj[key1].width, obj[key1].top + obj[key1].height)).y - obj[key1].height*accuracy <= target_obj[key2].rotate_vector(new Victor(target_obj[key2].left + target_obj[key2].width, target_obj[key2].top + target_obj[key2].height)).y &&
				// obj[key1].rotate_vector(new Victor(obj[key1].left + obj[key1].width, obj[key1].top + obj[key1].height)).x - obj[key1].width*accuracy <= target_obj[key2].rotate_vector(new Victor(target_obj[key2].left + target_obj[key2].width, target_obj[key2].top + target_obj[key2].height)).x
				// )
				// if (mission_code == 0) {
				// 	dot1.style.top=target_obj[key2].rotate_vector(new Victor(target_obj[key2].left, target_obj[key2].top)).y;
				// 	dot1.style.left=target_obj[key2].rotate_vector(new Victor(target_obj[key2].left, target_obj[key2].top)).x;
				// 	dot2.style.top=target_obj[key2].rotate_vector(new Victor(target_obj[key2].left + target_obj[key2].width, target_obj[key2].top + target_obj[key2].height)).y;
				// 	dot2.style.left=target_obj[key2].rotate_vector(new Victor(target_obj[key2].left + target_obj[key2].width, target_obj[key2].top + target_obj[key2].height)).x;
				// 	dot3.style.top=obj[key1].rotate_vector(new Victor(obj[key1].left, obj[key1].top)).y + obj[key1].height*accuracy;
				// 	dot3.style.left=obj[key1].rotate_vector(new Victor(obj[key1].left, obj[key1].top)).x + obj[key1].height*accuracy;
				// 	dot4.style.top=obj[key1].rotate_vector(new Victor(obj[key1].left + obj[key1].width, obj[key1].top + obj[key1].height)).y - obj[key1].height*accuracy;
				// 	dot4.style.left=obj[key1].rotate_vector(new Victor(obj[key1].left + obj[key1].width, obj[key1].top + obj[key1].height)).x - obj[key1].height*accuracy;

				// }
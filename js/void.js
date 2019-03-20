var enemies = {};
var counter_enemies = 0;

const void_width = 40;
const void_height = 80;

function enemy_spawn(type) {
	var enemy = document.createElement('div');
	var health_bar = document.createElement('div');
	enemy.className = 'void '+type+"_void";
	health_bar.className = "health_bar";
	space.appendChild(enemy);
	space.appendChild(health_bar);
	if (type == "defender" || type == "cruiser") {
		var shield_bar = document.createElement('div');
		shield_bar.className = "shield_bar";
		space.appendChild(shield_bar);
		enemies[counter_enemies] = new Enemy(counter_enemies, enemy, type, health_bar, shield_bar);
	} else {
		enemies[counter_enemies] = new Enemy(counter_enemies, enemy, type, health_bar);
	}
	enemies[counter_enemies].starting();

	counter_enemies++;
}

function Enemy(number, enemy, type, health_bar, shield_bar) {
	this.number = number;
	this.void = enemy;
	this.speed = new Victor(0, 0);
	this.acceleration = new Victor(0, 0);
	this.nebulosity = new Victor(getRandomArbitrary(-200, 200), getRandomArbitrary(-200, 200));
	this.reload_ticks = 0;
	this.overheat = 0;
	this.type = type;
	this.health_bar = health_bar;
	this.health_bar_width = 50;
	this.health_bar_height = 50;
	this.bar_activity = false;
	this.hide_limit = 300;
	this.bar_ticks = 0;
	this.existence_shield = false;
	this.shield = 0;
	this.shield_bar_width = 50;
	this.shield_bar_height = 50;
	this.shield_ticks = 0;
	this.starting = function () {
		this.top = getRandomArbitrary(-document.documentElement.clientHeight*(firing_zone-1), document.documentElement.clientHeight*firing_zone);
		this.left = getRandomArbitrary(-document.documentElement.clientWidth*(firing_zone-1), document.documentElement.clientWidth*firing_zone);

		this.void.style.top = this.top + 'px';
		this.void.style.left = this.left + 'px';

		if (this.type == "laser") {
			this.max_speed = 4;
			this.limit_tick = 20;
			this.limit_overheat = 50;
			this.health = 150;
			this.health_divider = 200;
			this.basic_nebulosity = 300;

			this.width = void_width;
			this.height = void_height;
		} else if (this.type == "pulsar"){
			this.max_speed = 2;
			this.limit_tick = 150;
			this.limit_overheat = 10;
			this.health = 200;
			this.health_divider = 200;
			this.basic_nebulosity = 300;

			this.width = void_width;
			this.height = void_height + 20;
			this.void.style.width = this.width - 20;
			this.void.style.height = this.height - 20;
		} else if (this.type == "defender"){
			this.max_speed = 0.5;
			this.limit_tick = 9;
			this.limit_overheat = 300;
			this.health = 700;
			this.health_divider = 650;
			this.basic_nebulosity = 100;

			this.shield = 300;
			this.existence_shield = true;
			this.shield_bar = shield_bar;
			this.shield_divider = 400;
			this.shield_limit = 7;
			this.basic_shield = 300;

			this.width = void_width*2;
			this.height = void_height*2 + 40;
			this.void.style.width = this.width - 20;
			this.void.style.height = this.height - 20;
		}
	};
	this.treatment = function (damage, type) {
		if (this.shield >= damage) {
			if (type == "pulsar") {
				this.shield-=damage/3;
			} else {
				this.shield-=damage;
			}
		} else if (this.existence_shield && type == "pulsar") {
			this.health-=damage/2;
		} else{
			this.health-=damage;
		}

		if (this.health <= 0) {
			exploser("destruction", this.number);
			this.clean();
		}

		if (this.existence_shield) {
			this.shield_bar.style.width = this.shield_bar_width;
			this.shield_bar.style.height = this.shield_bar_height;
			this.shield_bar.style.opacity = 1.2 - this.shield/this.shield_divider;
			this.shield_bar.style.display = "block";
			// if (this.shield < this.width*2) {
			// 	this.shield_bar.style.zIndex = 160;
			// }
		}
		this.bar_ticks= 0;
		this.bar_activity = true;
		this.health_bar.style.width = this.health_bar_width;
		this.health_bar.style.height = this.health_bar_height;
		this.health_bar.style.opacity = 1.2 - this.health/this.health_divider;
		this.health_bar.style.display = "block";
		if (this.health < this.width*2) {
			this.health_bar.style.zIndex = 150;
		}
	};
	this.move = function () {
		this.top  += this.speed.y;
		this.left += this.speed.x;

		var vec = new Victor(ships.ship.left-this.left-ship_width/2+this.nebulosity.x, ships.ship.top-this.top-ship_height/2+this.nebulosity.y);
		this.acceleration = vec.multiply(Force);

		this.speed.add(this.acceleration);
		if (this.speed.length() > this.max_speed) {
			this.speed.normalize().multiply(new Victor(this.max_speed, this.max_speed));
		}

		this.void.style.top = this.top + 'px';
		this.void.style.left = this.left + 'px';
		this.void.style.transform = "rotate("+(this.speed.angleDeg()+90)+"deg)";

		// var center = this.vec_center();
		// if (this.number == 0 && mission_code == 0){
		// 	var vec_left_top = this.rotate_vector(new Victor(this.left, this.top));
		// 	var vec_right_top = this.rotate_vector(new Victor(this.left+this.width, this.top));
		// 	var vec_right_bottom = this.rotate_vector(new Victor(this.left+this.width, this.top+ this.height));
		// 	var vec_left_bottom = this.rotate_vector(new Victor(this.left, this.top+ this.height))
		// 	dot_center.style.top = center.y;
		// 	dot_center.style.left = center.x;
		// 	dot1.style.top=vec_left_top.y;
		// 	dot1.style.left=vec_left_top.x;
		// 	dot2.style.top=vec_right_top.y;
		// 	dot2.style.left=vec_right_top.x;
		// 	dot3.style.top=vec_right_bottom.y;
		// 	dot3.style.left=vec_right_bottom.x;
		// 	dot4.style.top=vec_left_bottom.y;
		// 	dot4.style.left=vec_left_bottom.x;
		// }

		if (this.existence_shield) {
			this.shield_ticks++;
			this.shield_bar_width = this.shield/2;
			this.shield_bar_height = this.shield/2;
			if (this.shield_ticks >= this.shield_limit && this.shield < this.basic_shield) {
				this.shield_ticks = 0;
				this.shield++;
				console.log(this.shield);
			}
		}

		if (this.bar_activity) {
			this.bar_ticks++;
			this.health_bar_width = this.health/2;
			this.health_bar_height = this.health/2;
			this.health_bar.style.top = this.vec_center().y - this.health_bar_height/2;
			this.health_bar.style.left =  this.vec_center().x - this.health_bar_width/2;
			if (this.existence_shield) {
				this.shield_bar.style.width = this.shield_bar_width;
				this.shield_bar.style.height = this.shield_bar_height;
				this.shield_bar.style.top = this.vec_center().y - this.shield_bar_height/2;
				this.shield_bar.style.left =  this.vec_center().x - this.shield_bar_width/2;
			}
			if (this.bar_ticks == this.hide_limit) {
				this.bar_activity = false;
				this.bar_ticks = 0;
				this.health_bar.style.display = "none";
				if (this.existence_shield) {
					this.shield_bar.style.display = "none";
				}
			}
		}
		


		this.reload_ticks++;
		if (this.reload_ticks == -10) {
			if (this.type != "defender") {
				this.nebulosity = new Victor(getRandomArbitrary(-(this.basic_nebulosity - 100), this.basic_nebulosity - 100), getRandomArbitrary(-(this.basic_nebulosity - 100), this.basic_nebulosity - 100));
				this.max_speed-=1;
			} else {
				this.nebulosity = new Victor(getRandomArbitrary(-(this.basic_nebulosity - 100), this.basic_nebulosity - 100), getRandomArbitrary(-(this.basic_nebulosity - 100), this.basic_nebulosity - 100));
				this.shield_limit = 7;
			}
		}
		if (this.reload_ticks == this.limit_tick) {
			this.overheat++;
			this.fire();
			this.reload_ticks = 0;
			if (this.overheat==this.limit_overheat) {
				this.overheat=0;
				if (this.type != "defender") {
					this.reload_ticks = -400;
					this.nebulosity = new Victor(getRandomArbitrary(-(this.basic_nebulosity + 400), this.basic_nebulosity + 400), getRandomArbitrary((-this.basic_nebulosity + 400), this.basic_nebulosity + 400));
					this.max_speed+=1;
				} else {
					this.reload_ticks = -1200;
					this.shield_limit = 3;
				}
			} else if ((ships.ship.speed.x < 0.5 && ships.ship.speed.y < 0.5) && (ships.ship.speed.x > -0.5 && ships.ship.speed.y > -0.5)){
				this.nebulosity = new Victor(0, 0);
				// console.log(toStringFancy(this.nebulosity));
			} else if ((ships.ship.speed.x < 1 || ships.ship.speed.y < 1) && (ships.ship.speed.x > -1 || ships.ship.speed.y > -1)){
				this.nebulosity = new Victor(getRandomArbitrary(-100, 100), getRandomArbitrary(-100, 100));
				// console.log(toStringFancy(this.nebulosity));
			} else{
				this.nebulosity = new Victor(getRandomArbitrary(-this.basic_nebulosity, this.basic_nebulosity), getRandomArbitrary(-this.basic_nebulosity, this.basic_nebulosity));
				// console.log(toStringFancy(this.nebulosity));
			}
		}

	};
	this.vec_center = function () {
		return new Victor(this.left+this.width/2, this.top+this.height/2);
	};
	this.rotate_vector = function(vector) {
		var vec = vector.subtract(this.vec_center());
		var rotated_vec = vec.rotate(this.speed.angle()+Math.PI/2).add(this.vec_center());
		return rotated_vec;
	};
	this.clean = function () {
		space.removeChild(this.void);
		space.removeChild(this.health_bar);
		delete enemies[this.number];
	};
	this.fire = function () {
		if (this.type == "laser" || this.type == "defender") {
			var shell = document.createElement('div');
			if (this.type == "laser") {
				var damage = 1;
				shell.className = 'shell void_shell_light';
			} else {
				var damage = 2;
				shell.className = 'shell void_shell_heavy';
			}
			space.appendChild(shell);
			void_shells[counter_void_shells] = new Void_shell(counter_void_shells, shell, this.number, damage);
			void_shells[counter_void_shells].starting();
			counter_void_shells++;
		} else {
			var pulsar = document.createElement('div');
			var damage = 3;
			pulsar.className = 'pulsar void_pulsar';
			space.appendChild(pulsar);
			void_pulsars[counter_void_pulsars] = new Void_pulsar(counter_void_pulsars, pulsar, this.number, damage);
			void_pulsars[counter_void_pulsars].starting();
			counter_void_pulsars++;
		}
	}
}


var void_shells = {};
var counter_void_shells = 0;

const void_shell_width = 25;
const void_shell_height = 25;
function Void_shell(number, shell, void_number, damage) {
	this.number = number;
	this.void_number = void_number;
	this.shell = shell;
	this.max_speed = 10;
	this.speed = new Victor(0, 0);
	this.acceleration = new Victor(0, 0);
	this.width = void_shell_width;
	this.height = void_shell_height;
	this.damage = damage;
	this.starting = function () {
		this.top = enemies[void_number].top + enemies[void_number].height/2;
		this.left = enemies[void_number].left + enemies[void_number].width/2;
		
		this.shell.style.top = this.top;
		this.shell.style.left = this.left;

		this.acceleration.copy(enemies[void_number].speed);
	};
	this.move = function () {
		if (this.top+void_shell_height < -document.documentElement.clientHeight*(firing_zone-1) ||
			this.top > document.documentElement.clientHeight*firing_zone || 
			this.left+void_shell_width < -document.documentElement.clientWidth*(firing_zone-1) || 
			this.left > document.documentElement.clientWidth*firing_zone)
		{
			this.clean();
		}

		this.top  += this.speed.y;
		this.left += this.speed.x;

		this.speed.add(this.acceleration);
		if (this.speed.length() > this.max_speed) {
			this.speed.normalize().multiply(new Victor(this.max_speed, this.max_speed));
		}

		this.shell.style.top = this.top + 'px';
		this.shell.style.left = this.left + 'px';
		this.shell.style.transform = "rotate("+(this.speed.angleDeg()+90)+"deg)";
	};
	this.clean = function () {
		space.removeChild(this.shell);
		delete void_shells[this.number];
	}
	this.rotate_vector = function(vector) {
		var vec = vector.subtract(this.vec_center());
		var rotated_vec = vec.rotate(this.speed.angle()+Math.PI/2).add(this.vec_center());
		return rotated_vec;
	};
	this.vec_center = function () {
		return new Victor(this.left+this.width/2, this.top+this.height/2);
	};
}


var void_pulsars = {};
var counter_void_pulsars = 0;

const void_pulsar_width = 30;
const void_pulsar_height = 60;
function Void_pulsar(number, pulsar, void_number) {
	this.number = number;
	this.void_number = void_number;
	this.pulsar = pulsar;
	this.max_speed = 3;
	this.speed = new Victor(0, 0);
	this.acceleration = new Victor(0, 0);
	this.width = void_pulsar_width;
	this.height = void_pulsar_height;
	this.starting = function () {
		this.top = enemies[this.void_number].top + void_height/2 - void_pulsar_height/2;
		this.left = enemies[this.void_number].left + void_width/2 - void_pulsar_width/2;
		
		this.pulsar.style.top = this.top;
		this.pulsar.style.left = this.left;

		this.acceleration.copy(enemies[this.void_number].speed);
	};
	this.move = function () {
		if (this.top+void_pulsar_height < -document.documentElement.clientHeight*(firing_zone-1) ||
			this.top > document.documentElement.clientHeight*firing_zone || 
			this.left+void_pulsar_width < -document.documentElement.clientWidth*(firing_zone-1) || 
			this.left > document.documentElement.clientWidth*firing_zone)
		{
			this.clean();
		}

		this.top  += this.speed.y;
		this.left += this.speed.x;

		this.speed.add(this.acceleration.multiply(new Victor(2, 2)));
		if (this.speed.length() > this.max_speed) {
			this.speed.normalize().multiply(new Victor(this.max_speed, this.max_speed));
		}

		this.pulsar.style.top = this.top + 'px';
		this.pulsar.style.left = this.left + 'px';
		this.pulsar.style.transform = "rotate("+(this.speed.angleDeg()+90)+"deg)";
	};
	this.clean = function () {
		space.removeChild(this.pulsar);
		delete void_pulsars[this.number];
	}
	this.rotate_vector = function(vector) {
		var vec = vector.subtract(this.vec_center());
		var rotated_vec = vec.rotate(this.speed.angle()+Math.PI/2).add(this.vec_center());
		return rotated_vec;
	};
	this.vec_center = function () {
		return new Victor(this.left+this.width/2, this.top+this.height/2);
	};
}
var Force = new Victor(0.0004, 0.0004);

const ship_width = 80;
const ship_height = 80;

var health_bar_width = 50;
var health_bar_height = 50;


var ships = {
	ship: {
		number: 0,
		top: document.documentElement.clientHeight/2 - ship_width/2,
		left: document.documentElement.clientWidth/2 - ship_height/2,
		max_speed: 5,
		speed: new Victor(0, 0),
		acceleration: new Victor(0, 0),
		frequency_fire: 5,	//shells/sec.
		width: ship_width,
		height: ship_height,
		health: 100,
		shield: 50,
		health_bar_width: 50,
		health_bar_height: 50,
		existence_shield: false,
		shield_bar_width: 50,
		shield_bar_height: 50,
		shield_ticks: 0,
		existence_shield: true,
		health_divider: 400,
		shield_divider: 200,
		shield_limit: 30,
		basic_shield: 50,
		move: function () {
			this.top  += this.speed.y;
			this.left += this.speed.x;

			// if (mission_code == 0){
			// var center = this.vec_center();
			// 	var vec_left_top = this.rotate_vector(new Victor(this.left, this.top));
			// 	var vec_right_top = this.rotate_vector(new Victor(this.left+ship_width, this.top));
			// 	var vec_right_bottom = this.rotate_vector(new Victor(this.left+ship_width, this.top+ ship_height));
			// 	var vec_left_bottom = this.rotate_vector(new Victor(this.left, this.top+ ship_height));
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
			var vec = new Victor(cursor.x-this.left-ship_width/2, cursor.y-this.top-ship_height/2);
			this.acceleration = vec.multiply(Force);

			this.speed.add(this.acceleration);
			if (this.speed.length() > this.max_speed) {
				this.speed.normalize().multiply(new Victor(this.max_speed, this.max_speed));
			}

			ship_shield.style.opacity = 1.2 - this.shield/this.shield_divider;
			ship_health.style.opacity = 1.2 - this.health/this.health_divider;
			if (this.existence_shield) {
				this.shield_ticks++;
				this.shield_bar_width = this.shield;
				this.shield_bar_height = this.shield;
				ship_shield.style.width = this.shield_bar_width;
				ship_shield.style.height = this.shield_bar_height;
				if (this.shield_ticks >= this.shield_limit && this.shield < this.basic_shield) {
					this.shield_ticks = 0;
					this.shield++;
					ship_shield.style.opacity = 1.2 - this.shield/this.shield_divider;
					ship_shield.innerHTML = this.shield;
				}
			}

			this.health_bar_width = this.health;
			this.health_bar_height = this.health;
			ship_health.style.width = this.health_bar_width;
			ship_health.style.height = this.health_bar_height;
			if (this.existence_shield) {
				this.shield_bar_width = this.shield;
				this.shield_bar_height = this.shield;
			}

			spaceship.style.top = this.top + 'px';
			spaceship.style.left = this.left + 'px';
			spaceship.style.transform = "rotate("+(this.speed.angleDeg()+90)+"deg)";
		},
		treatment: function (damage, type) {
			if (this.shield >= damage) {
				if (type == "pulsar") {
					this.shield-=damage/2;
				} else {
					this.shield-=damage;
				}
			} else {
				this.health-=damage;
			}

			if (this.health <= 0) {
				// exploser("destruction", this.number);
				// this.clean();
			}
			ship_health.style.top = 60 - this.health_bar_height/2;
			ship_health.style.left =  60 - this.health_bar_width/2;

			ship_shield.style.top = 90 - this.shield_bar_height/2;
			ship_shield.style.left =  120 - this.shield_bar_width/2;

			ship_shield.innerHTML = this.shield.toFixed(0);
			ship_health.innerHTML = this.health.toFixed(0);

			ship_shield.style.opacity = 1.2 - this.shield/this.shield_divider;
			ship_health.style.opacity = 1.2 - this.health/this.health_divider;
		},
		vec_center: function () {
			return new Victor(this.left+ship_width/2, this.top+ship_height/2);
		},
		rotate_vector : function(vector) {
			var vec = vector.subtract(this.vec_center());
			var rotated_vec = vec.rotate(this.speed.angle()+Math.PI/2).add(this.vec_center());
			return rotated_vec;
		},
	},
}


function afterburner(time) {
	ships.ship.max_speed = 25;
	setTimeout("ships.ship.max_speed = 5;", time);
	setTimeout("afterburner_bool = true;", time*3);
}
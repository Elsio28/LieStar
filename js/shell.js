var shells = {};
var counter_shells = 0;

const shell_width = 15;
const shell_height = 15;
const shift = 0.7;

const cannon_left = new Victor(-ship_width/2*shift, ship_height/4);
const cannon_right = new Victor(ship_width/2*shift, ship_height/4);

var timerFire;
function fire(event, active) {
	if (active && event.which == 1) {
		timerFire = setInterval(function run() {
		  onFire(1);
		  // onFire(2);
		}, 1000/ships.ship.frequency_fire);
	} else if (event.which == 1) {
		clearInterval(timerFire);
	}
}

function onFire(cannon) {
	var shell = document.createElement('div');
	shell.className = 'shell allias_shell';
	space.appendChild(shell);
	shells[counter_shells] = new Shell(counter_shells, shell, cannon);
	shells[counter_shells].starting();

	counter_shells++;
}

function Shell(number, shell, cannon) {
	this.number = number;
	this.shell = shell;
	this.max_speed = 10;
	this.speed = new Victor(0, 0);
	this.acceleration = new Victor(0, 0);
	this.width = shell_width;
	this.height = shell_height;
	this.starting = function () {
		var left_rotate = cannon_left.clone().rotate(ships.ship.speed.angle() + Math.PI/2);
		var right_rotate = cannon_right.clone().rotate(ships.ship.speed.angle() + Math.PI/2);
		var center = ships.ship.vec_center();
		var vec_left = left_rotate.add(center);
		var vec_right = right_rotate.add(center);


		if (cannon == 1) {
			this.left = vec_left.x;
			this.top = vec_left.y;

		} else {
			this.left = vec_right.x;
			this.top = vec_right.y;
		}
		
		this.shell.style.top = this.top;
		this.shell.style.left = this.left;


		this.acceleration.copy(ships.ship.speed);
	};
	this.move = function () {
		if (this.top+shell_height < -document.documentElement.clientHeight*(firing_zone-1) ||
			this.top > document.documentElement.clientHeight*firing_zone || 
			this.left+shell_width < -document.documentElement.clientWidth*(firing_zone-1) || 
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
					
				// var vec_left_top = this.rotate_vector(new Victor(this.left, this.top));
				// var vec_right_top = this.rotate_vector(new Victor(this.left+this.width, this.top));
				// var vec_right_bottom = this.rotate_vector(new Victor(this.left+this.width, this.top+this.height));
				// var vec_left_bottom = this.rotate_vector(new Victor(this.left, this.top+this.height));

				// dot1.style.top=vec_left_top.y;
				// dot1.style.left=vec_left_top.x;
				// dot2.style.top=vec_right_top.y;
				// dot2.style.left=vec_right_top.x;
				// dot3.style.top=vec_right_bottom.y;
				// dot3.style.left=vec_right_bottom.x;
				// dot4.style.top=vec_left_bottom.y;
				// dot4.style.left=vec_left_bottom.x;

			
	};
	this.clean = function () {
		space.removeChild(this.shell);
		delete shells[this.number];
	};
	this.rotate_vector = function(vector) {
		var vec = vector.subtract(this.vec_center());
		var rotated_vec = vec.rotate(this.speed.angle()+Math.PI/2).add(this.vec_center());
		return rotated_vec;
	};
	this.vec_center = function () {
		return new Victor(this.left+this.width/2, this.top+this.height/2);
	};
}



var pulsars = {};
var counter_pulsars = 0;

const pulsar_width = 50;
const pulsar_height = 80;

var pulsar_ready = true;
function pulsar_launch() {
	if (pulsar_ready) {
		pulsar_ready = false;
		var timerPulsar = setTimeout(function run() {
		  pulsar_ready = true;
		}, 1000);
		var pulsar = document.createElement('div');
		pulsar.className = 'pulsar allias_pulsar';
		space.appendChild(pulsar);
		pulsars[counter_pulsars] = new Pulsar(counter_pulsars, pulsar);
		pulsars[counter_pulsars].starting();
	
		counter_pulsars++;
	}
}
function Pulsar(number, pulsar) {
	this.number = number;
	this.pulsar = pulsar;
	this.max_speed = 3;
	this.speed = new Victor(0, 0);
	this.acceleration = new Victor(0, 0);
	this.width = pulsar_width;
	this.height = pulsar_height;
	this.starting = function () {
		var center = ships.ship.vec_center();
		this.top = center.y - pulsar_height/2;
		this.left = center.x - pulsar_width/2;

		this.pulsar.style.top = this.top;
		this.pulsar.style.left = this.left;

		this.acceleration.copy(ships.ship.speed);
	};
	this.move = function () {
				// var edges = orientation(pulsars, this.number);
				// console.log(edges);
		if (this.top+pulsar_height < -document.documentElement.clientHeight*(firing_zone-1) ||
			this.top > document.documentElement.clientHeight*firing_zone || 
			this.left+pulsar_width < -document.documentElement.clientWidth*(firing_zone-1) || 
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
		delete pulsars[this.number];
	};
	this.rotate_vector = function(vector) {
		var vec = vector.subtract(this.vec_center());
		var rotated_vec = vec.rotate(this.speed.angle()+Math.PI/2).add(this.vec_center());
		return rotated_vec;
	};
	this.vec_center = function () {
		return new Victor(this.left+this.width/2, this.top+this.height/2);
	};
}
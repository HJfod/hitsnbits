function draw_player() {
	if (player_recover % 2 == 0){
		ctx.beginPath();
		ctx.rect(player_x-(player_size_x/2),player_y-(player_size_y/2),player_size_x,player_size_y);
		ctx.fillStyle = player_colour;
		ctx.fill();
		ctx.closePath();
	}
}

function draw_player_death_animation() {
	if (player_death_animation_hasPlayed == false){
		var i;
		for (i = 0; i < 32; i++){
			player_death_animation_pixel_x[i] = player_x;
			player_death_animation_pixel_y[i] = player_y;
			player_death_animation_pixel_h[i] = Math.random()*10-5 + player_motion_x;
			player_death_animation_pixel_v[i] = Math.random()*10-5 + player_motion_y;
			player_death_animation_pixel_r[i] = 0;
			player_death_animation_pixel_s[i] = Math.random()*10+5;
		}
		player_death_animation_hasPlayed = 1;
	}else if (player_death_animation_hasPlayed < 100){
		ctx.globalAlpha = 1-(player_death_animation_hasPlayed/100);
		var i;
		for (i = 0; i < 32; i++){
			player_death_animation_pixel_x[i] += player_death_animation_pixel_h[i];
			player_death_animation_pixel_y[i] += player_death_animation_pixel_v[i];
			player_death_animation_pixel_r[i] += player_death_animation_pixel_h[i];
			
			if (player_death_animation_pixel_h[i] < 0){
				player_death_animation_pixel_h[i] += Math.random()/10;
			}
			
			if (player_death_animation_pixel_h[i] > 0){
				player_death_animation_pixel_h[i] -= Math.random()/10;
			}
			
			if (player_death_animation_pixel_v[i] < 0){
				player_death_animation_pixel_v[i] += Math.random()/10;
			}
			
			if (player_death_animation_pixel_v[i] > 0){
				player_death_animation_pixel_v[i] -= Math.random()/10;
			}
			
			ctx.fillStyle = player_colour;
			ctx.save();
			ctx.translate(player_death_animation_pixel_x[i],player_death_animation_pixel_y[i]);
			ctx.rotate(player_death_animation_pixel_r[i]*Math.PI/180);
			ctx.translate(-player_death_animation_pixel_x[i],-player_death_animation_pixel_y[i]);
			ctx.fillRect(player_death_animation_pixel_x[i]-(player_death_animation_pixel_s[i]/2),player_death_animation_pixel_y[i]-(player_death_animation_pixel_s[i]/2),player_death_animation_pixel_s[i],player_death_animation_pixel_s[i]);
			ctx.restore();
		}
		ctx.globalAlpha = 1;
		player_death_animation_hasPlayed += 1;
	}else{
		player_death_animation_pixel_x = [];
		player_death_animation_pixel_y = [];
		player_death_animation_pixel_h = [];
		player_death_animation_pixel_v = [];
		player_death_animation_pixel_r = [];
		player_death_animation_pixel_s = [];
	}
}

function draw_bullets() {
	var i;
	for (i = 0; i < bullet_type.length; i++){
		if (bullet_type[i] == "pellet"){
			ctx.beginPath();
			ctx.ellipse(bullet_x[i], bullet_y[i], bullet_width[i], bullet_height[i], bullet_rotation[i], 0, Math.PI*4);
			ctx.fillStyle = bullet_colour;
			ctx.fill();
			ctx.closePath();
		}
		if (bullet_type[i] == "wall"){
			ctx.beginPath();
			ctx.rect(bullet_x[i]-bullet_width[i],bullet_y[i]-bullet_height[i],bullet_width[i]*2,bullet_height[i]*2);
			ctx.fillStyle = bullet_colour;
			ctx.fill();
			ctx.closePath();
		}
		if (bullet_type[i] == "wall_special"){
			if (bullet_hp[i] < bullet_rotation[i]/2){
				ctx.globalAlpha = bullet_hp[i]/(bullet_rotation[i]/2);
			}
			ctx.beginPath();
			ctx.rect(bullet_x[i]-bullet_width[i],bullet_y[i]-bullet_height[i],bullet_width[i]*2,bullet_height[i]*2);
			ctx.fillStyle = bullet_colour;
			ctx.fill();
			ctx.closePath();
			ctx.globalAlpha = 1;
		}
		if (bullet_type[i] == "bucket"){
			ctx.beginPath();
			ctx.rect(bullet_x[i]-bullet_width[i],0,canvas.width,canvas.height);
			ctx.fillStyle = bullet_colour;
			ctx.fill();
			ctx.closePath();
		}
		if (bullet_type[i] == "lazer"){
			ctx.globalAlpha = bullet_height[i]/bullet_hp[i];
			ctx.beginPath();
			ctx.rect(bullet_x[i], bullet_y[i]-bullet_height[i]-8, -bullet_width[i], bullet_height[i]*2);
			ctx.fillStyle = bullet_colour_warning;
			ctx.fill();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.rect(bullet_x[i], bullet_y[i]-bullet_height[i], -bullet_width[i], bullet_height[i]*2);
			ctx.fillStyle = bullet_colour;
			ctx.fill();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.rect(bullet_x[i], bullet_y[i]-bullet_height[i]+16, -bullet_width[i], bullet_height[i]*2-32);
			ctx.fillStyle = "#ffffff";
			ctx.fill();
			ctx.closePath();
			ctx.globalAlpha = 1;
		}
		if (bullet_type[i] == "lazer_vertical"){
			ctx.globalAlpha = bullet_width[i]/bullet_hp[i];
			ctx.beginPath();
			ctx.rect(bullet_x[i]-bullet_width[i]-8, 0, bullet_width[i]*2+16, canvas.height);
			ctx.fillStyle = bullet_colour_warning;
			ctx.fill();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.rect(bullet_x[i]-bullet_width[i], 0, bullet_width[i]*2, canvas.height);
			ctx.fillStyle = bullet_colour;
			ctx.fill();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.rect(bullet_x[i]-bullet_width[i]+32, 0, bullet_width[i]*2-64, canvas.height);
			ctx.fillStyle = "#ffffff";
			ctx.fill();
			ctx.closePath();
			ctx.globalAlpha = 1;
		}
		if (bullet_type[i] == "warning"){
			ctx.globalAlpha = bullet_hp[i];
			ctx.beginPath();
			ctx.rect(bullet_x[i], bullet_y[i]-(bullet_hp[i]), -bullet_width[i], bullet_hp[i]*2);
			ctx.fillStyle = bullet_colour_warning;
			ctx.fill();
			ctx.closePath();
			ctx.globalAlpha = 1;
		}
		if (bullet_type[i] == "warning_vertical"){
			ctx.globalAlpha = bullet_hp[i];
			ctx.beginPath();
			ctx.rect(bullet_x[i]-(bullet_hp[i]), 0, bullet_hp[i]*2, canvas.height);
			ctx.fillStyle = bullet_colour_warning;
			ctx.fill();
			ctx.closePath();
			ctx.globalAlpha = 1;
		}
		if (bullet_type[i] == "triangle"){
			ctx.beginPath();
			ctx.save();
			
			ctx.translate(bullet_x[i], bullet_y[i]);
			ctx.rotate(bullet_rotation[i] * Math.PI / 180);
			ctx.translate(-bullet_x[i], -bullet_y[i]);
			
			ctx.moveTo(bullet_x[i]-bullet_width[i], bullet_y[i]-bullet_height[i]+8);
			ctx.lineTo(bullet_x[i], bullet_y[i]+bullet_height[i]+8);
			ctx.lineTo(bullet_x[i]+bullet_width[i], bullet_y[i]-bullet_height[i]+8);
			
			ctx.fillStyle = bullet_colour;
			ctx.fill();
			
			ctx.restore();
			ctx.closePath();
		}
		if (bullet_type[i] == "gear"){
			ctx.beginPath();
			ctx.save();
			
			ctx.translate(bullet_x[i], bullet_y[i]);
			ctx.rotate(bullet_rotation[i] * Math.PI / 180);
			ctx.translate(-bullet_x[i], -bullet_y[i]);
			
			ctx.ellipse(bullet_x[i],bullet_y[i],bullet_width[i]/1.3,bullet_height[i]/1.3,bullet_rotation[i],0,Math.PI*4);
			
			ctx.rect(bullet_x[i]-(bullet_width[i]/6),bullet_y[i]-bullet_height[i],bullet_width[i]/3,bullet_height[i]*2);
			ctx.rect(bullet_x[i]-bullet_width[i],bullet_y[i]-(bullet_height[i]/6),bullet_width[i]*2,bullet_height[i]/3);
			
			ctx.translate(bullet_x[i], bullet_y[i]);
			ctx.rotate(45 * Math.PI / 180);
			ctx.translate(-bullet_x[i], -bullet_y[i]);
			
			ctx.rect(bullet_x[i]-(bullet_width[i]/6),bullet_y[i]-bullet_height[i],bullet_width[i]/3,bullet_height[i]*2);
			ctx.rect(bullet_x[i]-bullet_width[i],bullet_y[i]-(bullet_height[i]/6),bullet_width[i]*2,bullet_height[i]/3);
			
			ctx.fillStyle = bullet_colour;
			ctx.fill();
			
			ctx.restore();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.save();
			
			ctx.ellipse(bullet_x[i],bullet_y[i],bullet_width[i]/2,bullet_height[i]/2,bullet_rotation[i],0,Math.PI*4);
			
			ctx.fillStyle = "#ffffff";
			ctx.fill();
			
			ctx.restore();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.save();
			
			ctx.ellipse(bullet_x[i],bullet_y[i],bullet_width[i]/3,bullet_height[i]/3,bullet_rotation[i],0,Math.PI*4);
			
			ctx.fillStyle = bullet_colour;
			ctx.fill();
			
			ctx.restore();
			ctx.closePath();
		}
	}
}

function draw_effects() {
	var i;
	for (i = 0; i < effect_type.length; i++){
		if (effect_type[i] == "flash"){
			ctx.globalAlpha = effect_timer[i]/effect_length[i];
			ctx.fillStyle = effect_colour[i];
			ctx.fillRect(0,0,canvas.width,canvas.height);
			ctx.globalAlpha = 1;
		}
	}
}

function draw() {
	draw_bullets();
	draw_player();
	if (global_game_over == true){
		draw_player_death_animation();
	}
	draw_effects();
}
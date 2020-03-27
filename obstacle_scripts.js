function create_bullet(type,y,size = 8,rotation = 0,speed = 8,hp = 1) {
	var i;
	for (i = 0; i < bullet_type.length+1; i++){
		if (bullet_type[i] == undefined){
			bullet_type[i] = type;
			bullet_x[i] = canvas.width;
			bullet_y[i] = y;
			if (type == "pellet"){
				bullet_speed[i] = speed;
				bullet_width[i] = size;
				bullet_height[i] = size;
				bullet_rotation[i] = rotation;
				bullet_hp[i] = hp;
			}
			if (type == "lazer"){
				bullet_speed[i] = 0;
				bullet_width[i] = canvas.width;
				bullet_height[i] = size;
				bullet_rotation[i] = rotation;
				bullet_hp[i] = bullet_height[i];
			}
			if (type == "lazer_vertical"){
				bullet_x[i] = y;
				bullet_y[i] = 0;
				bullet_speed[i] = 0;
				bullet_width[i] = size;
				bullet_height[i] = canvas.height;
				bullet_rotation[i] = rotation;
				bullet_hp[i] = bullet_width[i];
			}
			if (type == "warning"){
				bullet_speed[i] = speed;
				bullet_width[i] = canvas.width;
				bullet_height[i] = size;
				bullet_rotation[i] = rotation;
				bullet_hp[i] = 0;
			}
			if (type == "warning_vertical"){
				bullet_x[i] = y;
				bullet_y[i] = 0;
				bullet_speed[i] = speed;
				bullet_width[i] = size;
				bullet_height[i] = canvas.height;
				bullet_rotation[i] = rotation;
				bullet_hp[i] = 0;
			}
			if (type == "warning_end"){
				bullet_speed[i] = 0;
				bullet_width[i] = 0;
				bullet_height[i] = 0;
				bullet_rotation[i] = 0;
				bullet_hp[i] = 0;
			}
			if (type == "triangle"){
				bullet_speed[i] = speed;
				bullet_width[i] = size;
				bullet_height[i] = size/1.1;
				bullet_rotation[i] = 0;
				bullet_hp[i] = hp;
			}
			if (type == "wall"){
				bullet_speed[i] = speed;
				bullet_width[i] = 32;
				bullet_height[i] = size;
				bullet_rotation[i] = 0;
				bullet_hp[i] = 0;
			}
			if (type == "wall_special"){
				bullet_speed[i] = speed;
				bullet_width[i] = 32;
				bullet_height[i] = size;
				bullet_rotation[i] = hp;
				bullet_hp[i] = hp;
			}
			if (type == "bucket"){
				bullet_speed[i] = 0.01;
				bullet_y[i] = 0;
				bullet_width[i] = 1;
				bullet_height[i] = y;
				bullet_rotation[i] = rotation;
				bullet_hp[i] = 0;
			}
			if (type == "gear"){
				bullet_speed[i] = speed;
				bullet_width[i] = size;
				bullet_height[i] = size;
				bullet_rotation[i] = rotation;
				bullet_hp[i] = hp;
			}
			return;
		}
	}
}

function create_effect(type,elength,colour){
	var i;
	for (i = 0; i < effect_type.length+1; i++){
		if (effect_type[i] == undefined){
			effect_type[i] = type;
			effect_length[i] = elength;
			effect_timer[i] = elength;
			effect_colour[i] = colour;
			return;
		}
	}
}

function move_bullets() {
	var i;
	for (i = 0; i < bullet_type.length; i++){
		if (bullet_type[i] == "pellet" || bullet_type[i] == "wall"){
			bullet_x[i] -= bullet_speed[i];
		}
		
		if (bullet_type[i] == "wall_special"){
			if (bullet_hp[i] > 0){
				bullet_hp[i] -= 1;
				bullet_x[i] -= bullet_speed[i];
			}else{
				delete_bullet(i); i -= 1;
			}
		}
		
		if (bullet_type[i] == "bucket"){
			if (bullet_width[i]-(bullet_x[i]/2) < bullet_height[i]/2){
				bullet_width[i] += bullet_speed[i];
				bullet_speed[i] += 0.1;
			}else{
				delete_bullet(i); i -= 1;
			}
		}
		
		if (bullet_type[i] == "gear"){
			bullet_x[i] -= bullet_speed[i];
			bullet_rotation[i] += bullet_hp[i]/4;
		}
		
		if (bullet_type[i] == "triangle"){
			bullet_x[i] -= bullet_speed[i];
			bullet_rotation[i] += bullet_speed[i]/4;
		}
		
		if (bullet_type[i] == "lazer"){
			bullet_height[i] -= bullet_height[i]/bullet_hp[i]+1;
			if (bullet_height[i] < 0){
				delete_bullet(i); i -= 1;
			}
			
			if (bullet_height[i] < bullet_hp[i]/2){
				bullet_speed[i] = 1;
			}
		}
		
		if (bullet_type[i] == "lazer_vertical"){
			bullet_width[i] -= bullet_width[i]/bullet_hp[i]+1;
			if (bullet_width[i] < 0){
				delete_bullet(i); i -= 1;
			}
			
			if (bullet_width[i] < bullet_hp[i]/2){
				bullet_speed[i] = 1;
			}
		}
		
		if (bullet_type[i] == "warning"){
			if (bullet_hp[i] < bullet_height[i]){
				bullet_hp[i] += bullet_speed[i];
			}
		}
		
		if (bullet_type[i] == "warning_vertical"){
			if (bullet_hp[i] < bullet_width[i]){
				bullet_hp[i] += bullet_speed[i];
			}
		}
		
		if (bullet_type[i] == "warning_end"){
			var j;
			for (j = 0; j < bullet_type.length; j++){
				if (bullet_type[j] == "warning" || bullet_type[j] == "warning_vertical"){
					delete_bullet(j);
				}
			}
			delete_bullet(i); i -= 1;
		}
		
		if (bullet_x[i] < 0){
			delete_bullet(i); i -= 1;
		}
	}
}

function handle_effects() {
	var i;
	for (i = 0; i < effect_type.length; i++){
		if (effect_timer[i] > 0){
			effect_timer[i] -= 1;
		}else{
			effect_type.splice(i,1);
			effect_length.splice(i,1);
			effect_colour.splice(i,1);
			effect_timer.splice(i,1);
		}
	}
}

function delete_bullet(id) {
	bullet_x.splice(id,1);
	bullet_y.splice(id,1);
	bullet_type.splice(id,1);
	bullet_speed.splice(id,1);
	bullet_hp.splice(id,1);
	bullet_width.splice(id,1);
	bullet_height.splice(id,1);
	bullet_rotation.splice(id,1);
}

function bullet_handler() {
	handle_effects();
	move_bullets();
	if (global_game_pause == true && global_level_complete == false){
		return;
	}
	if (level_begin == true){
		if (menu_position == 0){
			run_CausticHellYes();
		}else if (menu_position == 1){
			run_Dystopian();
		}else if (menu_position == 2){
			run_Finale();
		}
	}
}

function run_CausticHellYes() {
	if (level_bullet_timer == -1){
		if (level_timer_started == false){
			global_timer = accurateInterval(1000 * 60 / 280, function(){ level_bullet_timer += 1; level_bullet_timer_tick = level_bullet_timer; });
			level_timer_started = true;
		}
		level_bullet_timer = 0;
	}
	
	switch(level_bullet_timer_tick) {
		case 0:
			create_bullet("pellet",canvas.height/2,12);
			create_effect("flash",50,"rgba(255,255,255,0.2)");
			break;
		
		case 5:
			create_bullet("pellet",canvas.height-canvas.height/1.2);
			break;
		case 6:
			create_bullet("pellet",canvas.height-canvas.height/1.3);
			break;
		case 7:
			create_bullet("pellet",canvas.height-canvas.height/1.4);
			break;
		case 8:
			create_bullet("pellet",canvas.height-canvas.height/1.5);
			break;
		
		case 13:
			create_bullet("pellet",canvas.height/1.2);
			break;
		case 14:
			create_bullet("pellet",canvas.height/1.3);
			break;
		case 15:
			create_bullet("pellet",canvas.height/1.4);
			break;
		case 16:
			create_bullet("pellet",canvas.height/1.5);
			break;
		
		case 21:
			create_bullet("pellet",canvas.height-canvas.height/1.2);
			create_bullet("pellet",canvas.height/1.2);
			break;
		case 22:
			create_bullet("pellet",canvas.height-canvas.height/1.3);
			create_bullet("pellet",canvas.height/1.3);
			break;
		case 23:
			create_bullet("pellet",canvas.height-canvas.height/1.4);
			create_bullet("pellet",canvas.height/1.4);
			break;
		case 24:
			create_bullet("pellet",canvas.height-canvas.height/1.5);
			create_bullet("pellet",canvas.height/1.5);
			break;
		
		case 29:
			create_bullet("pellet",canvas.height-canvas.height/1.5);
			create_bullet("pellet",canvas.height/1.5);
			break;
		case 30:
			create_bullet("pellet",canvas.height-canvas.height/1.4);
			create_bullet("pellet",canvas.height/1.4);
			break;
		case 31:
			create_bullet("pellet",canvas.height-canvas.height/1.3);
			create_bullet("pellet",canvas.height/1.3);
			break;
		case 32:
			create_bullet("pellet",canvas.height-canvas.height/1.2);
			create_bullet("pellet",canvas.height/1.2);
			break;
		
		case 37:
			create_bullet("pellet",canvas.height/1.2);
			break;
		case 38:
			create_bullet("pellet",canvas.height/1.2);
			create_bullet("pellet",canvas.height/1.4);
			break;
		case 39:
			create_bullet("pellet",canvas.height/1.2);
			create_bullet("pellet",canvas.height/1.4);
			create_bullet("pellet",canvas.height/1.6);
			break;
		case 40:
			create_bullet("pellet",canvas.height/1.2);
			create_bullet("pellet",canvas.height/1.4);
			create_bullet("pellet",canvas.height/1.6);
			create_bullet("pellet",canvas.height/1.8);
			break;
			
		case 45:
			create_bullet("pellet",canvas.height-canvas.height/1.2);
			break;
		case 46:
			create_bullet("pellet",canvas.height-canvas.height/1.2);
			create_bullet("pellet",canvas.height-canvas.height/1.4);
			break;
		case 47:
			create_bullet("pellet",canvas.height-canvas.height/1.2);
			create_bullet("pellet",canvas.height-canvas.height/1.4);
			create_bullet("pellet",canvas.height-canvas.height/1.6);
			break;
		case 48:
			create_bullet("pellet",canvas.height-canvas.height/1.2);
			create_bullet("pellet",canvas.height-canvas.height/1.4);
			create_bullet("pellet",canvas.height-canvas.height/1.6);
			create_bullet("pellet",canvas.height-canvas.height/1.8);
			break;
			
		case 53:
			create_bullet("pellet",canvas.height/2);
			break;
		case 54:
			create_bullet("pellet",canvas.height/2);
			create_bullet("pellet",canvas.height/1.9);
			create_bullet("pellet",canvas.height-canvas.height/1.9);
			break;
		case 55:
			create_bullet("pellet",canvas.height/2);
			create_bullet("pellet",canvas.height/1.9);
			create_bullet("pellet",canvas.height/1.8);
			create_bullet("pellet",canvas.height-canvas.height/1.9);
			create_bullet("pellet",canvas.height-canvas.height/1.8);
			break;
		case 56:
			create_bullet("pellet",canvas.height/2);
			create_bullet("pellet",canvas.height/1.9);
			create_bullet("pellet",canvas.height/1.8);
			create_bullet("pellet",canvas.height/1.7);
			create_bullet("pellet",canvas.height-canvas.height/1.9);
			create_bullet("pellet",canvas.height-canvas.height/1.8);
			create_bullet("pellet",canvas.height-canvas.height/1.7);
			create_bullet("warning",canvas.height/2,canvas.height/8,0,1);
			break;
		
		case 64:
			create_bullet("lazer",canvas.height/2,canvas.height/8,0,128);
			create_bullet("triangle",canvas.height/1.25,96,0,4);
			create_bullet("triangle",canvas.height/5,96,0,4);
			create_effect("flash",100,"rgba(255,255,255,0.9)");
			create_bullet("warning_end",0);
			break;
		case 72:
			create_bullet("triangle",canvas.height/2,88,0,4);
			break;
		case 80:
			create_bullet("triangle",canvas.height/1.125,80,0,4);
			create_bullet("triangle",canvas.height/8,80,0,4);
			break;
		case 88:
			create_bullet("triangle",canvas.height/1.5,48,0,4);
			create_bullet("triangle",canvas.height/2,56,0,4);
			create_bullet("triangle",canvas.height/3,48,0,4);
			break;
		case 96:
			create_bullet("triangle",canvas.height/1.125,96,0,4);
			create_bullet("triangle",canvas.height/8,96,0,4);
			break;
			
		case 112:
			create_effect("flash",25,"rgba(242, 0, 128, 0.3)");
			break;
		case 114:
			create_effect("flash",25,"rgba(242, 0, 128, 0.3)");
			break;
		case 116:
			create_effect("flash",25,"rgba(242, 0, 128, 0.3)");
			break;
		case 118:
			create_effect("flash",25,"rgba(242, 0, 128, 0.3)");
			break;
		case 120:
			create_bullet("warning",canvas.height/2,canvas.height/6,0,1);
			create_effect("flash",15,"rgba(242, 0, 128, 0.3)");
			break;
		case 121:
			create_effect("flash",15,"rgba(242, 0, 128, 0.3)");
			break;
		case 122:
			create_effect("flash",15,"rgba(242, 0, 128, 0.3)");
			break;
		case 123:
			create_effect("flash",15,"rgba(242, 0, 128, 0.3)");
			break;
		case 124:
			create_effect("flash",15,"rgba(242, 0, 128, 0.3)");
			break;
		case 125:
			create_effect("flash",15,"rgba(242, 0, 128, 0.3)");
			break;
		case 126:
			create_effect("flash",15,"rgba(242, 0, 128, 0.3)");
			break;
		case 127:
			create_effect("flash",15,"rgba(242, 0, 128, 0.3)");
			break;
		
		case 128:
			create_bullet("lazer",canvas.height/2,canvas.height/6,0,128);
			create_effect("flash",100,"#ffffff");
			create_bullet("warning_end",0);
			break;
		case 129:
			create_bullet("warning",canvas.height-(canvas.height/1.05),32,0,0.5);
			create_bullet("warning",canvas.height/1.05,32,0,0.5);
			create_bullet("warning",canvas.height-(canvas.height/1.15),32,0,0.5);
			create_bullet("warning",canvas.height/1.15,32,0,0.5);
			create_bullet("warning",canvas.height-(canvas.height/1.25),32,0,0.5);
			create_bullet("warning",canvas.height/1.25,32,0,0.5);
			break;
		case 136:
			create_bullet("lazer",canvas.height-(canvas.height/1.05),32,0,128);
			create_bullet("lazer",canvas.height/1.05,32,0,128);
			create_bullet("warning_end",0);
			break;
		case 137:
			create_bullet("lazer",canvas.height-(canvas.height/1.15),32,0,128);
			create_bullet("lazer",canvas.height/1.15,32,0,128);
			break;
		case 138:
			create_bullet("lazer",canvas.height-(canvas.height/1.25),32,0,128);
			create_bullet("lazer",canvas.height/1.25,32,0,128);
			break;
		case 140:
			create_bullet("triangle",canvas.height-(canvas.height/1.2),96,0,32);
			create_bullet("warning",canvas.height/6,canvas.height/6,0,1);
			break;
		case 142:
			create_bullet("triangle",canvas.height/1.2,96,0,32);
			break;
		case 144:
			create_bullet("wall",canvas.height/6,canvas.height/6,0,32);
			break;
		case 146:
			create_bullet("wall",canvas.height/6,canvas.height/3,0,32);
			break;
		case 148:
			create_bullet("lazer",canvas.height/6,canvas.height/6,0,128);
			create_bullet("warning_end",0);
			break;
		case 150:
			create_bullet("lazer",canvas.height/3,64,0,128);
			break;
		case 151:
			create_bullet("lazer",canvas.height/2,64,0,128);
			break;
		case 152: 
			create_bullet("bucket",canvas.width/4);
			create_bullet("warning",canvas.height/4,canvas.height/1.5,0,1);
			break;
		case 160:
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/6,0,128);
			break;
		case 168:
			create_bullet("lazer",canvas.height-(canvas.height/1.2),canvas.height/12,0,128);
			create_bullet("warning_end",0);
			break;
		case 169:
			create_bullet("lazer",canvas.height-(canvas.height/1.4),canvas.height/12,0,128);
			break;
		case 170:
			create_bullet("lazer",canvas.height-(canvas.height/1.6),canvas.height/12,0,128);
			break;
		case 172:
			create_bullet("pellet",canvas.height,128,0,16);
			create_bullet("warning",canvas.height/2,canvas.height/6,0,1);
			break;
		case 173:
			create_bullet("pellet",canvas.height/1.1,128,0,16);
			break;
		case 174:
			create_bullet("pellet",canvas.height/1.3,128,0,16);
			break;
		case 175:
			create_bullet("pellet",canvas.height/1.4,128,0,16);
			break;
		case 180:
			create_bullet("lazer",canvas.height/2,canvas.height/6,0,128);
			create_bullet("warning_end",0);
			break;
		case 181: 
			create_bullet("warning",canvas.height/2,canvas.height/4,0,1);
			break;
		case 188:
			create_bullet("lazer",canvas.height/1.1,canvas.height/8,0,128);
			break;
		case 190:
			create_bullet("lazer",canvas.height/2,canvas.height/8,0,128);
			break;
		case 192:
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/8,0,128);
			break;
		case 193: 
			create_bullet("lazer",canvas.height/2,canvas.height/8,0,128);
			break;
		case 194: 
			create_bullet("lazer",canvas.height/1.1,canvas.height/8,0,128);
			break;
		case 196:
			create_bullet("lazer",canvas.height/2,canvas.height/6,0,128);
			create_bullet("pellet",canvas.height/1.1,64,0,16);
			create_bullet("pellet",canvas.height/1.3,64,0,16);
			create_bullet("pellet",canvas.height-(canvas.height/1.1),64,0,16);
			create_bullet("pellet",canvas.height-(canvas.height/1.3),64,0,16);
			create_bullet("warning_end",0);
			break;
		case 198: 
			create_bullet("pellet",canvas.height/1.1,64,0,16);
			create_bullet("pellet",canvas.height/1.3,64,0,16);
			create_bullet("pellet",canvas.height-(canvas.height/1.1),64,0,16);
			create_bullet("pellet",canvas.height-(canvas.height/1.3),64,0,16);
			break;
		case 199: 
			create_bullet("pellet",canvas.height/1.1,64,0,16);
			create_bullet("pellet",canvas.height/1.3,64,0,16);
			create_bullet("pellet",canvas.height-(canvas.height/1.1),64,0,16);
			create_bullet("pellet",canvas.height-(canvas.height/1.3),64,0,16);
			break;
		
		case 204: 
			create_bullet("lazer",canvas.height/1.1,canvas.height/10,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/10,0,128);
			create_bullet("warning_vertical",canvas.width/1.1,canvas.width/1.5,0,6);
			create_bullet("warning_vertical",canvas.width-(canvas.width/1.1),canvas.width/1.5,0,6);
			break;
		case 206: 
			create_bullet("lazer",canvas.height/1.3,canvas.height/10,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.3),canvas.height/10,0,128);
			break;
		case 208: 
			create_bullet("lazer_vertical",canvas.width/1.1,canvas.width/10,0,128);
			create_bullet("lazer_vertical",canvas.width-(canvas.width/1.1),canvas.width/10,0,128);
			create_bullet("warning_end",0);
			break;
		case 209: 
			create_bullet("lazer_vertical",canvas.width/1.3,canvas.width/10,0,128);
			create_bullet("lazer_vertical",canvas.width-(canvas.width/1.3),canvas.width/10,0,128);
			create_bullet("warning",canvas.height/1.1,canvas.height/4,0,4);
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/4,0,4);
			break;
		case 210: 
			create_bullet("lazer_vertical",canvas.width/1.5,canvas.width/10,0,128);
			create_bullet("lazer_vertical",canvas.width-(canvas.width/1.5),canvas.width/10,0,128);
			break;
		case 212: 
			create_bullet("lazer",canvas.height/1.1,canvas.height/4,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/4,0,128);
			create_bullet("warning_end",0);
			break;
		case 216: 
			create_bullet("wall",canvas.height/1.1,canvas.height/6,0,32);
			create_bullet("wall",canvas.height-(canvas.height/1.1),canvas.height/6,0,32);
			create_bullet("warning",canvas.height/1.1,canvas.height/4,0,4);
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/4,0,4);
			break;
		case 217: 
			create_bullet("wall",canvas.height/1.1,canvas.height/6,0,32);
			create_bullet("wall",canvas.height-(canvas.height/1.1),canvas.height/6,0,32);
			break;
		case 218: 
			create_bullet("wall",canvas.height/1.1,canvas.height/6,0,32);
			create_bullet("wall",canvas.height-(canvas.height/1.1),canvas.height/6,0,32);
			break;
		case 220: 
			create_bullet("bucket",canvas.width/4);
			break;
		case 224: 
			create_bullet("lazer",canvas.height/1.1,canvas.height/4,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/4,0,128);
			create_bullet("warning_end",0);
			break;
		case 228: 
			create_bullet("lazer",canvas.height/1.1,canvas.height/8,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/8,0,128);
			create_bullet("warning_vertical",canvas.width/20,canvas.width/2,0,4);
			break;
		case 232:
			create_bullet("lazer",canvas.height/1.1,canvas.height/12,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/12,0,128);
			break;
		case 236: 
			create_bullet("lazer_vertical",0,canvas.width/20,0,128);
			create_bullet("warning",canvas.height/1.1,canvas.height/4,0,4);
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/4,0,4);
			break;
		case 238: 
			create_bullet("lazer_vertical",canvas.width/15,canvas.width/19,0,128);
			break;
		case 240: 
			create_bullet("lazer_vertical",canvas.width/10,canvas.width/17,0,128);
			break;
		case 242: 
			create_bullet("lazer_vertical",canvas.width/5,canvas.width/15,0,128);
			break;
		case 244: 
			create_bullet("lazer_vertical",canvas.width/4,canvas.width/13,0,128);
			create_bullet("lazer",canvas.height/1.05,canvas.height/8,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.05),canvas.height/8,0,128);
			create_bullet("warning_end",0);
			break;
		case 245:
			create_bullet("warning",canvas.height/2,canvas.height/2,0,4);
			break;
		case 252: 
			create_bullet("lazer",canvas.height/2,canvas.height/4,0,128);
			break;
		case 254: 
			create_bullet("lazer",canvas.height/2,canvas.height/3,0,128);
			break;
		case 256: 
			create_bullet("warning_end",0);
			create_effect("flash",250,"#ffffff");
			break;
		case 270: 
			global_level_complete = true;
			sound_level_complete.currentTime = 0;
			sound_level_complete.play();
			break;
	}
	
	level_bullet_timer_tick = -1;
	/*
	ctx.fillStyle = "#ffffff";
	ctx.fillText(level_bullet_timer,32,92);
	ctx.fillText(bullet_type.length,32,128);
	ctx.fillText(effect_type.length,32,160); //*/
}

function run_Dystopian() {
	if (level_bullet_timer == -1){
		if (level_timer_started == false){
			global_timer = accurateInterval(1000 * 60 / 211.204, function(){ level_bullet_timer += 1; level_bullet_timer_tick = level_bullet_timer; });
			level_timer_started = true;
		}
		level_bullet_timer = 0;
	}
	
	switch(level_bullet_timer_tick) {
		case 0: 
			create_bullet("lazer_vertical",canvas.width-(canvas.width/1.1),canvas.width/4,0,128);
			create_bullet("lazer_vertical",canvas.width/1.1,canvas.width/4,0,128);
			create_effect("flash",100,"#ffffff");
			break;
		case 4: 
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/4,0,2);
			create_bullet("warning",canvas.height/1.1,canvas.height/4,0,2);
			break;
		case 8: 
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/4,0,128);
			create_bullet("lazer",canvas.height/1.1,canvas.height/4,0,128);
			create_bullet("warning_end",0);
			create_effect("flash",50,"rgba(255,255,255,0.5)");
			break;
		case 12: 
			create_bullet("warning_vertical",canvas.width-(canvas.width/1.1),canvas.width/4,0,4);
			create_bullet("warning_vertical",canvas.width/1.1,canvas.width/4,0,4);
			break;
		case 16: 
			create_bullet("lazer_vertical",canvas.width-(canvas.width/1.1),canvas.width/4,0,128);
			create_bullet("lazer_vertical",canvas.width/1.1,canvas.width/4,0,128);
			create_bullet("warning_end",0);
			create_effect("flash",100,"#ffffff");
			break;
		case 20: 
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/4,0,2);
			create_bullet("warning",canvas.height/1.1,canvas.height/4,0,2);
			break;
		case 24: 
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/4,0,128);
			create_bullet("lazer",canvas.height/1.1,canvas.height/4,0,128);
			create_bullet("warning_end",0);
			create_effect("flash",50,"rgba(255,255,255,0.5)");
			break;
		case 28: 
			create_bullet("warning",canvas.height/2,canvas.height/4,0,4);
			break;
		case 32: 
			create_bullet("gear",canvas.height/2,canvas.height/12,0,16,8);
			create_bullet("warning_end",0);
			create_effect("flash",50,"#ffffff");
			break;
		case 33: 
			create_bullet("gear",canvas.height/2,canvas.height/12,0,16,-8);
			break;
		case 34: 
			create_bullet("gear",canvas.height/2,canvas.height/12,0,16,8);
			break;
		case 36: 
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/4,0,2);
			create_bullet("warning",canvas.height/1.1,canvas.height/4,0,2);
			break;
		case 40: 
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/4,0,128);
			create_bullet("lazer",canvas.height/1.1,canvas.height/4,0,128);
			create_bullet("warning_end",0);
			create_effect("flash",50,"rgba(255,255,255,0.5)");
			break;
		case 44: 
			create_bullet("warning",canvas.height/2,canvas.height/4,0,4);
			create_bullet("warning_vertical",canvas.width-(canvas.width/1.1),canvas.width/4,0,4);
			create_bullet("warning_vertical",canvas.width/1.1,canvas.width/4,0,4);
			break;
		case 48: 
			create_bullet("lazer_vertical",canvas.width-(canvas.width/1.1),canvas.width/4,0,128);
			create_bullet("lazer_vertical",canvas.width/1.1,canvas.width/4,0,128);
			create_bullet("gear",canvas.height/2,canvas.height/12,0,16,8);
			create_bullet("warning_end",0);
			create_effect("flash",100,"#ffffff");
		case 49: 
			create_bullet("gear",canvas.height/2,canvas.height/12,0,16,-8);
			break;
		case 50: 
			create_bullet("gear",canvas.height/2,canvas.height/12,0,16,8);
			break;
		case 52: 
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/4,0,2);
			create_bullet("warning",canvas.height/1.1,canvas.height/4,0,2);
			break;
		case 56: 
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/4,0,128);
			create_bullet("lazer",canvas.height/1.1,canvas.height/4,0,128);
			create_bullet("warning_end",0);
			create_effect("flash",50,"rgba(255,255,255,0.5)");
			break;
		case 64: 
			create_effect("flash",150,"#ffffff");
			create_bullet("triangle",canvas.height/2,canvas.height/10,0,4);
			break;
		case 65: 
			create_bullet("triangle",canvas.height/1.1,canvas.height/16,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.1),canvas.height/16,0,4);
			break;
		case 66: 
			create_bullet("triangle",canvas.height/1.005,canvas.height/20,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.005),canvas.height/20,0,4);
			create_bullet("triangle",canvas.height/2,canvas.height/8,0,4);
			break;
		case 67: 
			create_bullet("triangle",canvas.height/1.2,canvas.height/16,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.2),canvas.height/16,0,4);
			break;
		case 68: 
			create_bullet("triangle",canvas.height/1.005,canvas.height/20,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.005),canvas.height/20,0,4);
			create_bullet("triangle",canvas.height/2,canvas.height/8,0,4);
			break;
		case 69: 
			create_bullet("triangle",canvas.height,canvas.height/20,0,4);
			create_bullet("triangle",canvas.height,canvas.height/20,0,4);
			break;
		case 70: 
			create_bullet("triangle",canvas.height/1.005,canvas.height/24,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.005),canvas.height/24,0,4);
			break;
		case 71: 
			create_bullet("triangle",canvas.height/1.05,canvas.height/24,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.05),canvas.height/24,0,4);
			create_bullet("triangle",canvas.height/1.15,canvas.height/20,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.15),canvas.height/20,0,4);
			break;
		case 73: 
			create_bullet("triangle",canvas.height/1.3,canvas.height/15,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.3),canvas.height/15,0,4);
			break;
		case 74: 
			create_bullet("triangle",canvas.height/1.4,canvas.height/16,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.4),canvas.height/16,0,4);
			create_bullet("triangle",canvas.height/1.05,canvas.height/10,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.05),canvas.height/10,0,4);
			break;
		case 75: 
			create_bullet("triangle",canvas.height/1.3,canvas.height/15,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.3),canvas.height/15,0,4);
			break;
		case 76: 
			create_bullet("triangle",canvas.height/1.2,canvas.height/15,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.2),canvas.height/15,0,4);
			break;
		case 77: 
			create_bullet("triangle",canvas.height/1.4,canvas.height/10,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.4),canvas.height/10,0,4);
			break;
		case 78: 
			create_bullet("triangle",canvas.height/1.2,canvas.height/18,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.2),canvas.height/18,0,4);
			break;
		case 79: 
			create_bullet("triangle",canvas.height/1.3,canvas.height/14,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.3),canvas.height/14,0,4);
			break;
		case 80: 
			create_bullet("triangle",canvas.height/2,canvas.height/20,0,4);
			break;
		case 81: 
			create_bullet("triangle",0,canvas.height/10,0,4);
			create_bullet("triangle",canvas.height,canvas.height/10,0,4);
			break;
		case 82: 
			create_bullet("triangle",canvas.height/2,canvas.height/15,0,4);
			create_bullet("triangle",canvas.height/1.05,canvas.height/10,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.05),canvas.height/10,0,4);
			break;
		case 83: 
			create_bullet("triangle",canvas.height/1.3,canvas.height/14,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.3),canvas.height/14,0,4);
			break;
		case 84: 
			create_bullet("triangle",canvas.height/1.2,canvas.height/15,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.2),canvas.height/15,0,4);
			break;
		case 85: 
			create_bullet("triangle",canvas.height/2,canvas.height/10,0,4);
			break;
		case 86: 
			create_bullet("triangle",canvas.height/1.05,canvas.height/10,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.05),canvas.height/10,0,4);
			break;
		case 87: 
			create_bullet("triangle",canvas.height/2,canvas.height/15,0,4);
			create_bullet("triangle",canvas.height/1.05,canvas.height/10,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.05),canvas.height/10,0,4);
			break;
		case 88: 
			create_bullet("triangle",canvas.height/1.4,canvas.height/16,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.4),canvas.height/16,0,4);
			create_bullet("triangle",canvas.height/1.05,canvas.height/10,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.05),canvas.height/10,0,4);
			break;
		case 89: 
			create_bullet("triangle",canvas.height/1.3,canvas.height/15,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.3),canvas.height/15,0,4);
			break;
		case 90: 
			create_bullet("triangle",canvas.height/1.2,canvas.height/15,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.2),canvas.height/15,0,4);
			break;
		case 91: 
			create_bullet("triangle",canvas.height/1.4,canvas.height/10,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.4),canvas.height/10,0,4);
			break;
		case 92: 
			create_bullet("triangle",canvas.height/1.2,canvas.height/18,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.2),canvas.height/18,0,4);
			break;
		case 93: 
			create_bullet("triangle",canvas.height/1.3,canvas.height/14,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.3),canvas.height/14,0,4);
			break;
		case 94: 
			create_bullet("triangle",canvas.height/2,canvas.height/20,0,4);
			break;
		case 95: 
			create_bullet("triangle",0,canvas.height/10,0,4);
			create_bullet("triangle",canvas.height,canvas.height/10,0,4);
			break;
		case 96: 
			create_bullet("triangle",canvas.height/2,canvas.height/15,0,4);
			create_bullet("triangle",canvas.height/1.05,canvas.height/10,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.05),canvas.height/10,0,4);
			break;
		case 97: 
			create_bullet("triangle",canvas.height/1.3,canvas.height/14,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.3),canvas.height/14,0,4);
			break;
		case 98: 
			create_bullet("triangle",canvas.height/1.2,canvas.height/15,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.2),canvas.height/15,0,4);
			break;
		case 99: 
			create_bullet("triangle",canvas.height/2,canvas.height/10,0,4);
			break;
		case 100: 
			create_bullet("triangle",canvas.height/1.05,canvas.height/10,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.05),canvas.height/10,0,4);
			break;
		case 101: 
			create_bullet("triangle",canvas.height/2,canvas.height/15,0,4);
			create_bullet("triangle",canvas.height/1.05,canvas.height/10,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.05),canvas.height/10,0,4);
			break;
		case 102: 
			create_bullet("triangle",canvas.height/1.05,canvas.height/10,0,4);
			create_bullet("triangle",canvas.height-(canvas.height/1.05),canvas.height/10,0,4);
			break;
		case 103: 
			create_bullet("triangle",canvas.height/2,canvas.height/10,0,4);
			break;
		case 104: 
			create_bullet("triangle",canvas.height/2,canvas.height/5,0,4);
			break;
		case 120: 
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/2,0,1);
			create_bullet("warning",canvas.height/1.1,canvas.height/2,0,1);
			break;
		case 128:
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/3,0,128);
			create_bullet("lazer",canvas.height/1.1,canvas.height/3,0,128);
			create_bullet("warning_end",0);
			create_effect("flash",100,"#ffffff");
			break;
		case 132: 
			create_bullet("lazer",canvas.height/1.1,canvas.height/8,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/8,0,128);
			break;
		case 134: 
			create_bullet("lazer",canvas.height/1.2,canvas.height/8,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.2),canvas.height/8,0,128);
			break;
		case 136: 
			create_bullet("lazer",canvas.height/1.3,canvas.height/8,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.3),canvas.height/8,0,128);
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/2,0,1);
			create_bullet("warning",canvas.height/1.1,canvas.height/2,0,1);
			break;
		case 137: 
			create_bullet("wall",canvas.height-(canvas.height/1.1),canvas.height/6,0,32);
			create_bullet("wall",canvas.height/1.1,canvas.height/6,0,32);
			break;
		case 138: 
			create_bullet("wall",canvas.height-(canvas.height/1.1),canvas.height/6,0,32);
			create_bullet("wall",canvas.height/1.1,canvas.height/6,0,32);
			break;
		case 139: 
			create_bullet("wall",canvas.height-(canvas.height/1.1),canvas.height/6,0,32);
			create_bullet("wall",canvas.height/1.1,canvas.height/6,0,32);
			break;
		case 140: 
			create_bullet("lazer",canvas.height/1.1,canvas.height/8,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/8,0,128);
			create_bullet("warning_end",0);
			break;
		case 142: 
			create_bullet("lazer",canvas.height/1.2,canvas.height/8,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.2),canvas.height/8,0,128);
			break;
		case 144: 
			create_bullet("lazer",canvas.height/1.3,canvas.height/8,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.3),canvas.height/8,0,128);
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/2,0,1);
			create_bullet("warning",canvas.height/1.1,canvas.height/2,0,1);
			break;
		case 145: 
			create_bullet("wall_special",canvas.height/2,canvas.height/2,0,6,280);
			break;
		case 148: 
			create_bullet("lazer",canvas.height/1.1,canvas.height/8,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/8,0,128);
			create_bullet("warning_end",0);
			break;
		case 150: 
			create_bullet("lazer",canvas.height/1.2,canvas.height/8,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.2),canvas.height/8,0,128);
			break;
		case 152: 
			create_bullet("lazer",canvas.height/1.3,canvas.height/8,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.3),canvas.height/8,0,128);
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/2,0,1);
			create_bullet("warning",canvas.height/1.1,canvas.height/2,0,1);
			break;
		case 156: 
			create_bullet("lazer",canvas.height/1.1,canvas.height/8,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/8,0,128);
			create_bullet("warning_end",0);
			break;
		case 158: 
			create_bullet("lazer",canvas.height/1.2,canvas.height/8,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.2),canvas.height/8,0,128);
			break;
		case 160: 
			create_bullet("lazer",canvas.height/1.3,canvas.height/8,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.3),canvas.height/8,0,128);
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/2,0,1);
			create_bullet("warning",canvas.height/1.1,canvas.height/2,0,1);
			create_bullet("warning_vertical",canvas.width-(canvas.width/1.1),canvas.width/4,0,4);
			create_bullet("warning_vertical",canvas.width/1.1,canvas.width/4,0,4);
			break;
		case 164: 
			create_bullet("lazer",canvas.height/1.1,canvas.height/8,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/8,0,128);
			create_bullet("lazer_vertical",canvas.width-(canvas.width/1.1),canvas.width/8,0,128);
			create_bullet("lazer_vertical",canvas.width/1.1,canvas.width/8,0,128);
			create_bullet("warning_end",0);
			break;
		case 166: 
			create_bullet("lazer",canvas.height/1.2,canvas.height/8,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.2),canvas.height/8,0,128);
			create_bullet("lazer_vertical",canvas.width-(canvas.width/1.2),canvas.width/8,0,128);
			create_bullet("lazer_vertical",canvas.width/1.2,canvas.width/8,0,128);
			break;
		case 168: 
			create_bullet("lazer",canvas.height/1.3,canvas.height/8,0,128);
			create_bullet("lazer",canvas.height-(canvas.height/1.3),canvas.height/8,0,128);
			create_bullet("lazer_vertical",canvas.width-(canvas.width/1.3),canvas.width/8,0,128);
			create_bullet("lazer_vertical",canvas.width/1.3,canvas.width/8,0,128);
			create_bullet("gear",canvas.height-(canvas.height/1.3),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.3,canvas.height/12,0,16,8);
			create_bullet("warning_vertical",canvas.width-(canvas.width/1.1),canvas.width/4,0,4);
			create_bullet("warning_vertical",canvas.width/1.1,canvas.width/4,0,4);
			break;
		case 169: 
			create_bullet("gear",canvas.height-(canvas.height/1.3),canvas.height/12,0,16,-8);
			create_bullet("gear",canvas.height/1.3,canvas.height/12,0,16,-8);
			break;
		case 170: 
			create_bullet("gear",canvas.height-(canvas.height/1.3),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.3,canvas.height/12,0,16,8);
			break;
		case 172: 
			create_bullet("lazer_vertical",canvas.width-(canvas.width/1.1),canvas.width/8,0,128);
			create_bullet("lazer_vertical",canvas.width/1.1,canvas.width/8,0,128);
			create_bullet("warning_end",0);
			break;
		case 174: 
			create_bullet("lazer_vertical",canvas.width-(canvas.width/1.2),canvas.width/8,0,128);
			create_bullet("lazer_vertical",canvas.width/1.2,canvas.width/8,0,128);
			create_bullet("warning",canvas.height/2,canvas.height/8,0,4);
			break;
		case 176: 
			create_bullet("lazer_vertical",canvas.width-(canvas.width/1.3),canvas.width/8,0,128);
			create_bullet("lazer_vertical",canvas.width/1.3,canvas.width/8,0,128);
			create_bullet("gear",canvas.height/2,canvas.height/12,0,16,8);
			create_bullet("warning_end",0);
			create_effect("flash",50,"rgba(255, 255, 255, 1)");
			break;
		case 177:
			create_bullet("gear",canvas.height/2,canvas.height/12,0,16,-8);
			create_bullet("warning_vertical",canvas.width-(canvas.width/1.1),canvas.width/4,0,4);
			create_bullet("warning_vertical",canvas.width/1.1,canvas.width/4,0,4);
			break;
		case 178:
			create_bullet("gear",canvas.height/2,canvas.height/12,0,16,8);
			break;
		case 180: 
			create_bullet("lazer_vertical",canvas.width-(canvas.width/1.1),canvas.width/8,0,128);
			create_bullet("lazer_vertical",canvas.width/1.1,canvas.width/8,0,128);
			create_bullet("warning_end",0);
			break;
		case 182: 
			create_bullet("lazer_vertical",canvas.width-(canvas.width/1.2),canvas.width/9,0,128);
			create_bullet("lazer_vertical",canvas.width/1.2,canvas.width/9,0,128);
			break;
		case 184: 
			create_bullet("lazer_vertical",canvas.width-(canvas.width/1.3),canvas.width/10,0,128);
			create_bullet("lazer_vertical",canvas.width/1.3,canvas.width/10,0,128);
			break;
		case 188: 
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/12,0,2);
			create_bullet("warning",canvas.height/1.1,canvas.height/12,0,2);
			break;
		case 192: 
			create_bullet("gear",canvas.height-(canvas.height/1.1),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.1,canvas.height/12,0,16,-8);
			create_bullet("warning_end",0);
			create_effect("flash",100,"rgba(255, 255, 255, 1)");
			break;
		case 193: 
			create_bullet("gear",canvas.height-(canvas.height/1.1),canvas.height/12,0,16,-8);
			create_bullet("gear",canvas.height/1.1,canvas.height/12,0,16,8);
			create_bullet("warning",canvas.height-(canvas.height/1.3),canvas.height/12,0,2);
			create_bullet("warning",canvas.height/1.3,canvas.height/12,0,2);
			break;
		case 194: 
			create_bullet("gear",canvas.height-(canvas.height/1.1),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.1,canvas.height/12,0,16,-8);
			break;
		case 196: 
			create_bullet("gear",canvas.height-(canvas.height/1.3),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.3,canvas.height/12,0,16,-8);
			create_bullet("warning_end",0);
			create_effect("flash",40,"rgba(255, 255, 255, 1)");
			break;
		case 197: 
			create_bullet("gear",canvas.height-(canvas.height/1.3),canvas.height/12,0,16,-8);
			create_bullet("gear",canvas.height/1.3,canvas.height/12,0,16,8);
			create_bullet("warning",canvas.height-(canvas.height/1.5),canvas.height/12,0,2);
			create_bullet("warning",canvas.height/1.5,canvas.height/12,0,2);
			break;
		case 198: 
			create_bullet("gear",canvas.height-(canvas.height/1.3),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.3,canvas.height/12,0,16,-8);
			break;
		case 200: 
			create_bullet("gear",canvas.height-(canvas.height/1.5),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.5,canvas.height/12,0,16,-8);
			create_bullet("warning_end",0);
			create_effect("flash",40,"rgba(255, 255, 255, 1)");
			break;
		case 201: 
			create_bullet("gear",canvas.height-(canvas.height/1.5),canvas.height/12,0,16,-8);
			create_bullet("gear",canvas.height/1.5,canvas.height/12,0,16,8);
			create_bullet("warning",canvas.height/2,canvas.height/12,0,2);
			break;
		case 202: 
			create_bullet("gear",canvas.height-(canvas.height/1.5),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.5,canvas.height/12,0,16,-8);
			break;
		case 204: 
			create_bullet("gear",canvas.height/2,canvas.height/12,0,16,-8);
			create_bullet("warning_end",0);
			create_effect("flash",40,"rgba(255, 255, 255, 1)");
			break;
		case 205: 
			create_bullet("gear",canvas.height/2,canvas.height/12,0,16,8);
			create_bullet("warning",canvas.height-(canvas.height/1.5),canvas.height/12,0,2);
			create_bullet("warning",canvas.height/1.5,canvas.height/12,0,2);
			break;
		case 206: 
			create_bullet("gear",canvas.height/2,canvas.height/12,0,16,-8);
			break;
		case 208: 
			create_bullet("gear",canvas.height-(canvas.height/1.5),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.5,canvas.height/12,0,16,-8);
			create_bullet("warning_end",0);
			create_effect("flash",40,"rgba(255, 255, 255, 1)");
			break;
		case 209: 
			create_bullet("gear",canvas.height-(canvas.height/1.5),canvas.height/12,0,16,-8);
			create_bullet("gear",canvas.height/1.5,canvas.height/12,0,16,8);
			create_bullet("warning",canvas.height-(canvas.height/1.3),canvas.height/12,0,2);
			create_bullet("warning",canvas.height/1.3,canvas.height/12,0,2);
			break;
		case 210: 
			create_bullet("gear",canvas.height-(canvas.height/1.5),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.5,canvas.height/12,0,16,-8);
			break;
		case 212: 
			create_bullet("gear",canvas.height-(canvas.height/1.3),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.3,canvas.height/12,0,16,-8);
			create_bullet("warning_end",0);
			create_effect("flash",40,"rgba(255, 255, 255, 1)");
			break;
		case 213: 
			create_bullet("gear",canvas.height-(canvas.height/1.3),canvas.height/12,0,16,-8);
			create_bullet("gear",canvas.height/1.3,canvas.height/12,0,16,8);
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/12,0,2);
			create_bullet("warning",canvas.height/1.1,canvas.height/12,0,2);
			break;
		case 214: 
			create_bullet("gear",canvas.height-(canvas.height/1.3),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.3,canvas.height/12,0,16,-8);
			break;
		case 216: 
			create_bullet("gear",canvas.height-(canvas.height/1.1),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.1,canvas.height/12,0,16,-8);
			create_bullet("warning_end",0);
			create_effect("flash",40,"rgba(255, 255, 255, 1)");
			break;
		case 217: 
			create_bullet("gear",canvas.height-(canvas.height/1.1),canvas.height/12,0,16,-8);
			create_bullet("gear",canvas.height/1.1,canvas.height/12,0,16,8);
			create_bullet("warning",canvas.height/2,canvas.height,0,8);
			break;
		case 218: 
			create_bullet("gear",canvas.height-(canvas.height/1.1),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.1,canvas.height/12,0,16,-8);
			break;
		case 220: 
			create_bullet("gear",canvas.height/2,canvas.height/12,0,16,-8);
			break;
		case 221: 
			create_bullet("gear",canvas.height-(canvas.height/1.5),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.5,canvas.height/12,0,16,-8);
			break;
		case 222: 
			create_bullet("gear",canvas.height-(canvas.height/1.3),canvas.height/12,0,16,-8);
			create_bullet("gear",canvas.height/1.3,canvas.height/12,0,16,8);
			break;
		case 223: 
			create_bullet("gear",canvas.height-(canvas.height/1.5),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.5,canvas.height/12,0,16,-8);
			break;
		case 224: 
			create_bullet("gear",canvas.height/2,canvas.height/12,0,16,-8);
			break;
		case 226: 
			create_bullet("gear",canvas.height-(canvas.height/1.1),canvas.height/12,0,16,-8);
			create_bullet("gear",canvas.height/1.1,canvas.height/12,0,16,8);
			break;
		case 227: 
			create_bullet("gear",canvas.height-(canvas.height/1.3),canvas.height/12,0,16,-8);
			create_bullet("gear",canvas.height/1.3,canvas.height/12,0,16,8);
			break;
		case 228: 
			create_bullet("gear",canvas.height-(canvas.height/1.5),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.5,canvas.height/12,0,16,-8);
			break;
		case 229: 
			create_bullet("gear",canvas.height-(canvas.height/1.3),canvas.height/12,0,16,-8);
			create_bullet("gear",canvas.height/1.3,canvas.height/12,0,16,8);
			break;
		case 230: 
			create_bullet("gear",canvas.height-(canvas.height/1.1),canvas.height/12,0,16,-8);
			create_bullet("gear",canvas.height/1.1,canvas.height/12,0,16,8);
			break;
		case 232: 
			create_bullet("gear",canvas.height/2,canvas.height/12,0,16,-8);
			break;
		case 233: 
			create_bullet("gear",canvas.height-(canvas.height/1.5),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.5,canvas.height/12,0,16,-8);
			break;
		case 234: 
			create_bullet("gear",canvas.height-(canvas.height/1.3),canvas.height/12,0,16,-8);
			create_bullet("gear",canvas.height/1.3,canvas.height/12,0,16,8);
			break;
		case 235: 
			create_bullet("gear",canvas.height-(canvas.height/1.5),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.5,canvas.height/12,0,16,-8);
			break;
		case 236: 
			create_bullet("gear",canvas.height/2,canvas.height/12,0,16,-8);
			break;
		case 238: 
			create_bullet("gear",canvas.height-(canvas.height/1.1),canvas.height/12,0,16,-8);
			create_bullet("gear",canvas.height/1.1,canvas.height/12,0,16,8);
			break;
		case 239: 
			create_bullet("gear",canvas.height-(canvas.height/1.3),canvas.height/12,0,16,-8);
			create_bullet("gear",canvas.height/1.3,canvas.height/12,0,16,8);
			break;
		case 240: 
			create_bullet("gear",canvas.height-(canvas.height/1.5),canvas.height/12,0,16,8);
			create_bullet("gear",canvas.height/1.5,canvas.height/12,0,16,-8);
			break;
		case 241: 
			create_bullet("gear",canvas.height-(canvas.height/1.3),canvas.height/12,0,16,-8);
			create_bullet("gear",canvas.height/1.3,canvas.height/12,0,16,8);
			break;
		case 242: 
			create_bullet("gear",canvas.height-(canvas.height/1.1),canvas.height/12,0,16,-8);
			create_bullet("gear",canvas.height/1.1,canvas.height/12,0,16,8);
			break;
		case 248: 
			create_bullet("warning",canvas.height/2,canvas.height/4,0,1);
			create_bullet("warning_vertical",canvas.width/2,canvas.width/4,0,1);
			break;
		case 256: 
			create_bullet("lazer_vertical",canvas.width/2,canvas.width/4,0,128);
			create_bullet("lazer",canvas.height/2,canvas.height/4,0,128);
			create_bullet("warning_end",0);
			create_effect("flash",150,"rgba(255, 255, 255, 1)");
			break;
		case 260: 
			create_bullet("lazer_vertical",canvas.width/2,canvas.width/18,0,128);
			create_bullet("lazer",canvas.height/2,canvas.height/18,0,128);
			create_effect("flash",40,"rgba(255, 255, 255, 0.5)");
			create_bullet("warning",canvas.height/1.1,canvas.height/2,0,8);
			break;
		case 262: 
			create_bullet("lazer_vertical",canvas.width/2,canvas.width/18,0,128);
			create_bullet("lazer",canvas.height/2,canvas.height/18,0,128);
			break;
		case 264: 
			create_bullet("lazer",canvas.height/1.1,canvas.height/4,0,128);
			create_effect("flash",40,"rgba(255, 255, 255, 0.5)");
			create_bullet("warning_end",0);
			break;
		case 268: 
			create_bullet("lazer_vertical",canvas.width/2,canvas.width/18,0,128);
			create_bullet("lazer",canvas.height/2,canvas.height/18,0,128);
			create_effect("flash",40,"rgba(255, 255, 255, 0.5)");
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/2,0,8);
			break;
		case 270: 
			create_bullet("lazer_vertical",canvas.width/2,canvas.width/18,0,128);
			create_bullet("lazer",canvas.height/2,canvas.height/18,0,128);
			break;
		case 272: 
			create_effect("flash",40,"rgba(255, 255, 255, 0.5)");
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/4,0,128);
			create_bullet("warning_end",0);
			break;
		case 276: 
			create_bullet("lazer_vertical",canvas.width/2,canvas.width/18,0,128);
			create_bullet("lazer",canvas.height/2,canvas.height/18,0,128);
			create_effect("flash",40,"rgba(255, 255, 255, 0.5)");
			create_bullet("warning_vertical",canvas.width-(canvas.width/1.1),canvas.width/2,0,8);
			break;
		case 278: 
			create_bullet("lazer_vertical",canvas.width/2,canvas.width/18,0,128);
			create_bullet("lazer",canvas.height/2,canvas.height/18,0,128);
			break;
		case 280: 
			create_bullet("lazer_vertical",canvas.width-(canvas.width/1.1),canvas.width/4,0,128);
			create_effect("flash",40,"rgba(255, 255, 255, 0.5)");
			create_bullet("warning_end",0);
			break;
		case 284: 
			create_bullet("lazer_vertical",canvas.width/2,canvas.width/18,0,128);
			create_bullet("lazer",canvas.height/2,canvas.height/18,0,128);
			create_effect("flash",40,"rgba(255, 255, 255, 0.5)");
			create_bullet("warning_vertical",canvas.width/1.1,canvas.width/2,0,8);
			break;
		case 286: 
			create_bullet("lazer_vertical",canvas.width/2,canvas.width/18,0,128);
			create_bullet("lazer",canvas.height/2,canvas.height/18,0,128);
			break;
		case 288: 
			create_bullet("lazer_vertical",canvas.width/1.1,canvas.width/4,0,128);
			create_effect("flash",40,"rgba(255, 255, 255, 0.5)");
			create_bullet("warning_end",0);
			break;
		case 292: 
			create_bullet("lazer_vertical",canvas.width/2,canvas.width/18,0,128);
			create_bullet("lazer",canvas.height/2,canvas.height/18,0,128);
			create_effect("flash",40,"rgba(255, 255, 255, 0.5)");
			create_bullet("warning_vertical",0,canvas.width/4,0,8);
			create_bullet("warning_vertical",canvas.width,canvas.width/4,0,8);
			break;
		case 294: 
			create_bullet("lazer_vertical",canvas.width/2,canvas.width/18,0,128);
			create_bullet("lazer",canvas.height/2,canvas.height/18,0,128);
			break;
		case 296: 
			create_bullet("lazer_vertical",0,canvas.width/6,0,128);
			create_bullet("lazer_vertical",canvas.width,canvas.width/6,0,128);
			create_effect("flash",40,"rgba(255, 255, 255, 0.5)");
			create_bullet("warning_end",0);
			break;
		case 300: 
			create_bullet("lazer_vertical",canvas.width/2,canvas.width/18,0,128);
			create_bullet("lazer",canvas.height/2,canvas.height/18,0,128);
			create_effect("flash",40,"rgba(255, 255, 255, 0.5)");
			create_bullet("warning",0,canvas.height/4,0,8);
			create_bullet("warning",canvas.height,canvas.height/4,0,8);
			break;
		case 302: 
			create_bullet("lazer_vertical",canvas.width/2,canvas.width/18,0,128);
			create_bullet("lazer",canvas.height/2,canvas.height/18,0,128);
			break;
		case 304: 
			create_bullet("lazer",0,canvas.height/6,0,128);
			create_bullet("lazer",canvas.height,canvas.height/6,0,128);
			create_effect("flash",40,"rgba(255, 255, 255, 0.5)");
			create_bullet("warning_end",0);
			break;
		case 308: 
			create_bullet("lazer_vertical",canvas.width/2,canvas.width/18,0,128);
			create_bullet("lazer",canvas.height/2,canvas.height/18,0,128);
			create_effect("flash",40,"rgba(255, 255, 255, 0.5)");
			create_bullet("warning",0,canvas.height/4,0,8);
			create_bullet("warning",canvas.height,canvas.height/4,0,8);
			create_bullet("warning_vertical",0,canvas.width/4,0,8);
			create_bullet("warning_vertical",canvas.width,canvas.width/4,0,8);
			break;
		case 310: 
			create_bullet("lazer_vertical",canvas.width/2,canvas.width/18,0,128);
			create_bullet("lazer",canvas.height/2,canvas.height/18,0,128);
			break;
		case 312: 
			create_bullet("lazer",0,canvas.height/6,0,128);
			create_bullet("lazer",canvas.height,canvas.height/6,0,128);
			create_bullet("lazer_vertical",0,canvas.width/6,0,128);
			create_bullet("lazer_vertical",canvas.width,canvas.width/6,0,128);
			create_effect("flash",40,"rgba(255, 255, 255, 0.5)");
			create_bullet("warning_end",0);
			break;
		case 316: 
			create_effect("flash",40,"rgba(255, 255, 255, 0.5)");
			create_bullet("warning",0,canvas.height/3,0,8);
			create_bullet("warning",canvas.height,canvas.height/3,0,8);
			create_bullet("warning_vertical",0,canvas.width/3,0,8);
			create_bullet("warning_vertical",canvas.width,canvas.width/3,0,8);
			break;
		case 318: 
			create_effect("flash",40,"rgba(255, 255, 255, 0.5)");
			break;
		case 320: 
			create_bullet("lazer",0,canvas.height/3,0,128);
			create_bullet("lazer",canvas.height,canvas.height/3,0,128);
			create_bullet("lazer_vertical",0,canvas.width/3,0,128);
			create_bullet("lazer_vertical",canvas.width,canvas.width/3,0,128);
			create_bullet("warning_end",0);
			create_effect("flash",150,"#ffffff");
			break;
		case 340: 
			global_level_complete = true;
			sound_level_complete.currentTime = 0;
			sound_level_complete.play();
			break;
	}
	
	level_bullet_timer_tick = -1;
	/*
	ctx.fillStyle = "#ffffff";
	ctx.fillText(level_bullet_timer,32,92);
	ctx.fillText(bullet_type.length,32,128);
	ctx.fillText(effect_type.length,32,160); //*/
}

function run_Finale() {
	if (level_bullet_timer == -1){
		if (level_timer_started == false){
			global_timer = accurateInterval(1000 * 60 / 220, function(){ level_bullet_timer += 1; level_bullet_timer_tick = level_bullet_timer; });
			level_timer_started = true;
		}
		level_bullet_timer = 0;
	}
	
	switch(level_bullet_timer_tick) {
		case 0: case 2: case 4: case 6: case 8: case 10: case 12: case 14: case 16: case 18: case 20: case 22: case 24: case 26: case 28: case 30: 
			create_effect("flash",50,"rgba(242, 0, 128, 0.3)");
			break;
		case 32: case 33: case 34: case 35: case 36: case 37: case 38: case 39: 
		case 40: case 41: case 42: case 43: case 44: case 45: case 46: case 47: 
		case 48: case 49: case 50: case 51: case 52: case 53: case 54: case 55: 
		case 57: case 58: case 59: 
			create_effect("flash",20,"rgba(242, 0, 128, 0.3)");
			break;
		case 56: 
			create_bullet("warning",canvas.height/1.1,canvas.height/3,0,4);
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/3,0,4);
			create_effect("flash",20,"rgba(242, 0, 128, 0.3)");
			break;
		case 63: 
			create_bullet("lazer",canvas.height/1.3,canvas.height/5,0,4);
			create_bullet("lazer",canvas.height-(canvas.height/1.3),canvas.height/5,0,4);
			break;
		case 64: 
			create_bullet("lazer",canvas.height/1.1,canvas.height/3,0,4);
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/3,0,4);
			create_effect("flash",100,"#ffffff");
			create_bullet("warning_end",0);
			break;
		case 67: 
			create_bullet("gear",canvas.height/1.3,canvas.height/15,0,16,8);
			create_bullet("warning",canvas.height/2,canvas.height/5,0,4);
			break;
		case 68: 
			create_bullet("gear",canvas.height-(canvas.height/1.3),canvas.height/15,0,16,-8);
			break;
		case 70: 
			create_bullet("gear",canvas.height/2,canvas.height/15,0,16,-8);
			break;
		case 72: 
			create_bullet("lazer",canvas.height/2,canvas.height/5,0,16,-8);
			create_effect("flash",40,"#ffffff");
			create_bullet("warning_end",0);
			break;
		case 73: 
			create_bullet("warning",canvas.height/1.1,canvas.height/3,0,4);
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/3,0,4);
			break;
		case 79: 
			create_bullet("lazer",canvas.height/1.1,canvas.height/3,0,4);
			break;
		case 80: 
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/3,0,4);
			create_effect("flash",80,"#ffffff");
			create_bullet("warning_end",0);
			break;
		case 83: 
			create_bullet("gear",canvas.height-(canvas.height/1.6),canvas.height/15,0,16,8);
			create_bullet("warning",canvas.height/2,canvas.height/5,0,4);
			break;
		case 84: 
			create_bullet("gear",canvas.height/1.6,canvas.height/15,0,16,-8);
			break;
		case 85: 
			create_bullet("gear",canvas.height/2,canvas.height/15,0,16,-8);
			break;
		case 87:
			create_bullet("gear",canvas.height/2,canvas.height/12,0,16,-8);
			break;
		case 88: 
			create_bullet("lazer",canvas.height/2,canvas.height/5,0,16,-8);
			create_effect("flash",40,"#ffffff");
			create_bullet("warning_end",0);
			break;
		case 90: 
			create_bullet("warning",canvas.height/2,canvas.height,0,12);
			break;
		case 92: 
			create_bullet("warning",canvas.height/2,canvas.height,0,12);
			break;
		case 94: 
			create_bullet("warning",canvas.height/2,canvas.height,0,12);
			break;
		case 96: 
			create_bullet("lazer",canvas.height/2,canvas.height/6,0,16);
			create_effect("flash",50,"#ffffff");
			create_bullet("warning_end",0);
			break;
		case 97: 
			create_bullet("warning",canvas.height/1.1,canvas.height/5,0,16);
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/5,0,16);
			break;
		case 99: 
			create_bullet("lazer",canvas.height/1.1,canvas.height/8,0,16);
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/8,0,16);
			create_bullet("warning_end",0);
			break;
		case 100: 
			create_bullet("lazer",canvas.height/1.2,canvas.height/8,0,16);
			create_bullet("lazer",canvas.height-(canvas.height/1.2),canvas.height/8,0,16);
			create_bullet("warning",canvas.height/1.1,canvas.height/8,0,16);
			create_bullet("warning",canvas.height-(canvas.height/1.1),canvas.height/8,0,16);
			break;
		case 102: 
			create_bullet("gear",canvas.height/2,canvas.height/15,0,24,-8);
			break;
		case 104: 
			create_bullet("lazer",canvas.height/1.1,canvas.height/7,0,16);
			create_bullet("lazer",canvas.height-(canvas.height/1.1),canvas.height/7,0,16);
			create_effect("flash",50,"#ffffff");
			create_bullet("warning_end",0);
			break;
		case 111: 
			create_bullet("gear",canvas.height/1.3,canvas.height/15,0,24,-8);
			create_bullet("gear",canvas.height-(canvas.height/1.3),canvas.height/15,0,24,-8);
			create_effect("flash",50,"#ffffff");
			break;
		case 112: 
			create_bullet("gear",canvas.height/1.5,canvas.height/15,0,24,-8);
			create_bullet("gear",canvas.height-(canvas.height/1.5),canvas.height/15,0,24,-8);
			create_effect("flash",20,"#ffffff");
			break;
		case 115: 
			create_bullet("gear",canvas.height/1.1,canvas.height/15,0,24,-8);
			create_bullet("gear",canvas.height-(canvas.height/1.1),canvas.height/15,0,24,-8);
			break;
		case 116: 
			create_bullet("gear",canvas.height/1.4,canvas.height/15,0,24,-8);
			create_bullet("gear",canvas.height-(canvas.height/1.4),canvas.height/15,0,24,-8);
			break;
		case 117: 
			create_bullet("warning",canvas.height/2,canvas.height/2,0,16);
			break;
		case 120: 
			create_bullet("lazer",canvas.height/2,canvas.height/3,0,16);
			create_effect("flash",200,"#ffffff");
			create_bullet("warning_end",0);
			break;
		case 128: 
			global_level_complete = true;
			sound_level_complete.currentTime = 0;
			sound_level_complete.play();
			break;
	}
	
	level_bullet_timer_tick = -1;
	/*
	ctx.fillStyle = "#ffffff";
	ctx.fillText(level_bullet_timer,32,92);
	ctx.fillText(bullet_type.length,32,128);
	ctx.fillText(effect_type.length,32,160); //*/
}
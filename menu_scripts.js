function menu() {
	if (global_start_game == true){
		if (menu_music_isPlaying > 0){
			sound_menu_music.pause();
			menu_music_isPlaying = false;
		}
		return;
	}
	
	if (menu_music_isPlaying < 0){
		menu_music_isPlaying += 1;
	}else if (menu_music_isPlaying == 0){
		sound_menu_music.currentTime = 0;
		sound_menu_music.play();
		sound_menu_music.loop = true;
		sound_menu_music.volume = 1;
		menu_music_isPlaying = 2;
		global_timer = accurateInterval(1000 * 60 / 140, function(){ menu_title_bounce = 64; });
	}
	
	var menu_options = [];
	
	if (global_menu == "start"){
		var i;
		for (i = 0; i < menu_options_start.length; i++){
			menu_options[i] = menu_options_start[i];
		}
	}else if (global_menu == "settings"){
		var i;
		for (i = 0; i < menu_options_edit.length; i++){
			menu_options[i] = menu_options_edit[i];
		}
	}else if (global_menu == "play"){
		var i;
		for (i = 0; i < menu_options_play.length; i++){
			menu_options[i] = menu_options_play[i];
		}
	}else{
		menu_options[0] = "error";
	}
	
	var margin = 32;
	var speed = 0.25;
	
	if (menu_position_animation < menu_position){
		menu_position_animation += 0.25;
	}
	if (menu_position_animation > menu_position){
		menu_position_animation -= 0.25;
	}
	
	if (menu_end == false){
		player_x = menu_x-player_size-margin
		player_y = menu_y+(menu_position_animation*(menu_text_size+margin));
	}
	
	if (menu_select == false && menu_end == false){
		if (key_down_pressed == true){
			if (moved == false){
				if (menu_position < menu_options.length-1){
					menu_position += 1;
				}else{
					menu_position = 0;
				}
				moved = true;
				sound_menu_move.currentTime = 0;
				sound_menu_move.play();
			}
		}else if (key_up_pressed == true){
			if (moved == false){
				if (menu_position > 0){
					menu_position -= 1;
				}else{
					menu_position = menu_options.length-1;
				}
				moved = true;
				sound_menu_move.currentTime = 0;
				sound_menu_move.play();
			}
		}else{
			moved = false;
		}
		if (key_select_pressed == true){
			menu_select = true;
			sound_menu_select.currentTime = 0;
			sound_menu_select.play();
		}
	}
	
	ctx.font = "" + menu_title_bounce + "px " + "Roboto";
	ctx.fillStyle = player_colour;
	ctx.textAlign = "center";
	ctx.fillText(global_game_title, menu_x+64, menu_title_y);
	
	ctx.font = "" + menu_text_size + "px " + "Roboto";
	ctx.textAlign = "left";
	var i;
	for (i = 0; i < menu_options.length; i++){
		if (menu_select == false && menu_end == false){
			if (menu_position == i){
				if (menu_bounce[i] < margin){
					menu_bounce[i] += speed * 10;
				}
				ctx.fillStyle = player_colour;
			}else{
				if (menu_bounce[i] > 0){
					menu_bounce[i] -= speed * 10;
				}
				ctx.fillStyle = "#ffffff";
			}
		}else{
			menu_goto = menu_position;
			if (menu_end == true){
				if (menu_end_fade > 0){
					ctx.globalAlpha = menu_end_fade;
					menu_end_fade -= 0.003;
				}else{
					ctx.globalAlpha = 0;
				}
			}
			if (menu_position == i){
				ctx.fillStyle = "#fff000";
			}else{
				ctx.fillStyle = "#ffffff";
			}
		}
		ctx.fillText(menu_options[i],menu_x+menu_bounce[i]+menu_end_bounce,menu_y+(i*(menu_text_size+margin)))
		ctx.globalAlpha = 1;
	}
	
	if (global_menu == "start"){
		ctx.font = "" + menu_text_size + "px " + "Roboto";
		ctx.fillStyle = "rgba(255,255,255,0.4)";
		ctx.textAlign = "left";
		ctx.fillText("WASD to move, SPACE to select",menu_x, menu_y+menu_text_size+margin*5);
	}
	
	if (menu_title_bounce > 48){
		menu_title_bounce -= 1;
	}
	
	if (menu_position > menu_options.length-1){
		menu_position -= 1;
	}
	
	if (menu_end == true){
		menu_end_bounce += 3 - menu_end_friction;
		if (menu_x + menu_end_bounce > canvas.width/2){
			global_start_game = true;
			player_motion_x = 0;
			player_motion_y = 0;
		}
		var i;
		for (i = 0; i < menu_options.length; i++){
			menu_bounce[i] += 6 - i - menu_end_friction;
		}
		menu_end_friction -= 0.2;
		
		var rot = Math.atan2(canvas.height-player_y, canvas.width-player_x);
		player_motion_x = canvas.width/menu_x * Math.cos(rot*Math.PI/180);
		player_motion_y = canvas.height/menu_y * Math.sin(rot*Math.PI/180);
		
		if (player_x < canvas.width/2) player_x += player_motion_x;
		if (player_y < canvas.height/2) player_y += player_motion_y + 2;
		
		if (sound_menu_music.volume > 0.1){
			sound_menu_music.volume -= 0.05;
		}
		
		player_health = player_max_health;
		
		menu_title_bounce -= menu_end_title_bounce;
		menu_title_y -= menu_end_title_bounce*2;
		menu_end_title_bounce += 0.01;
		
		global_level_end = false;
		
		global_timer.cancel();
	}
	
	if (menu_goto != -1 && menu_select_pressed == false){
		if (global_menu == "start"){
			switch (menu_position){
				case 0: 
					global_menu = "play";
					break;
				case 1:
					global_menu = "settings";
			}
		}else if (global_menu == "play"){
			switch (menu_position){
				case 0: 
					menu_end = true;
					global_level = 0;
					sound_menu_start.currentTime = 0;
					sound_menu_start.play();
					break;
				case 1:
					menu_end = true;
					global_level = 1;
					sound_menu_start.currentTime = 0;
					sound_menu_start.play();
					break;
				case 2:
					menu_end = true;
					global_level = 2;
					sound_menu_start.currentTime = 0;
					sound_menu_start.play();
					break;
				case 3:
					global_menu = "start";
			}
		}else if (global_menu == "settings"){
			switch (menu_position){
				case 0: 
					if (global_easy_mode == true){
						global_easy_mode = false;
						player_max_health = 3;
						menu_options_edit[0] = "Easy Mode: Disabled.";
						global_game_title = "Hits & Bits";
					}else{
						global_easy_mode = true;
						player_max_health = 5;
						menu_options_edit[0] = "Easy Mode: Enabled.";
						global_game_title = "HJs & Fods";
					}
					break;
				case 1:
					if (menu_options_edit[1] == "This option does literally nothing."){
						menu_options_edit[1] = "Subscribe to my YouTube";
					}else{
						window.open("https://youtube.com/hjfod");
					}
					break;
				case 2:
					global_menu = "start";
			}
		}
		menu_goto = -1;
		menu_select = false;
		menu_select_pressed = true;
		if (menu_end == false){
			menu_position = 0;
		}
	}
}
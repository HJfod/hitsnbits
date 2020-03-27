function level_start() {
	if (level_title_transition < 64){
		level_title_transition += 4;
	}else if (level_attempt_transition < 64){
		level_attempt_transition += 4;
	}else if (level_title_pause < 32){
		level_title_pause += 1;
	}else{
		level_begin = 0;
	}
}

function level_title_disappear() {
	if (level_title_transition > -64){
		level_title_transition -= 4;
	}else if (level_attempt_transition > -64){
		level_attempt_transition -= 4;
	}else{
		level_begin = 1;
	}
}

function level_title() {
	var title_fade = 0+(level_title_transition/64);
	var attempt_fade = 0+(level_attempt_transition/64);
	
	ctx.font = "64px Roboto";
	ctx.textAlign = "center";
	ctx.fillStyle = "rgba(0, 255, 160," + title_fade + ")";
	ctx.fillText(menu_options_play[menu_position],canvas.width/2,level_title_transition);
	
	ctx.font = "32px Roboto";
	ctx.textAlign = "center";
	ctx.fillStyle = "rgba(255, 255, 255," + attempt_fade + ")";
	ctx.fillText("Attempt " + level_attempt,canvas.width/2,level_attempt_transition+64);
}

function level_pause_text() {
	ctx.font = "64px Roboto";
	ctx.textAlign = "center";
	ctx.fillStyle = "rgba(255,255,255," + level_pause_text_y / 96 + ")";
	if (global_level_complete == true){
		ctx.fillText("Level complete!",canvas.width/2,level_pause_text_y);
	}else if (global_game_over == false){
		ctx.fillText("Game paused",canvas.width/2,level_pause_text_y);
	}else{
		ctx.fillText("Game Over",canvas.width/2,level_pause_text_y);
	}
	if (global_game_over == false && global_level_complete == false){
		ctx.font = "25px Roboto";
		ctx.fillText("Health left: " + player_health,canvas.width/2,level_pause_text_y+64);
	}
	if (global_level_complete == true){
		if (player_health == player_max_health){ level_rank = "S" }
		if (player_health < player_max_health){ level_rank = "A" }
		if (player_health < player_max_health/2){ level_rank = "B" }
		ctx.fillText("Rank: " + level_rank, canvas.width/2,level_pause_text_y+96);
		ctx.font = "32px Roboto";
		ctx.fillText("Total Attempts: " + level_attempt, canvas.width/2,level_pause_text_y+160);
	}
	ctx.font = "32px Roboto";
	if (global_level_complete == true){
		ctx.fillText("Press enter to finish.",canvas.width/2,level_pause_text_y+216);
	}else if (global_game_over == false){
		ctx.fillText("Press enter to quit.",canvas.width/2,level_pause_text_y+128);
	}else{
		ctx.fillText("Press enter to restart.",canvas.width/2,level_pause_text_y+128);
		ctx.fillText("Press escape to quit.",canvas.width/2,level_pause_text_y+160);
	}
	
	if (global_game_pause == true){
		if (level_pause_text_y < 96){
			level_pause_text_y += 4;
		}
		
		if (global_level_complete == false){
			if (sound_pause_isPlaying == false){
				sound_pause_music.currentTime = 0;
				sound_pause_music.play();
				sound_pause_music.loop = true;
				sound_pause_isPlaying = true;
			}
		}
		
		if (sound_pause_music.volume < 0.8){
			sound_pause_music.volume += 0.01;
		}
		
		if (key_enter_pressed == true){
			if (global_game_over == false){
				quit_level();
			}else{
				sound_menu_start.currentTime = 0;
				sound_menu_start.play();
				global_game_pause = false;
				global_game_pause_switch = false;
				global_game_over = false;
				global_level_end = false;
				global_level_complete = false;
				
				level_begin = -1;
				level_attempt += 1;
				level_title_pause = 0;
				level_attempt_transition = -64;
				level_title_transition = -64;
				level_bullet_timer = -1;
				level_bullet_timer_tick = 0;
				level_song_started = false;
				level_song.currentTime = 0;
				
				bullet_x.splice(0,bullet_type.length);
				bullet_y.splice(0,bullet_type.length);
				bullet_type.splice(0,bullet_type.length);
				bullet_width.splice(0,bullet_type.length);
				bullet_height.splice(0,bullet_type.length);
				bullet_speed.splice(0,bullet_type.length);
				bullet_rotation.splice(0,bullet_type.length);
				bullet_hp.splice(0,bullet_type.length);
				
				effect_type.splice(0,effect_type.length);
				effect_length.splice(0,effect_type.length);
				effect_colour.splice(0,effect_type.length);
				effect_timer.splice(0,effect_type.length);
				
				player_health = player_max_health;
				player_recover = 0;
				player_death_animation_hasPlayed = false;
				
				if (sound_pause_isPlaying == true){
					sound_pause_music.pause();
					sound_pause_isPlaying = false;
					sound_pause_music.volume = 0;
				}
			}
		}
		if (key_escape_pressed == true){
			if (global_game_over == true){
				quit_level();
			}
		}
	}else{
		if (sound_pause_isPlaying == true){
			sound_pause_music.pause();
			sound_pause_isPlaying = false;
			sound_pause_music.volume = 0;
		}
		
		if (level_pause_text_y > 0){
			level_pause_text_y -= 4;
		}
	}
}

function level_song_handler() {
	if (level_song_isPlaying == false && global_game_pause == false){
		if (level_song_started == false){
			level_song = new Audio(level_songs[menu_position]);
			level_song.currentTime = 0;
			level_song_started = true;
		}
		level_song.play();
		level_song_isPlaying = true;
		level_song.volume = 1;
	}
	
	if (global_game_pause == true && global_level_complete == false){
		level_song.pause();
		level_song_isPlaying = false;
	}else if (global_game_pause == true && global_level_complete == true){
		if (level_song.volume > 0.01){
			level_song.volume -= 0.01;
		}
	}
}

function level_game_over() {
	if (level_respawn_time < 1){
		level_respawn_time -= 1;
		level_respawn_time_tick -= 1;
		level_respawn_time = 60;
	}
	
	if (level_song_isPlaying == true){
		level_song.pause();
		level_song_isPlaying = false;
	}
	
	global_game_pause = true;
	
	ctx.font = "64px Roboto";
	ctx.textAlign = "center";
	ctx.fillStyle = "#ffffff";
	ctx.fillText(level_respawn_time_tick, canvas.width/2, canvas.height/2);
}

function quit_level() {
	if (level_song_isPlaying == true){
		level_song.pause();
		level_song.currentTime = 0;
		level_song_isPlaying = false;
	}
	
	if (sound_pause_isPlaying == true){
		sound_pause_music.pause();
		sound_pause_isPlaying = false;
		sound_pause_music.volume = 0;
	}
	
	global_start_game = false;
	global_level_end = true;
	global_level_complete = false;
	global_game_pause = false;
	global_game_pause_switch = false;
	global_game_over = false;
	global_timer.cancel();
	
	level_attempt = 1;
	level_begin = -1;
	level_title_pause = 0;
	level_attempt_transition = -64;
	level_title_transition = -64;
	level_bullet_timer = -1;
	level_bullet_timer_tick = 0;
	level_song_started = false;
	level_timer_started = false;
	
	bullet_x.splice(0,bullet_type.length);
	bullet_y.splice(0,bullet_type.length);
	bullet_type.splice(0,bullet_type.length);
	bullet_width.splice(0,bullet_type.length);
	bullet_height.splice(0,bullet_type.length);
	bullet_speed.splice(0,bullet_type.length);
	bullet_rotation.splice(0,bullet_type.length);
	bullet_hp.splice(0,bullet_type.length);
	
	effect_type.splice(0,effect_type.length);
	effect_length.splice(0,effect_type.length);
	effect_colour.splice(0,effect_type.length);
	effect_timer.splice(0,effect_type.length);
	
	menu_goto = -1;
	menu_select = false;
	menu_select_pressed = true;
	menu_position = 0;
	menu_end_bounce = 0;
	menu_end_friction = 7;
	menu_end = false;
	menu_x = menu_x_initial;
	menu_y = menu_y_initial;
	menu_bounce = [0,0,0,0,0,0,0,0];
	menu_title_bounce = 48;
	menu_title_y = 64;
	menu_end_title_bounce = 0;
	menu_end_fade = 1;
	
	player_health = player_max_health;
	player_recover = 0;
	player_death_animation_hasPlayed = false;
}

function level_handler() {
	if (global_start_game == true){
		if (level_begin == -1){
			level_start();
		}else if (level_begin == 0){
			level_title_disappear();
		}
		
		if (level_begin == true){
			level_song_handler();
			if (global_game_over == false){
				if (key_escape_pressed == true){
					if (global_pause_switch == false){
						if (global_game_pause == true){
							global_game_pause = false;
							level_bullet_timer = global_pause_time;
						}else{
							global_game_pause = true;
							global_pause_time = level_bullet_timer;
						}
						global_pause_switch = true;
					}
				}else{
					global_pause_switch = false;
				}
			}
		}else{
			level_title();
			level_bullet_timer = -1;
			level_bullet_timer_tick = 0;
			global_level_complete = false;
			global_game_pause = false;
		}
		
		level_pause_text();
		
		if (global_level_complete == true){
			global_game_pause = true;
		}
		
		if (global_level_end == true){
			level_respawn_time = 5;
			level_game_over();
		}
	}
}
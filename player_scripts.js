function move() {
	if (global_start_game == false || (global_game_pause == true && global_level_complete == false )){
		return;
	}
	
	if (key_left_pressed == true){
		if (player_motion_x > -player_speed){
			player_motion_x -= player_friction;
		}
	}
	if (key_right_pressed == true){
		if (player_motion_x < player_speed){
			player_motion_x += player_friction;
		}
	}
	if (key_up_pressed == true){
		if (player_motion_y > -player_speed){
			player_motion_y -= player_friction;
		}
	}
	if (key_down_pressed == true){
		if (player_motion_y < player_speed){
			player_motion_y += player_friction;
		}
	}
	
	var buffer = 0.2;
	var slowdown = 1.5;
	var shrink = 8;
	var shrink_speed = 2;
	var side_margin = 64;
	
	if (key_left_pressed == false && key_right_pressed == false){
		if (player_motion_x < -buffer){
			player_motion_x += player_friction*slowdown;
		}else if (player_motion_x > buffer){
			player_motion_x -= player_friction*slowdown;
		}else{
			player_motion_x = 0;
		}
		if (player_size_x > player_size-shrink){
			player_size_x -= player_friction*shrink_speed;
		}
	}else{
		if (player_size_x < player_size+shrink){
			player_size_x += player_friction*shrink_speed;
		}
	}
	
	if (key_up_pressed == false && key_down_pressed == false){
		if (player_motion_y < -buffer){
			player_motion_y += player_friction*slowdown;
		}else if (player_motion_y > buffer){
			player_motion_y -= player_friction*slowdown;
		}else{
			player_motion_y = 0;
		}
		if (player_size_y > player_size-shrink){
			player_size_y -= player_friction*shrink_speed;
		}
	}else{
		if (player_size_y < player_size+shrink){
			player_size_y += player_friction*shrink_speed;
		}
	}
	
	if (key_left_pressed == false && key_right_pressed == false && key_up_pressed == false && key_down_pressed == false){
		if (player_size_x < player_size){
			player_size_x += player_friction*slowdown*shrink_speed;
		}else if (player_size_x > player_size){
			player_size_x -= player_friction*slowdown*shrink_speed;
		}else{
			player_size_x = player_size;
		}
		
		if (player_size_y < player_size){
			player_size_y += player_friction*slowdown*shrink_speed;
		}else if (player_size_y > player_size){
			player_size_y -= player_friction*slowdown*shrink_speed;
		}else{
			player_size_y = player_size;
		}
	}
	
	if (player_x > canvas.width-side_margin){
		player_motion_x = 0;
		player_x -= player_speed;
	}
	
	if (player_x < side_margin){
		player_motion_x = 0;
		player_x += player_speed;
	}
	
	if (player_y > canvas.height-side_margin){
		player_motion_y = 0;
		player_y -= player_speed;
	}
	
	if (player_y < side_margin){
		player_motion_y = 0;
		player_y += player_speed;
	}
	
	player_x += player_motion_x;
	player_y += player_motion_y;
}

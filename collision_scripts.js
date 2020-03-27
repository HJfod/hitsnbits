function collision_detection() {
	if (global_game_pause == true){
		return;
	}
	
	var i;
	for (i = 0; i < bullet_type.length; i++){
		if (bullet_type[i] != "warning" && bullet_type[i] != "warning_vertical"){
			if (
			player_x > bullet_x[i]-bullet_width[i] &&
			player_x < bullet_x[i]+bullet_width[i] &&
			player_y > bullet_y[i]-bullet_height[i] &&
			player_y < bullet_y[i]+bullet_height[i]
			){
				if (bullet_type[i] == "lazer" || bullet_type[i] == "lazer_vertical"){
					if (bullet_speed[i] != 0){
						continue;
					}
				}
				if (bullet_type[i] == "wall_special"){
					if (bullet_hp[i] < bullet_rotation[i]/4){
						continue;
					}
				}
				if (player_recover < 1){
					player_health -= 1;
					if (player_health < 1){
						global_level_end = true;
						global_game_over = true;
						sound_player_die.currentTime = 0;
						sound_player_die.play();
					}
					player_recover = player_heal_time;
					sound_player_hit.currentTime = 0;
					sound_player_hit.play();
				}
			}
		}
		
	}
	
	if (player_recover > 0){
		player_recover -= 1;
	}
	
	if (level_begin == true){
		ctx.fillStyle = "#ffffff";
		ctx.fillText(player_health,canvas.width/2,32);
	}
}
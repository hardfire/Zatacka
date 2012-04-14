Game.Controller =(function(){
	var nextGameTick = (new Date).getTime(),
		FPS = 60,
		MAX_FRAME_SKIP = 5,
		SKIP_TICKS = 1000/FPS,
		context = config.context,
		anime=false,
		paused=false,
		playing=false,
		appView;

	return{
		initialize: function(){
			_.bindAll(this,'animate','render','startAnimation','restart');
			appView = new Game.Views.App({ el:document });
		},
		
		finshRound: function(){
			cancelRequestAnimationFrame(anime);
			playing = false;
		},

		startAnimation: function(){
			playing = true;
			if(Game.curves.alive() < 2){
				console.log('not enough players');
				return;
			}
			$('#start').fadeOut();
			document.getElementById('right').style.opacity = 0.2;
			this.animate();
		},

		restart: function(){
			playing = true;
			appView.restart();
			this.startAnimation();
		},

		animate: function(){
			anime = requestAnimationFrame(this.animate);
			this.render();
		},

		updateScores: function(){
			appView.updateScores();	
		},

		addPlayer: function(){
			appView.addPlayer();
		},

		render: function(){
			appView.update();
		},

		pause: function(){
			if(!playing)
				return;
			if(anime === false)
			{
				paused = false;
				this.animate();		
				$('#paused').fadeOut();
			}
			else
			{
				cancelRequestAnimationFrame(anime);
				anime = false;
				paused = true;
				$('#paused').fadeIn();
			}
		}
	};
})();


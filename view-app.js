//The View
//move to view-app.js
Game.Views.App = Backbone.View.extend({

	curves: Game.curves,

	el:$("#players"),

	events: {
		'click #add-new-player':'newPlayer',
		'keydown':'keypressGame',
		'keyup':'keyupGame',
		'click #round-score':'restartGame'
	},

	initialize: function(){
		_.bindAll(this,'update','restart','newPlayer','updateScores');
		_.each(Game.keyMaps,function(keyMap,key){
			if(keyMap.inUse==false)
			{
				$('#new-player-controls').append(
						$('<option></option>').val(key).html(keyMap.label)
					);
			}
		});
	},

	restart: function(){
		config.context.clearRect(0,0,config.canvasWidth,config.canvasHeight);
		this.curves.each(function(curve){
			curve.initialize();
		})
	},

	newPlayer: function(){
		var pos = this.$('#new-player-controls').val();
		var curve = new Game.Curve({
			name:this.$('#new-player-name').val(),
			color:Game.keyMaps[pos].color,
			upKey:Game.keyMaps[pos].up,
			downKey:Game.keyMaps[pos].down,
			keyLabel:Game.keyMaps[pos].label,
		});
		curve.view = new Game.Views.Curve({model:curve});
		Game.keyMaps[pos].inUse = true;
		$('#new-player-controls option[value='+pos+']').remove();
		curve.playerView = new Game.Views.Players({model:curve});
		$('#players').append(curve.playerView.render().el);
		this.curves.add(curve);
	},

	updateScores: function(){
		this.curves.updateScores();
		if(this.curves.alive() < 2){
			Game.Controller.finshRound();
			rankings = this.curves.gameRankings();
			_(rankings).each(function(curve){
				$('#round-score-players').append('<div class="color" style="background:'+curve.get('color')+'"></div>'+curve.get('name')+'<br/>');
			});
			$('#round-score').fadeIn();
		}
	},

	restartGame: function(){
		$('#round-score').fadeOut();
		$('#round-score-players').empty();
		Game.Controller.restart();
	},

	update: function(){
		
		this.curves.each(function(curve){
			curve.view.render();
		});
	},

	keypressGame: function(e){
		if(e.keyCode === 80)
		{
			Game.Controller.pause();
		}
		Game.keys[e.keyCode] = true;
	},

	keyupGame: function(e){
		Game.keys[e.keyCode] = false;
	}

});

//The Collection
// Move to collection-curveManager.js
Game.CurveManager = Backbone.Collection.extend({

	model:Game.Curve,

	aliveCount:0,

	alive: function() {
		aliveCount = this.filter(function(curve){ return curve.get('alive'); }).length;
		return aliveCount;
	},

	gameRankings: function(){
		sorted = this.sortBy(function(curve){return -1 * curve.get('matchScore')});
		return sorted;
	},

	updateScores: function() {
		this.each(function(curve){
			if(curve.get('alive') === true)
			{
				curve.updateScore();
			}
		});
	},

});

Game.curves = new Game.CurveManager();

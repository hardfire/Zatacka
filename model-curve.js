//the Model (move to model-curve.js)
Game.Curve = Backbone.Model.extend({
	defaults: {
	  name: 'Death',
	  x:0,
	  y:0,
	  vx:0,
	  vy:0,
	  angle:0,
	  color:"#0FF",
	  toMove:false,
	  direction:0,
	  speed:2,
	  hole:0,
	  alive:true,
	  score:0,
	  playing:true,
	  upKey:37,
	  downKey:39,
	  keyLabel:'',
	  matchScore:0
	},
	  initialize: function(){
			var x = Math.round(Math.random() * (config.canvasHeight - (config.canvasWidth*0.6))) + config.canvasWidth*0.3,
			y = Math.round(Math.random() * (config.canvasHeight - (config.canvasHeight*0.6))) +  config.canvasHeight*0.3,

		  //generate a random movement angle for the curve
			angle = (Math.random()*360) * Math.PI / 180,

		  //calculate the angular velocity
			vx = Math.cos(angle)* this.get('speed'),
			vy = Math.sin(angle)* this.get('speed');
		  this.set({	  
				x:x,
		  		y:y,
			  	angle:angle,
		  		vx:vx,
		  		vy:vy,
			    alive: true,
			    matchScore: 0,
		  })
	  },
	  hittest: function(newx,newy){
	  	
			if ( 	
				//if curve has hit the right end
				newx > config.canvasWidth || 
				// if curve has hit the left end
				newx < 0 || 
				//if curve has hit the bottom end
				newy > config.canvasHeight ||
				//if the curve has hit top end
				newy < 0 || 
				//if the curve hit another curve or itself
				config.context.getImageData(newx,newy,1,1).data[3] > 100)
			{
				//return true -> inidicates that the curve hit something.
				return true;
			}
			//did not hit anything
			return false;
	  },
	  updateScore:function(){
	  	this.set({
			score: this.attributes.score+1,
			matchScore: this.attributes.matchScore+1,
		});
	  },
	  create: function(){
		var newx,
			newy,
			context,
			updated;

		if(this.attributes.alive === false)
			return;

		context = config.context;

		// if the curve is in rotating condition right now
		// calculate the new angular velocity
		if(Game.keys[this.attributes.upKey] === true)
		{
			updated = true;
			this.attributes.angle = this.attributes.angle + (3 * Math.PI/180);
		}
		else if(Game.keys[this.attributes.downKey] === true)
		{
			updated = true;
			this.attributes.angle = this.attributes.angle - (3 * Math.PI/180);
		}

		if(updated)
		{
			this.attributes.vx = Math.cos(this.attributes.angle) * this.attributes.speed;
			this.attributes.vy = Math.sin(this.attributes.angle) * this.attributes.speed;
		}	
		//calculate the new curve position
		newx = this.attributes.x + this.attributes.vx;
		newy = this.attributes.y + this.attributes.vy;

		//check for hittest of the curve.

		if(this.attributes.hole > 0)
		{
			if(this.hittest(newx,newy) === true)
			{
				this.set('alive',false);
				Game.Controller.updateScores();
			}
			//create a path from the previous position to the new position
			context.beginPath();
			context.fillStyle = this.attributes.color;
			context.strokeStyle = this.attributes.color;
			context.lineWidth = config.curveWidth;
			context.moveTo(this.attributes.x,this.attributes.y);
			context.lineTo(newx,newy);
			context.stroke();
			this.attributes.hole--;
		}
		else
		{
			newx+=5*this.attributes.vx;
			newy+=5*this.attributes.vy;
			this.attributes.hole = Math.round(Math.random() * 500) + 50;
		}
		this.attributes.x = newx;
		this.attributes.y = newy;
	  }
});


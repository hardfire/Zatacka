//the curve view
// move to view-curve.js
Game.Views.Curve = Backbone.View.extend({

	initialize : function() {
		_.bindAll( this, "render");
		this.render();
	},

	render: function(){
		this.model.create();
		return;
	},
});

		/*//{{{
		if(this.model.get('alive') === false)
			return;
		var newx,
			newy,
			context,
			vx = this.model.get('vx'),
			vy = this.model.get('vy'),
			x = this.model.get('x'),
			y = this.model.get('y'),
			angle = this.model.get('angle'),
			speed = this.model.get('speed'),
			hole = this.model.get('hole'),
			updated = false;

		context = config.context;

		// if the curve is in rotating condition right now
		// calculate the new angular velocity
		if(Game.keys[this.model.get('upKey')] === true)
		{
			updated = true;
			angle = angle + (3 * Math.PI/180);
		}
		else if(Game.keys[this.model.get('downKey')] === true)
		{
			updated = true;
			angle = angle - (3 * Math.PI/180);
		}

		if(updated)
		{
			vx = Math.cos(angle) * speed;
			vy = Math.sin(angle) * speed;
		}	
		//calculate the new curve position
		newx = x + vx;
		newy = y + vy;

		//check for hittest of the curve.

		if(hole > 0)
		{
			if(this.model.hittest(newx,newy) === true)
			{
				this.model.set('alive',false);
				Game.Controller.updateScores();
			}
			//create a path from the previous position to the new position
			context.beginPath();
			context.fillStyle = this.model.get('color');
			context.strokeStyle = this.model.get('color');
			context.lineWidth = config.curveWidth;
			context.moveTo(x,y);
			context.lineTo(newx,newy);
			context.stroke();
			hole--;
		}
		else
		{
			newx+=5*this.model.get('vx');
			newy+=5*this.model.get('vy');
			hole = Math.round(Math.random() * 500) + 50;
		}

		//save the new x and y positions
		this.model.set({
			x: newx,
			y: newy,
			hole: hole,
			angle: angle,
			vx: vx,
			vy:vy
		});*///}}}

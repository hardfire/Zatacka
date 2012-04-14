Game.Views.Players = Backbone.View.extend({

	tagName:'li',

	template:_.template($('#player-template').html()),

	events:{
		'click .remove':'remove'
	},

	initialize: function(){
		_.bindAll( this, "render","remove");
		this.model.bind('change',this.render, this);
		this.model.bind('remove',this.remove,this);
	},

	render: function(){
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},

	remove:function(){
		$(this.el).remove();
		this.model.destroy();
	}

})

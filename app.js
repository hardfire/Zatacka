//application (move to app.js)
window.Game = {
	//model
	Curve : {},
	//collection
	CurveManager : {},
	//view
	Views : {},
	//controller
	Controller : {},
	//keys
	keys:{},
	//keymaps
	keyMaps:[
		{
			label: '<-/->',
			up: 37,
			down: 39,
			inUse: false,
			color: '#f00',
		},
		{
			label: 'A/S',
			up: 65,
			down: 83,
			inUse: false,
			color: '#ff0',
		},
		{
			label: 'G/H',
			up: 71,
			down: 72,
			inUse: false,
			color: '#0ff',
		},
		{
			label: 'K/L',
			up:75,
			down:76,
			inUse: false,
			color:'#f0f',
		},
	],
};


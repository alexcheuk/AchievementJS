$(function(){

	// $(document).on('click', function(){

	// 	$('.achievement').hide().removeClass('prestart').removeClass('start').removeClass('prestart-start').removeClass('end').removeClass('start-glow');

	// 	setTimeout(function(){
	// 		$('.achievement').show().addClass('prestart').addClass('start');

	// 		setTimeout(function(){
	// 			$('.achievement').addClass('prestart-start').addClass('start-glow');
	// 		},5);

	// 		setTimeout(function(){
	// 			$('.achievement').addClass('end');
	// 		},1000);

	// 	},1000);
		

	// });
	// 
	$(document).on('click', function(){
		var A = new Achievement();
		A.earn();
	});

});

var Achievement = function(){
	this.STATIC = {
		DOM_CLASS : '.achievement'
	}

	this._elements = {
		wrapper : $(this.STATIC.DOM_CLASS)
	}

	this._class = {
		hidden : {
			display : 'none',
			opacity : 0
		},
		prestart : {
			display : 'block',
		}
	}
}

Achievement.prototype.earn = function(option){
	var _this = this;
	this._elements.wrapper.css(this._class.prestart);

	setTimeout(function(){
		_this._elements.wrapper.css({opacity:1});
	},1);
}
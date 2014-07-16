$(function(){

	$(document).on('click', function(){
		var A = new Achievement();
		A.earn({
      title : "Achievement Earned",
      text : "You have clicked the document!"
    });
	});

});

var Achievement = function(){
	this.STATIC = {
    TEMPLATE : '' +
        '<div class="achievementjs">' +
          '<div class="achievementjs-icon"></div>' +
          '<div class="achievementjs-text">' +
            '<h2 class="achievementjs-title"></h2><p class="achievementjs-description"></p>' +
          '</div>' +
          '<div class="achievementjs-overlay"></div>' +
          '<div class="achievementjs-glow-wrapper"><div class="achievementjs-glow"</div>' +
        '</div>',
		DOM_CLASS : '.achievementjs',
    OVERLAY_CLASS : '.achievementjs-overlay',
    GLOW_CLASS : '.achievementjs-glow',
    TITLE_CLASS : '.achievementjs-title',
    DESCRIPTION_CLASS : '.achievementjs-description',
	};

	this._class = {
    wrapper:{
      hidden : {
        display : 'none',
        opacity : 0
      }
    },
    overlay : {
      reset : {
        opacity : 0,
        background : "#fff",
        boxShadow : "0 0 20px #fff"
      }
    },
    glow : {
      reset : {
        left: -65,
        opacity : 0.9
      }
    }
  };

  this._animation = {
    wrapper : {
      0 : {
        css : {
            opacity : 1
        },
        option : {
          duration : 1000
        }
      },
      500 : {
        css : {
          boxShadowBlur : "10px"
        },
        option : {
          duration : 500,
          complete : function(){
            var $elem = $(this);

            $elem.velocity({
              opacity : 0,
              translateY : "-=10"
            }, { delay: 5000, duration: 150, complete: function(){
              $elem.remove();
            }});
          }
        }
      }
    },

    // Overlay
    overlay : {
      100 : {
        css : {
          opacity : 0.8,
          boxShadowBlur : "50px"
        },
        option : {
          duration : 250
        }
      },
      500 : {
        css : {
          opacity : 0,
          boxShadowBlur : "10px"
        },
        option : {
          duration : 500
        }
      }
    },

    // Glow
    glow : {
      200 : {
        css : {
          left: 360,
          opacity: 0
        },
        option : {
          duration : 1000
        }
      }
    }
  }
};

Achievement.prototype.earn = function(option){
  var $achievement = $(this.STATIC.TEMPLATE);

  if(!$('.achievementjs-container').length){
    $('body').prepend('<div class="achievementjs-container"></div>');
  }

  $('.achievementjs-container').append($achievement);

  var _elements = {
    wrapper : $achievement,
    overlay : $achievement.find(this.STATIC.OVERLAY_CLASS),
    glow : $achievement.find(this.STATIC.GLOW_CLASS)
  };

  _elements.wrapper.find('h2').text(option.title);
  _elements.wrapper.find('p').text(option.text);
  _elements.wrapper.find('.achievementjs-icon').html('ICON');

  _elements.wrapper.css(this._class.wrapper.hidden);
  _elements.overlay.css(this._class.overlay.reset);
  _elements.glow.css(this._class.glow.reset);

  _elements.wrapper.show();
  _elements.wrapper.velocity("stop");
  _elements.overlay.velocity("stop");
  _elements.glow.velocity("stop");

  for(var elem in this._animation){
    if(!this._animation.hasOwnProperty(elem)) return;
    var $elem = _elements[elem];

    var animation = this._animation[elem];

    for(var delay in animation){
      if(!animation.hasOwnProperty(delay)) return;

      var frame = animation[delay];
      $elem.velocity(frame.css, $.extend(frame.option, {"queue": false, "delay" : delay}))
    }
  }

};
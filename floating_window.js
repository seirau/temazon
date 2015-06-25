
var $temazon = {};

(function(undefined)
{
	$temazon.FloatingWindow = function(cover)
	{
		this._cover = cover;
	};

	$temazon.FloatingWindow.prototype =
	{
		show: function()
		{
			this._showCover();

			$('#pic_frame').css({
				left: $(window).width()/2 - $('#pic_frame').width()/2
				,top: $(window).scrollTop() + 60.0
			});

			$('#pic_frame').fadeIn('fast');
		}

		,hide: function()
		{
			this._hideCover();

			$('#pic_frame').fadeOut('fast');
		}

		,_showCover: function()
		{
			this._cover.fadeIn('fast');
		}

		,_hideCover: function()
		{
			this._cover.fadeOut('fast');
		}
	};
})();

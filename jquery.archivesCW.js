/*
 *  archivesCW v1.0 - jQuery plugin as a part of the WordPress plugin "Archives Calendar Widget"
 *  Copyright (C) 2013  Aleksei Polechin (http://alek.be)
 *  
 *  This plugin is a part of a WordPress plugin and will not do anything if used without the "Archives Calendar Widget" (WordPress plugin)
 *  It is used for easier customisation and for multiple widgets support.
*/
(function($)
{
	$.fn.archivesCW = function(options)
	{
		if(!options || typeof(options) == 'object')
		{
			var options = $.extend( {}, $.fn.archivesCW.defaults, options );
		}
		
		return this.each
		(
			function()
			{
				new $archivesCW($(this), options);
			}
		);
	}


	$archivesCW = function(elem, options)
	{
        var $nav = elem.find('.calendar-navigation');
        var $menu= $nav.find('.menu');
        var $wearein = parseInt($menu.find('a.current').attr('rel'));

		var totalyears = $menu.find('li').length;
		if(totalyears <= 1) $nav.find('.arrow-down').hide();
		aCalSetYearSelect();
		aCalCheckArrows();

		$nav.find('.prev-year').on('click', function(e)
		{
			e.preventDefault();
			if( $(this).is('.disabled') ) return;
			goToYear($wearein + 1, options);
		});

        $nav.find('.next-year').on('click', function(e)
		{
			e.preventDefault();
			if( $(this).is('.disabled') ) return;
			goToYear($wearein - 1, options);
		});

        $nav.find('.arrow-down').on('click', function()
		{
			if($.isFunction(options.showDropdown))
				options.showDropdown($menu);
		});

		$menu.mouseleave(function()
		{
			var menu = $(this);
			$(this).data('timer', setTimeout(
				function()
                {
					if($.isFunction(options.hideDropdown))
						options.hideDropdown(menu);
				},
				300
			));
		})
		.mouseenter(function(){
			if($(this).data('timer'))
				clearTimeout($(this).data('timer'));
		});

		$menu.find('a').on('click', function(e)
		{
			e.preventDefault();
			if( $(this).is('.selected') ) return;

			$(this).removeClass('selected');

			var rel = parseInt($(this).attr('rel'));
			goToYear(rel, options);

			if($.isFunction(options.hideDropdown))
				options.hideDropdown($menu);
		});

		function aCalCheckArrows()
		{
			if($wearein == totalyears-1)
				elem.find('.prev-year').addClass('disabled');
			else
				elem.find('.prev-year').removeClass('disabled');
			if($wearein == 0)
				elem.find('.next-year').addClass('disabled');
			else
				elem.find('.next-year').removeClass('disabled');
		}

		function goToYear(goTo, options)
		{
			var wearein = $wearein;

			// go next (more recent)
			if(goTo < wearein)
			{
				if($.isFunction(options.goNext))
				{
					options.goNext(elem, wearein, goTo);
				}
				else
				{
					$.fn.archivesCW.defaults.goNext(elem, wearein, goTo);
				}
			}
			// go prev (older)
			else
			{
				if($.isFunction(options.goPrev))
				{
					options.goPrev(elem, wearein, goTo);
				}
				else
				{
					$.fn.archivesCW.defaults.goPrev(elem, wearein, goTo);
				}
			}

			$wearein = goTo;
			var $year = elem.find('.menu a[rel='+$wearein+']');
			elem.find('a.title').attr( 'href', $year.attr('href') ).html( $year.html() );
			aCalCheckArrows();
			aCalSetYearSelect();
		};
		function aCalSetYearSelect()
		{
			$menu.find('a.selected, a[rel='+$wearein+']').toggleClass('selected');
            var $selected = $menu.find('a.selected').parent();
			$menu.css('top', - $selected.index() * parseInt($selected.height()) );
		}
	};

	$.fn.archivesCW.defaults = {
		goNext: function(cal, actual, goTo)
		{
			/// EDIT THIS CODE TO CHANGE ANIMATION
			cal.find('.year').css({
				'margin-left': '-100%',
				'opacity': 1
			});

			cal.find('.year[rel='+actual+']').css({
				'margin-left': 0,
				'z-index': 2
			})
			.animate({
				'opacity': .5
			}, 300);

			cal.find('.year[rel='+goTo+']').css({
				'z-index': 3
			})
			.animate({
				'margin-left': 0
			});
		},
		goPrev: function(cal, actual, goTo)
		{
			/// EDIT THIS CODE TO CHANGE ANIMATION
			cal.find('.year:not(.last)').css({
				'margin-left': '-100%',
				'opacity': 1
			});

			cal.find('.year[rel='+goTo+']').css({
				'margin-left': 0,
				'opacity': .3,
				'z-index': 2
			})
            .animate({
				'opacity': 1
			}, 300);

			cal.find('.year[rel='+actual+']').css({
				'margin-left': 0,
				'z-index': 3
			})
            .animate({
				'margin-left': '-100%'
			});
		},
		showDropdown: function(menu)
		{
			menu.show();
		},
		hideDropdown: function(menu)
		{
			menu.hide();
		}
	};
})(jQuery);
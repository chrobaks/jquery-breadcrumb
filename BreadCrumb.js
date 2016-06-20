/**
 * BreadCrumb
 * public methods init, add
 * init param Object styles
 * add param Array data
 */
var BreadCrumb = ( function () {

	var breadcrumbWrapper = {};
	var breadcrumbInput = {};
	var breadcrumbCache = [];
	var maxHeight = 22;

	function isToHeight () {
		return ($('#breadcrumb').outerHeight() > maxHeight);
	}
	function reBuild (type) {

		var breadCrumbLength = $('a','#breadcrumbInput').length;

		if (isToHeight()) {

			$( 'a' , breadcrumbInput).each(function(index){
				if (isToHeight() && index < breadCrumbLength-1 ) {

					if (type === 'replace') {

						$(this).empty().append('...');

					} else {

						$(this).css('display','none');

						if ($( 'span:eq(' + (index) + ')' , breadcrumbInput)) {
							$( 'span:eq(' + (index) + ')' , breadcrumbInput).css('display','none');
						}
					}
				}
			});

			if (isToHeight() && type === 'replace') {
				reBuild ('display');
			}
		}
	}
	function add (data) {

		var arr = [];

		for(var e in data){
			arr.push('<a title="' + data[e].label + '">' + data[e].label + '</a>');
		}

		breadcrumbInput
			.empty()
			.append(arr.join('<span> / </span>'))
			.appendTo(breadcrumbWrapper);

		$( 'a' , breadcrumbInput).last().addClass( "active" );
		breadcrumbCache = data;

		eventClick();
		reBuild('replace');

	}
	function eventResize () {

		$(window).on('resize', function (event) {
			event.preventDefault();
			add(breadcrumbCache);
		});
	}
	function eventClick () {

		$( 'a' , breadcrumbInput).on('click', function () {

			var index = $( 'a' , breadcrumbInput).index($(this));

			if (index < $( 'a' , breadcrumbInput).length - 1) {

				var url = breadcrumbCache[index].url;
				// set your link settings here

				console.log('eventClick : ', url);
			}
		});
	}
	function init (styles) {
		breadcrumbWrapper = $(styles.breadcrumb);
		breadcrumbInput = $('<div>',{'id':styles.breadcrumbInput});
		eventResize();
	}

	return {
		init : init,
		add : add
	};

})();
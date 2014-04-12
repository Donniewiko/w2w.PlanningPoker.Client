(function(){
	'use strict';

	angular.module('app').directive('w2wDrag', ['$swipe', w2wDrag]);

	function w2wDrag($swipe){
		return{
			link: w2wDragLink,
			restrict: 'A'
		};

		function w2wDragLink(scope, element, attrs){
			Hammer(element[0]).on("drag", function(ev) {
				// Set the current position.
				var positionX = parseInt(ev.gesture.deltaX);
				var positionY = parseInt(ev.gesture.deltaY);
				element.css('-webkit-transform', 'translate3d(' + positionX + 'px,'+positionY+'px,0px)');
				element.css('transform', 'translate3d(' + positionX + 'px,'+positionY+'px,0px)');
				$(".pokerCard").each(function(e){
					$(this).removeClass('selected').removeClass('focus');
				})
				element.addClass('selected');
				element.addClass('focus');

			});

			Hammer(element[0]).on("dragend", function(ev){
				var left = $(ev.target).offset().left;
				var top = $(ev.target).offset().top;
				element.css('left', left + 'px');
				element.css('top', top + 'px');
				element.css('-webkit-transform', 'translate3d(0px,0px,0px)');
				element.css('transform', 'translate3d(0px,0px,0px)');
			});   
		};
	}
})();
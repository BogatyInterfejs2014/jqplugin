(function($){


	$.fn.jqval = function(options){
		var methods = {
			regular : function(obj, pattern){
				var str = obj.val();
				//console.log(typeof str);
				//var pattern = settings.regexp;
				//var result = str.match(settings.regexp);
				var result = pattern.test(str);
				//console.log(str + " " + pattern);
				//console.log(result);
				return result;
			}
		};

		var settings = $.extend({
				text : 'Type to validate',
				regexp : null,
				email : null,
				passcomplex : null,
				zipcode: null
			}, options);
		
		//console.log(settings);
		
		return this.each(function() {
			//console.log(settings);
			$(this).attr("placeholder",settings.text);
			
			if (settings.regexp){
				$(this).blur(function(){
					var out = methods.regular($(this),settings.regexp);
					console.log(out);
				});
			}
		
		});
	};

})(jQuery);
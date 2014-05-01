(function($){


	$.fn.jqval = function(options){
		var methods = {
			regular : function(obj, pattern){
				var str = obj.val();
				var result = pattern.test(str);
				//var result = str.match(pattern);
				return result;
			},
			emmail : function(obj) {
				var str = obj.val();
				var pattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}/;
				var result = pattern.test(str);
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
			
			$(this).attr("placeholder",settings.text);
			
			if (settings.regexp){
				$(this).blur(function(){
					var out = methods.regular($(this),settings.regexp);
					console.log("Regexp " + out);
					if (!out){
						$(this).css('box-shadow','1px 1px 10px red');
					}else{
						$(this).css('box-shadow','');
					}
				});
			}
			if (settings.email){
				$(this).blur(function(){
					var out = methods.emmail($(this));
					console.log("Email " + out);
					if (!out){
						$(this).css('box-shadow','1px 1px 10px red');
					}else{
						$(this).css('box-shadow','');
					}
				});
			}
		
		});
	};

})(jQuery);
(function($){


	$.fn.jqval = function(options){
		var codes = $.ajax({
				url: "kody.json",
				dataType: "json"
		});

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
			},
			passcompl: function(obj) {
				var password = obj.val();
				var passScore = 0;
				var upperchar = /[A-Z]/g;
				var lowerchar = /[a-z]/g;
				var numberpass = /[0-9]/g;
				var specialchars = /[!@#$%^&*?_~]/g;
				var checkisnull = function(str){
					var temp = password.match(str);
					if(temp === null){
						temp = 0;
					}else{
						temp = password.match(str).length;
					}
					return temp;
				};
				//Sprawdzanie dlugosci
				if (password.length < 5){
					passScore += 5;
				}
				else if (password.length > 4 && password.length < 8){
					passScore += 10;
				}
				else if (password.length > 7){
					passScore += 25;
				}

				var uppercount = checkisnull(upperchar);
				var lowercount = checkisnull(lowerchar);

				//Sprawdzanie czy haslo posiada tylko male litery
				if (uppercount === 0 && lowercount !== 0){ 
					passScore += 10; 
				}
				//Sprawdzanie czy haslo posiada male i duze litery
				else if (uppercount !== 0 && lowercount !== 0){ 
					passScore += 20; 
				}
				//Sprawdzanie czy haslo zawiera liczby
				var numbercount = checkisnull(numberpass);
				if (numbercount === 1){
					passScore += 10;
				}
				if (numbercount >= 3){
					passScore += 20;
				}
				//Sprawdzanie czy haslo posiada znaki specjalne
				var charactercount = checkisnull(specialchars);
				if (charactercount === 1){
					passScore += 10;
				}   
				if (charactercount > 1){
					passScore += 25;
				}
				//Sprawdzanie czy haslo posiada liczby, duze i male litery
				if (numbercount !== 0 && uppercount !== 0 && lowercount !== 0){
					passScore += 2;
				}
				//Sprawdzanie czy haslo posiada liczby, duze i male litery oraz znaki specjalne
				if (numbercount !== 0 && uppercount !== 0 && lowercount !== 0 && charactercount !== 0){
					passScore += 5;
				}
				//Zwracanie sily wprowadzanego hasla
				var strText = "";
				if (passScore >= 80){
					strText = "Very Strong";
				}else if (passScore >= 60){
					strText = "Strong";
				}else if (passScore >= 40){
					strText = "Average";
				}else if (passScore >= 20){
					strText = "Weak";
				}else{
					strText = "Very Weak";
				}

				return strText;

			},
			zipc: function(obj){
				var str = obj.val();
				var result = /[0-9]{2}-[0-9]{3}/.test(str);
				var place = "";
				if(result === true){
					codes.done(function(data){
						place = data[str];
					});

					/*$.getJSON("kody.json",function(data){
						console.log("inside");
						//console.log(data);
						place = data[str];
					});
					$.ajax({
						url:'https://raw.githubusercontent.com/BogatyInterfejs2014/jqplugin/master/kody.json&callback=',
						datatype : "jsonp"
					}).done(function(data){
						console.log(data);
						place = data[result];
					});*/
				}else{
					place = result;
				}
					
				return place;
			} 

		};

		var settings = $.extend({
				text : 'Type to validate',
				regexp : null,
				email : null,
				passcomplex : null,
				zipcode: null
			}, options);
				
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
			if(settings.passcomplex){
				$(this).blur(function(){
					var out = methods.passcompl($(this));
					console.log("Strength " + out);
				});
			}
			if(settings.zipcode){
				$(this).blur(function(){
					var out = methods.zipc($(this));
					console.log("Zipcode " + out);
				});
			}
		});
	};

})(jQuery);
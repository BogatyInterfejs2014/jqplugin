$(document).ready(function(){

	$("#example").jqval({
		text:'HI',
		regexp: /[a-z@.]+/
	}).jqval({
		email:true
	});
	$("#example2").jqval({
		passcomplex:true
	});
});
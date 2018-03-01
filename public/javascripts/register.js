$(document).ready(function () {
	document.getElementById('reg').onclick = function() {
		var a = document.getElementById('email').value
		console.log(a);
		var constraints = {
			from : {
				email : true
			}
		};
		var result = validate({from: a},constraints);
		if(result == undefined && a != ""){
			console.log('valid email');
			redirect(a);

		}else{
			console.log('email not valid');
			showAlert();
		}
	};
	function showAlert(){
		$("#alert").append('<div class="alert alert-danger alert-dismissible" style="width:100%;"role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>We did not detect a valid email. </div>')
	}
	function redirect(email){
		window.location.href = "/auth/" + email
	}
});
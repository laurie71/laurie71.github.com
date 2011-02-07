$(document).ready(function() {
	///
	// Clear e-mail field on focus
	///
	$("#emailForm").focus(function() {
		if($("#emailForm").val() == "Your E-Mail") {
			$("#emailForm").val("");
		}
	});
	
	////
	// Form button click
	////
	$("#submitButton").click(function() {
		if($("#emailForm").isEmail()) {
			$(".form :input").each(function() {
				$(this).attr("disabled", true);
			});
			
			Request.ajax("/actions/process-form.php", {
				email: $("#emailForm").val()
			}, function() {
				_gaq.push(['_trackPageview', '/process-form-complete.php']);
				$("#lead_form").html("<p><span class=\"underline\">Thanks for your interest!</span> Our plan is to roll out a private beta in the near future. Once our beta is ready, we will provide you additional information and details. In the meantime, keep on hacking with node.js!</p>");
			});
		}	
	});
});
/***********************************************/
/*                Trim Function                */
/***********************************************/
String.prototype.trim = function() { 
	return jQuery.trim(this);
}

/***********************************************/
/*              AJAX Request Object            */
/***********************************************/
var Request = {
	//// Test if an object is empty
	isEmptyObject: function(obj) {
		for(var i in obj) {
			return false;
		}
		return true;
	},
	//// Make an ajax request
	// p_server_side_page: Ajax page to call
	// p_parameters: Arguments to pass to the server side page
	// p_callback: Handler to call on success
	// p_options (Optional): Additional configuration options 
	//   -- onWorking: Element to update with spinner image while ajax call is working
	//   -- dataType:{"xml","html","script","json","jsonp","text"} Data type of return object
	//   -- type:{"POST","GET"} Request type
	//   -- timeout:{int} Timeout in milliseconds before fail
	//   -- cache:{true/false} Whether to allow caching or not
	//   -- async:{true/false} Whether to send the request asynchronous, if you need synchronous set to false.
	ajax: function(p_server_side_page, p_parameters, p_callback, p_options) {
		// Set defaults
		var data_type = "text";
		var type = "post";
		var timeout = 30000;
		var cache = false;
		var async = true;

		// Check option parameters
		if (typeof p_options != "undefined") {
			if (typeof (p_options.onWorking) != "undefined") {
				p_options.onWorking.ajaxStart(function() {
					$(this).html("<img src=\"/art/ajax-working.gif\" alt=\"Working...\" />");
				}).ajaxStop(function() {
					$(this).html("");
					
					// Unbind the start
					$(this).unbind("ajaxStart");
					
					// Unbine the stop
					$(this).unbind("ajaxStop");
				});
			}

			if (typeof (p_options.dataType) != "undefined") {
				data_type = p_options.dataType;
			}

			if (typeof (p_options.type) != "undefined") {
				type = p_options.type;
			}

			if (typeof (p_options.timeout) != "undefined") {
				timeout = p_options.timeout;
			}

			if (typeof (p_options.cache) != "undefined") {
				cache = p_options.cache;
			}

			if (typeof (p_options.async) != "undefined") {
				async = p_options.async;
			}
		}
		
		//Force a `GET` request, if the parameters is null, undefined, or empty.
		if(typeof p_parameters == "undefined" || p_parameters == null) {
			type = "get";					
		} else {
			if(this.isEmptyObject(p_parameters)) {
				type = "get";
			}
		}

		// Make ajax request
		$.ajax({ url: p_server_side_page,
			data: p_parameters,
			success: p_callback,
			dataType: data_type,
			type: type,
			timeout: timeout,
			cache: cache,
			async: async,
			error: function(XMLHttpRequest, textStatus, errorThrown) { /*NOTHING*/ }
		});
	}
}

/***********************************************/
/*           jQuery Custom Extensions          */
/***********************************************/
// Check for jQuery
if (jQuery) (function() {
	// Extend the functions for elements
	$.extend($.fn, {
		isEmpty: function() {
			var empty = false;
			
			$(this).each(function() {
				// Select
				if(this.tagName == "SELECT") {
					if($(this).children("option").length > 0 && $(this).val().length > 0) {
						$(this).removeClass("error");
					} else {
						$(this).addClass("error");
						empty = true;
					}	
				} 
				// Text
				else {
					if($(this).val().length > 0) {
						$(this).removeClass("error");
					} else {
						$(this).addClass("error");
						empty = true;
					}
				}
			});
			
			return empty;
		},
		isEmail: function() {
			var email = true;
			
			$(this).each(function() {
				var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{1,5})$/;
				
				if(reg.test($(this).val()) == false) {
					$(this).addClass("error");
					email = false;
				} else {
					$(this).removeClass("error");
				}
			});
			
			return email;
		},
		isChecked: function() {
			var checked = false;
			
			$(this).each(function() {
				if($(this).attr("checked")) {
					$(this).parent().removeClass("error");
					checked = true;	
				} else {
					$(this).parent().addClass("error");
				}
			});
			
			return checked;
		},
		upperCase: function() {
			$(this).each(function() {
				var obj = this;
				
				$(this).bind("keyup", function() {
					$(obj).val($(element.val().toUpperCase()));
				});
			});
		}
	});
})(jQuery);
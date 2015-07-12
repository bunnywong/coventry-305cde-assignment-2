$(document).ready(function($){
	loadCategories();
	$('.js-categories-container li a').live('click', function(){
		var category = $(this).attr('data-itemId');
		productListview(category);
	});
});

/* Page Function
-------------------------------------------------- */
function loadCategories() {
  var table 	= 'drug';
  var option	= 'is_category = 1';
  var display = '.js-categories-container';

	ajax(table, option, display);
	productListview();
}
function productListview(category) {
	var table 	= 'drug';
	var drug_id = $(this)
  var option	= 'is_category = 0 && category = "'+category+'"';
  var display = '.js-product-listview-container';

	ajax(table, option, display);
}

function ajax(table, option, display) {
  $.ajax({
    url      : 'api',
    dataType : 'json',
    type     : 'get',
    data     : {'table': table, 'option': option},
    success: function(data, status) {
      var str = '';
       $.each(data, function(index, element) {
           str += teamplateListview(element);
        });
       $(display).html(str);
    },
    error: function(xhr, desc, err) {
      console.log(xhr);
      console.log("Details: " + desc + "\nError:" + err);
    }
  });
}

/* Template
-------------------------------------------------- */
 teamplateListview = function(element) {
	var str = '' +
	 '<li style="padding: 0px;" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-first-child ui-btn-up-c">' +
		'<div class="ui-btn-inner ui-li">' +
				'<div class="ui-btn-text">' +
					'<a href="#two" class="js-category ui-link-inherit" data-itemId="'+element.category+'">' +
						'<div class="ui-li-thumb cat-thumbnail" style="background-image: url('+element.photo_name+')"></div>' +
						'<h2 class="ui-li-heading">'+ element.title+'</h2>' +
						'<p class="ui-li-desc">'+element.description+'</p>' +
					'</a>' +
				'</div>' +
				'<span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span>' +
			'</div>' +
		'</li>';
	return str;
}


/* DEBUG
-------------------------------------------------- */
function cl(str) {
  console.log(str);
}
function a(str) {
  alert(str);
}
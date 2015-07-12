$(document).ready(function($){
	loadCategories();

	$('.js-categories-container li a').live('click', function(){
		var category = $(this).attr('data-itemCategory');
		productListview(category);
	});

	$('.js-product-listview-container li a').live('click', function(){
		var drugId = $(this).attr('data-drugId');
		productDetailview(drugId);
	});
});

/* Page Function
-------------------------------------------------- */
function loadCategories() {
  var table 	  = 'drug';
  var option	  = 'is_category = 1';
  var display   = '.js-categories-container';
  var redirect  = '#two';

	ajax(table, option, display, redirect);
	productListview();
}
function productListview(category) {
	var table 	 = 'drug';
	var option	 = 'is_category = 0 && category = "'+category+'"';
	var display  = '.js-product-listview-container';
	var redirect = '#three';

	ajax(table, option, display, redirect);
}
function productDetailview(drugId) {
	var table 	 = 'drug';
	var option	 = 'is_category = 0 && drug_id = "'+drugId+'"';
	var display  = '.js-product-detail-container';
// ***
	ajax(table, option, display);
}

function ajax(table, option, display, redirect) {
  $.ajax({
    url      : 'api',
    dataType : 'json',
    type     : 'get',
    data     : {'table': table, 'option': option},
    success: function(data, status) {
      var str = '';
       $.each(data, function(index, element) {
       		if(redirect == '#two' || redirect == '#three' ) {
						str += teamplateListview(element, redirect);
       		} else {
       			str += teamplateProductDetail(element);
       		}

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
 teamplateListview = function(element, redirect) {
	var str = '' +
	 '<li style="padding: 0px;" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-first-child ui-btn-up-c">' +
		'<div class="ui-btn-inner ui-li">' +
				'<div class="ui-btn-text">' +
					'<a href="'+redirect+'" class="js-category ui-link-inherit" data-itemCategory="'+element.category+'" data-drugId="'+element.drug_id+'">' +
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
 teamplateReviewListview = function(element) {
 	var str = '' +
		'<li style="padding: 0px;" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-first-child ui-btn-up-c">' +
			'<div class="ui-btn-inner ui-li">' +
				'<div class="ui-btn-text">' +
					'<a href="#review-detailview" class="ui-link-inherit">' +
						'<div class="ui-li-thumb cat-thumbnail" style="background-image: url(http://d.fastcompany.net/multisite_files/fastcompany/imagecache/inline-sidebar/inline/2015/02/3041578-inline-sally3.jpg)"></div>' +
						'<h2 class="ui-li-heading">Sally said:</h2>' +
						'<p class="ui-li-desc">This is awesome<respect class=""></respect></p>' +
						'<div class="rating">' +
							'<span>☆</span><span>☆</span><span>☆</span>' +
						'</div>' +
					'</a>' +
				'</div>' +
			'</div>' +
		'</li>';
 	return str;
 }
 teamplateProductDetail = function(element) {
	var str = '' +
	 '<div class="product-image" style="background-image: url('+element.photo_name+')"></div>' +
			'<h2><span class="capitalize">'+element.category+'</span> / <span class="capitalize">'+ element.title+'</span></h2>' +
			'<div class="rating text-left">' +
				'<span>☆</span><span>☆</span><span>☆</span>' +
			'</div>' +
			'<p>'+element.description+'</p>' +
			'<a href="#review-listview" data-direction="reverse" data-role="button" data-theme="c">All Products Review</a>' +
			'<div class="review-container">' +
				'<ul data-role="listview" data-inset="true" class="js-review-detail ui-listview ui-listview-inset ui-corner-all ui-shadow">' +
				// todo: Move to new template
				'<li style="padding: 0px;" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-first-child ui-btn-up-c">' +
					'<div class="ui-btn-inner ui-li">' +
						'<div class="ui-btn-text">' +
							'<a href="#review-detailview" class="ui-link-inherit">' +
								'<div class="ui-li-thumb cat-thumbnail" style="background-image: url(http://d.fastcompany.net/multisite_files/fastcompany/imagecache/inline-sidebar/inline/2015/02/3041578-inline-sally3.jpg)"></div>' +
								'<h2 class="ui-li-heading">Sally said:</h2>' +
								'<p class="ui-li-desc">This is awesome<respect class=""></respect></p>' +
								'<div class="rating">' +
									'<span>☆</span><span>☆</span><span>☆</span>' +
								'</div>' +
							'</a>' +
						'</div>' +
					'</div>' +
				'</li>' +
				//
				'</ul>' +
			'</div>';
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
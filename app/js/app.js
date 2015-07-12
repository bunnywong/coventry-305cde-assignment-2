loadCategories();

/* Page Function
-------------------------------------------------- */
function loadCategories() {
  var option      = 'is_category = 1';

  $.ajax({
    url      : 'api',
    dataType : 'json',
    type     : 'get',
    data     : {'table': 'drug', 'option': option},
    success: function(data, status) {
      var str = '';
       $.each(data, function(index, element) {
           str += teamplateCategories(element);
        });
       $('.js-categories-container').html(str);
    },
    error: function(xhr, desc, err) {
      console.log(xhr);
      console.log("Details: " + desc + "\nError:" + err);
    }
  });
}

/* Template
-------------------------------------------------- */
 teamplateCategories = function(element) {
	var str = '' +
	 '<li style="padding: 0px;" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-first-child ui-btn-up-c">' +
		'<div class="ui-btn-inner ui-li">' +
				'<div class="ui-btn-text">' +
					'<a href="#two&catId='+element.drug_id+'" class="ui-link-inherit">' +
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
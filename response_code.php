<?php
	$url = 'http://localhost/_my_site/3_lab/peak/api';
	$response_code = get_headers($url);
	$response_code = substr($response_code[0], 9, 3);
	$response_code = get_http_response_code($url);
	echo $response_code;
?>
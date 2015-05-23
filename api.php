<?php

  /* - Table of content -
    =DB config
    =REST setup
    =DB Query
    =Debug
  -------------------------------------------------- */

  /* =DB config
  -------------------------------------------------- */
  include('config.php');

  //Connecting to your database
  mysql_connect($hostname, $username, $password) OR DIE ("Unable to
  connect to database!");
  mysql_select_db($dbname);

  /* =REST setup
  -------------------------------------------------- */
  $request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));
  $method  = $_SERVER['REQUEST_METHOD'];

  if(isset($_GET['title']) || isset($_GET['title'])) {
    $data['drug_id']     = $_GET['drug_id'];
    $data['title']       = $_GET['title'];
    $data['description'] = $_GET['description'];
  } else {
    parse_str(file_get_contents("php://input"), $post_vars);
    $data['drug_id']     = $post_vars['drug_id'];
    $data['title']       = $post_vars['title'];
    $data['description'] = $post_vars['description'];
  }

  switch ($method) {
    case 'PUT':
      query($method, $data);
      break;
    case 'POST':
      query($method, $data);
      break;
    case 'GET':
      query($method, $data);
      break;
    case 'DELETE':
      query($method, $data);
      break;
    default:
      rest_error($request);
      break;
  }

  /* =DB Query
  -------------------------------------------------- */
  function query($method, $data) {
    $results = array();

    if(strtolower($method) == 'put') {
      // todo: MySQL
      $results[] = array(
        'title' => 'PUT title',
        'description' => 'PUT description'
     );

    } else if(strtolower($method) == 'get') {
      $sql = mysql_query("select * from drug");
      while($row = mysql_fetch_array($sql)) {
       $results[] = array(
          'title' => $row['title'],
          'description' => $row['description'],
       );
      }
    } else if(strtolower($method) == 'post') {
      // todo: MySQL
      $results[] = array(
        'title' => 'POST title',
        'description' => 'POST description'
     );
    } else if(strtolower($method) == 'delete') {
      // todo: MySQL
      $results[] = array(
        'title' => 'DELET title',
        'description' => 'DELET description'
     );
    }

    echo json_encode($results);
  }

  /* =Debug
  -------------------------------------------------- */
  function vd($var) {
    echo '<pre>';
    echo var_dump($var);
    echo '</pre>';
  }
?>
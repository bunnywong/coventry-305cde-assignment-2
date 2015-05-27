<?php
  header('Content-Type: application/json');
  /*
  - Table of content -

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
    $data['table']       = $_GET['table'];
    $data['title']       = $_GET['title'];
    $data['description'] = $_GET['description'];
  } else {
    parse_str(file_get_contents("php://input"), $post_vars);
    $data['table']     = $post_vars['table'];
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
    $table   = $data['table'];

    if(strtolower($method) == 'put') {
      // PUT
      // todo: MySQL
      $results[] = array(
        'method' => 'PUT'
     );

    } else if(strtolower($method) == 'get') {
      // GET
      $sql = mysql_query("SELECT * FROM $table");
      while($row = mysql_fetch_array($sql)) {
       $results[] = $row;
      }

    } else if(strtolower($method) == 'post') {
      // POST
      // todo: MySQL
      $results[] = array(
        'message' => 'confirm'
     );
    } else if(strtolower($method) == 'delete') {
      // DELETE
      // todo: MySQL
      $results[] = array(
        'method' => 'DELETE'
     );
    }

    echo json_encode(utf8ize($results));
  }

  function utf8ize($d) {
    if (is_array($d))
        foreach ($d as $k => $v)
            $d[$k] = utf8ize($v);
     else if(is_object($d))
        foreach ($d as $k => $v)
            $d->$k = utf8ize($v);
     else
        return utf8_encode($d);
    return $d;
  }

  /* =Debug
  -------------------------------------------------- */
  function vd($var) {
    echo '<pre>';
    echo var_dump($var);
    echo '</pre>';
  }
?>



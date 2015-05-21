<?php

  /*
    =DB
    =Script
  -------------------------------------------------- */

  /* =DB
  -------------------------------------------------- */
  include('config.php');
  $usertable = "user";
  $yourfield = "email";

  //Connecting to your database
  mysql_connect($hostname, $username, $password) OR DIE ("Unable to
  connect to database! Please try again later.");
  mysql_select_db($dbname);

  //Fetching from your database table.
  $query = "SELECT * FROM $usertable";
  $result = mysql_query($query);

  if ($result) {
      while($row = mysql_fetch_array($result)) {
          $name = $row["$yourfield"];
          echo "Connected DB: By $username student<br>";
      }
  }

  /* =Script
  -------------------------------------------------- */
  $method = $_SERVER['REQUEST_METHOD'];
  //$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

  if(isset($_POST['userid'])) {
    $peakapple = $_POST['userid'];
  }

  switch ($method) {
    case 'PUT':
      echo "Method: put";
      parse_str(file_get_contents("php://input"), $post_vars);
      print_r($post_vars);
      break;
    case 'POST':
      echo "Method: POST";
      echo '<br>userid: '.$peakapple;
      break;
    case 'GET':
      echo "Method: GET";
      break;
    case 'DEL':
      echo "Method: DEL";
      break;
    default:
      rest_error($request);
      break;
  }
?>
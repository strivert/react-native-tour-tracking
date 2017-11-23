<?php
session_start();
include('common/connection.php');
if($_SESSION['AdminUser']==""){
			$URL="login.php";
		    ReDirect($URL);
			exit();
}

$TemplateFile="template.php";
$page=$_REQUEST['page'];

require './lib/firebaseLib.php';
include('config.php');
$firebase = new Firebase\FirebaseLib($url, $token);

if (isset($_SESSION['AdminUser'])) {
	switch($page)
	{

	case "personal";
		  {
		   
			$Title="Personal Data";

			$personal = $firebase->get('/personal');
			$personal = json_decode($personal, true);

			$MiddleContents["page"]="views/personal.php";
			include($TemplateFile);
			break;
	}

	case "point";
		  {
		   
			$Title="Tracks";

			$point = $firebase->get('/point');
			$point = json_decode($point, true);

			$MiddleContents["page"]="views/point.php";
			include($TemplateFile);
			break;
	}

	case "survey";
		  {
		   
			$Title="Survey";

			$survey = $firebase->get('/survey');
			$survey = json_decode($survey, true);

			$MiddleContents["page"]="views/survey.php";
			include($TemplateFile);
			break;
	}

	case "logout";
			  {
				session_destroy();
			    $URL="login.php?Msg=Successfully Logout";
			    ReDirect($URL);
			    break;
			  } 
	default:
			{
				$Title="Admin: Dashboard";
				$MiddleContents["page"]="views/home.php";
				include($TemplateFile);
		    }	
	
	
	}
}
else {
	session_destroy();
    $URL="login.php?Msg=Successfully Logout";
    ReDirect($URL);
    exit;	
}
?>
<?php

	require '../lib/firebaseLib.php';
	include('../config.php');
	$firebase = new Firebase\FirebaseLib($url, $token);

	$personal = $firebase->get('/personal');		
	$personal = json_decode($personal, true);

	function g_file_download( $arr ){
		header("Content-Type: text/csv");
		header('Content-Disposition: attachment; filename=personal.csv');
		outputCSV($arr);
	}

	function outputCSV($data) {
	  $output = fopen("php://output", "w");
	  foreach ($data as $row){
		fputcsv($output, $row); // here you can change delimiter/enclosure
	  }
	  fclose($output);
	}

	$m=1;
	$dataArray = array(
		array(
			"No",
			"Device Id",
			"Age",
			"HowManyInThePast",
			"PostalCode/Other Country",
			"Education",
			"Gender",
			"CurrencyType",
			"Tax"
		)
	);
	if (sizeof($personal) >= 1) {
		foreach($personal as $key=>$v){
			$dataArray[$m] = array(
				$m,
				$key,
				$v['iAge'],
				$v['iHowMany'],
				$v['iResidence'],
				$v['sEducation'],
				$v['sGender'],
				$v['sMoneyType'],
				$v['sTax']
			);
			$m++;	
		}	
	}
	g_file_download($dataArray);

?>
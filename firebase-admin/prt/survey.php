<?php

	require '../lib/firebaseLib.php';
	include('../config.php');
	$firebase = new Firebase\FirebaseLib($url, $token);

	$survey = $firebase->get('/survey');		
	$survey = json_decode($survey, true);


	$prtArray = array();
	foreach($survey as $key=>$r){
		foreach($r as $k=>$v){
			$v["deviceId"] = $key;
			$prtArray[] = $v;
		}
	}
	
	$temp = array();
	foreach ($prtArray as $key => $row)
	{
		$temp[$key] = $row['dateTime'];
	}

	array_multisort($temp, SORT_ASC, $prtArray);





	function g_file_download( $arr ){
		header("Content-Type: text/csv");
		header('Content-Disposition: attachment; filename=survey.csv');
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
			"Date Time",
			"Activity",
			"WithWhomConduct",
			"LearnNature",
			"TogetherWithFamily/Friends",
			"Health",
			"Inspire",
			"Nurture",
			"Experience",
			"Overall",
			"Comment",
			"Email",
			"TrackNum"
		)
	);

	if (sizeof($prtArray) >= 1) {
		foreach($prtArray as $k=>$v){
			
				$dtArr = explode("-", $v['dateTime']);

				$dataArray[$m] = array(
					$m,
					$v['deviceId'],
					date('d.m.Y H:i', $dtArr[0]),
					$v['sActivity'],
					$v['sParticipant'],
					$v['smLearnNature'],
					$v['smTogether'],
					$v['smHealth'],
					$v['smInspire'],
					$v['smNurture'],
					$v['sExperience'],
					$v['smOverall'],
					$v['iComment'],
					$v['iEmail'],
					$v['stage']
				);
				$m++;
		}
	}

	g_file_download($dataArray);
?>
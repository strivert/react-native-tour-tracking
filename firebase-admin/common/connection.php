<?php
ini_set('display_errors',0);

ini_set('upload_max_filesize', '70M');
ini_set('post_max_size', '40M');
ini_set('max_input_time', 300);
ini_set('max_execution_time', 300);

define('SURL', "http://".$_SERVER['SERVER_NAME']."/firebase/"); 
define('MYSURL',"http://".$_SERVER['SERVER_NAME']."/firebase/");
define('DOC_ROOT',$_SERVER['DOCUMENT_ROOT']."/");
define('TITLE', "Jotunheimen Places");
	
function ReDirect($URL){
	@header("Location: $URL");
	echo'	<script type="text/javascript">
			window.location = "'.$URL.'"
		</script>';
}
												
?>
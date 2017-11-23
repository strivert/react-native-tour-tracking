<?php
	$dataArray = array();
	foreach($point as $key=>$r){
		foreach($r as $k=>$v){
			$v["deviceId"] = $key;
			$dataArray[] = $v;
		}
	}
	
	$temp = array();
	foreach ($dataArray as $key => $row)
	{
		$temp[$key] = $row['dateTime'];
	}

	array_multisort($temp, SORT_ASC, $dataArray);
?>
<div class="box">
	<div class="box-head tabs">
		<h3><?php echo $Title;?></h3>
		<ul class='nav nav-tabs'>
			<li class='active'>
				<a href="#basic" data-toggle="tab" style="cursor:pointer;" onclick="saveAsExcel();">Download csv file</a>
			</li>
		</ul>
	</div>
	<div class="box-content box-nomargin">
		<div class="tab-content">
				<div class="tab-pane active" id="basic">
					<div class="box-content box-nomargin">
					<table class='table table-striped dataTable table-bordered' id='tracks'>
						<thead>
							<tr>
								<th width="20">No</th>
								<th width="85">Device Id</th>
								<th width="85">Date Time</th>
								<th width="85">Lat</th>
								<th width="85">Long</th>
								<th width="85">Status</th>
								<th width="85">Content</th>
								<th width="85">TrackNumber</th>
							</tr>
						</thead>
						<tbody>
						<?php
							$m=1;
							foreach($dataArray as $k=>$v){

								$dtArr = explode("-", $v['dateTime']);
								
								$cnt = "";
								for($t=0; $t<=6; $t++){
									if( isset($v["item_".$t]) )
										$cnt .= $v["item_".$t].", ";
								}
								$cnt = substr($cnt, 0, -2);
						?>	
								<tr>
									<td style="text-align: center;"><?php echo $m;?></td>
									<td><?php echo $v['deviceId']; ?></td>
									<td style="text-align: right;"><?php echo date('Y-m-d H:i', $dtArr[0]); ?></td>
									<td><?php echo $v['lat']; ?></td>
									<td><?php echo $v['long']; ?></td>
									<td><?php echo $v['mode']; ?></td>
									<td><?php echo $cnt; ?></td>
									<td><?php echo $v['stage']; ?></td>
								</tr>
						<?php	 	
							$m++;
							}
						?>
						</tbody>
					</table>									
				</div>
			</div>			
		</div>
	</div>
</div>

<form id="myFrm" method="post">
</form>
<script>
	function saveAsExcel(){
		$('#myFrm').get()[0].action="./prt/point.php";
		$("#myFrm").submit();
	}
	
	
</script>
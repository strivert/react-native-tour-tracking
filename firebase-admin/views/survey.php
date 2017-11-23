<?php
	$dataArray = array();
	foreach($survey as $key=>$r){
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
					<table class='table table-striped dataTable table-bordered' id="surveys">
						<thead>
							<tr>
								<th width="20">No</th>
								<th width="85">Device Id</th>
								<th width="85">Date Time</th>								
								<th width="85">Activity</th>
								<th width="85">WithWhomConduct</th>
								<th width="85">LearnNature</th>
								<th width="85">TogetherWith<br>Family/Friends</th>
								<th width="85">Health</th>
								<th width="85">Inspire</th>
								<th width="85">Nurture</th>
								<th width="85">Experience</th>								
								<th width="85">Overall</th>								
								<th width="85">Comment</th>
								<th width="85">Email</th>
								<th width="85">TrackNum</th>
							</tr>
						</thead>
						<tbody>
						<?php
							$m=1;
							foreach($dataArray as $k=>$v){

								$dtArr = explode("-", $v['dateTime']);
							
						?>	
								<tr>
									<td style="text-align: center;"><?php echo $m;?></td>
									<td><?php echo $v['deviceId']; ?></td>
									<td style="text-align: right;"><?php echo date('Y-m-d H:i', $dtArr[0]); ?></td>								
									<td><?php echo $v['sActivity']; ?></td>
									<td><?php echo $v['sParticipant']; ?></td>
									<td><?php echo $v['smLearnNature']; ?></td>
									<td><?php echo $v['smTogether']; ?></td>
									<td><?php echo $v['smHealth']; ?></td>
									<td><?php echo $v['smInspire']; ?></td>
									<td><?php echo $v['smNurture']; ?></td>
									<td><?php echo $v['sExperience']; ?></td>								
									<td><?php echo $v['smOverall']; ?></td>								
									<td><?php echo $v['iComment']; ?></td>
									<td><?php echo $v['iEmail']; ?></td>
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
		$('#myFrm').get()[0].action="./prt/survey.php";
		$("#myFrm").submit();
	}
</script>
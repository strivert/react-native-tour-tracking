<div class="box">
	<div class="box-head tabs">
		<h3><?php echo $Title;?></h3>
		<ul class='nav nav-tabs'>
			<li class='active'>
				<a href="#basic" data-toggle="tab" style="cursor:pointer;" onclick="saveAsExcel();">Download excel file</a>
			</li>
		</ul>
	</div>
	<div class="box-content box-nomargin">
		<div class="tab-content">
				<div class="tab-pane active" id="basic">
					<div class="box-content box-nomargin">
					<table class='table table-striped dataTable table-bordered'>
						<thead>
							<tr>
								<th width="20">No.</th>
								<th width="85">Device Id</th>
								<th width="85">Date Time</th>
								<th width="85">PostCode</th>
								<th width="85">Country</th>
								<th width="85">Origin</th>
							</tr>
						</thead>
						<tbody>
						<?php
						$m=1;
					    foreach($records as $key=>$r){
							foreach($r as $k=>$v){
						?>	
							<tr>
								<td style="text-align: center;"><?php echo $m.$q;?></td>
								<td><?php echo $key; ?></td>
								<td style="text-align: right;"><?php echo date('m/d/Y H:i:s', $v['date_time']); ?></td>
								<td><?php echo $v['post_code']; ?></td>
								<td><?php echo $v['country']; ?></td>								
								<td><?php echo $v['origin']; ?></td>
							</tr>
						<?php	 	
							$m++;
							}
						
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
		$('#myFrm').get()[0].action="./prt/stastics.php";
		$("#myFrm").submit();
	}
</script>
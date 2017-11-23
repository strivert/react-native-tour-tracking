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
					<table class='table table-striped dataTable table-bordered'>
						<thead>
							<tr>
								<th width="20">No</th>
								<th width="85">Device Id</th>
								<th width="85">Age</th>
								<th width="85">HowManyInThePast</th>
								<th width="85">PostalCode/Other Country</th>
								<th width="85">Education</th>
								<th width="85">Gender</th>
								<th width="85">CurrencyType</th>
								<th width="85">Tax</th>
							</tr>
						</thead>
						<tbody>
						<?php
						$m=1;
					    foreach($personal as $key=>$v){
						?>	
							<tr>
								<td style="text-align: center;"><?php echo $m;?></td>
								<td><?php echo $key; ?></td>
								<td><?php echo $v['iAge']; ?></td>
								<td><?php echo $v['iHowMany']; ?></td>
								<td><?php echo $v['iResidence']; ?></td>								
								<td><?php echo $v['sEducation']; ?></td>
								<td><?php echo $v['sGender']; ?></td>
								<td><?php echo $v['sMoneyType']; ?></td>
								<td><?php echo $v['sTax']; ?></td>
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
		$('#myFrm').get()[0].action="./prt/personal.php";
		$("#myFrm").submit();
	}
</script>
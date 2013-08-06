{include file="header.tpl" url=$url}
		<div class='contentPad'>
			<div id="searchdiv">
				Search:&nbsp;&nbsp;<input type='text' name='search' id='search' class='search' style='width:260px; height:14px;' onkeyup='packlist.searchFor();' {if $search}value='{$search}' {/if}/>&nbsp;&nbsp;<span class="default">(<a href='#' onclick="window.location='/{$bot}/?search=' + document.getElementById('search').value;">permalink</a>)</span>
			</div>
		</div>
		<h2>{$bot}</h2>
	</div>
	<div id='listtable'>
		<h1>Javascript is required for this site.</h1>
	</div>
	<div class='content'><br />
		<center><table cellspacing='0' width='200'>
			<tr class="animeColumn"><th colspan='2' class='name'>Stats</th></tr>
			<tr class='anime0'><td class="name">Packs</td><td class="name">{$packcount}</td></tr>
			<tr class='anime1'><td class="name">Open Slots</td><td class="name">{$openslots}</td></tr>
			<tr class='anime0'><td class="name">Total Slots</td><td class="name">{$totalslots}</td></tr>
			<tr class='anime1'><td class="name">Min. Speed</td><td class="name">{$minspeed}</td></tr>
			<tr class='anime0'><td class="name">Max. Record</td><td class="name">{$maxspeed}</td></tr>
			<tr class='anime1'><td class="name">Curr. BW</td><td class="name">{$currbw}</td></tr>
			<tr class='anime0'><td class="name">Record BW</td><td class="name">{$overallrecord}</td></tr>
			<tr class='anime1'><td class="name">Offered</td><td class="name">{$offered}</td></tr>
			<tr class='anime0'><td class="name">Total BW</td><td class="name">{$bandwidth}</td></tr>
		</table></center>
		<script type="text/javascript">
		//<![CDATA[
		packlist.nick = "{$bot}";
{$packlist}
		packlist.init();
{if $search}		packlist.searchFor();{/if}

		//]]>
		</script>
	</div>
	<div class='content' align="center"><a href="javascript:goTop();">&#8593;&#8593;</a></div>
{include file="footer.tpl" ver=$ver}

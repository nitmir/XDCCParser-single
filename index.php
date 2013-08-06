<?php

/**
 * XDCC Parser
 * |- Index
 *
 * This software is free software and you are permitted to
 * modify and redistribute it under the terms of the GNU General
 * Public License version 3 as published by the Free Sofware
 * Foundation.
 *
 * @link http://xdccparser.is-fabulo.us/
 * @version 1.1.5
 * @author Alex 'xshadowfire' Yu <ayu@xshadowfire.net>
 * @author DrX
 * @copyright 2008-2009 Alex Yu and DrX
 */

require_once 'smarty/libs/Smarty.class.php';
require_once 'config.php';

function fetch_packs(&$packlist, &$columnsort) {
	global $packs;
	$sizes = array('K' => 1.0/1024, 'M' => 1, 'G' => 1024, 'T' => 1048576);
	for($i=0;count($packs['0'])>$i;$i++) {
		$xpacks[$packs['1'][$i]]['number'] = $packs['1'][$i];
		$xpacks[$packs['1'][$i]]['name'] = $packs['5'][$i].".".$packs['6'][$i];
		$packs['3'][$i] = round($packs['3'][$i]*doubleval($sizes[$packs['4'][$i]]));
		$xpacks[$packs['1'][$i]]['size'] = $packs['3'][$i];
		$xpacks[$packs['1'][$i]]['gets'] = $packs['2'][$i];
	}

	$i = 0;
	$packlist = "";
	foreach($xpacks as $key => $val) {
		$packlist .= "\t\tpacklist.packs[".$i++."] = {number:".$xpacks[$key]['number'].", gets:".$xpacks[$key]['gets'].", size:".$xpacks[$key]['size'].", name:\"".$xpacks[$key]['name']."\"};\n";
	}
}

$s = new Smarty();
$s->caching = false;
$s->template_dir = "./tpl";
$s->compile_dir = "./templates_c";
$s->assign("url",PUBLIC_URL);
$s->assign("skin", $_GET['skin'] ? $_GET['skin'] : SKIN);
if(IRC) {
$s->assign("irc_chan", IRC_CHANNEL);
$s->assign("irc_net", IRC_NETWORK);
}
$s->assign("ver","1.1");

if ( $bots[$_GET['bot']] ) {

	$xdccList = file_get_contents($bots[$_GET['bot']]['list']);
	$xdccList = str_replace( array( chr(2), chr(3), chr(16), chr(31), chr(13) ), "", $xdccList ); //remove irc formatting (or something <_<)

	/* GET PACKS & INFO */
	preg_match_all("/#(\d+)\s+(\d+)x\s+\[.*?(\d+\.?\d+?)(\D)\]\s+(.*)\W/mi",$xdccList,$packs);
	preg_match("/\s+\*\*\s+To\s+request\s+a\s+file,\s+type\s+\"\/msg\s+(.*?)\s+xdcc\s+send|get\s+#x\"\s+\*\*\s+\W/mi",$xdccList,$data['nick']);
	preg_match("/\s+\*\*\s+(\d+)\s+packs?\s+\*\*\s+(\d+)\s+of\s+(\d+)\s+slots\s+open,\s+(Min:\s+(.*?),\s+)?(Max:\s+.*?,\s+)?Record:\s+(.*)\W/mi",$xdccList,$data['slotsbw']);
	preg_match("/\s+\*\*\s+Bandwidth\s+Usage\s+\*\*\s+Current:\s+(.*?),\s+(Cap:\s+.*?,\s+){0,1}Record:\s+(.*)\W/mi",$xdccList,$data['bw']);
	preg_match("/Total\s+Offered:\s+(.*?)\s*(KB|MB|GB|TB|PB)\s+Total\s+Transferred:\s+(.*?)\s*(KB|MB|GB|TB|PB)\W/mi",$xdccList,$data['totals']);
	/* GET PACKS & INFO */

	/* ASSIGN VAR */
	$nick = $data['nick']['1'];
	$stats['packcount'] = $data['slotsbw']['1'];
	$stats['openslots'] = $data['slotsbw']['2'];
	$stats['totalslots'] = $data['slotsbw']['3'];
	$stats['minspeed'] = $data['slotsbw']['5'] ? $data['slotsbw']['5'] : "0.0KB/s";
	$stats['maxspeed'] = $data['slotsbw']['7'];
	$stats['currbw'] = $data['bw']['1'];
	$stats['overallrecord'] = $data['bw']['3'];
	$stats['offered'] = $data['totals']['1'].$data['totals']['2'];
	$stats['bandwidth'] = $data['totals']['3'].$data['totals']['4'];
	/* END ASSIGN */
				
	fetch_packs($packlist, $columnsort);
	$stats['currbw'] = explode(", ", $stats['currbw']);
	$stats['currbw'] = $stats['currbw'][0];

	$s->assign("bot", $_GET['bot']);
	$s->assign("packlist", $packlist);
	$s->assign("search", $_GET['search']);
	foreach($stats as $key => $value) {
		$s->assign($key, $value);
	}
	$s->display("packlist.tpl");
} else {
        $s->assign("bots", $bots);
        $s->display("botlist.tpl");
}
?>

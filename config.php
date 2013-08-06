<?php

/**
 * XDCC Parser
 * |- Configuration
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

/* ############################################# */
/* #                system vars                # */
/* ############################################# */

define('PUBLIC_URL', 'http://www.yourpage.com/listing/'); // include trailing slash
define('SKIN', 3); // comes with 3 skins, set to 1, 2, or 3. 1 = dark, 2 = light pink, 3 = rain
define('IRC', 0); // if you set this to 1 make sure you set the channel and network too
define('IRC_CHANNEL', 'xdccparser'); //no # needed
define('IRC_NETWORK', 'irc.rizon.net'); //the network ofc

/* ############################################# */
/* #             bot configuration             # */
/* ############################################# */

/* example
$bots['botname'] = array(
'geos' => "US",
'list' => "http://your.site/packlist.txt"
);
*/

$bots['[XDCC]`KGSubs'] = array(
'geos' => 'FR',
'list' => "http://kghome.mine.nu/xdcc/dcclist.txt"
);
?>

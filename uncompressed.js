/**
 * XDCC Parser
 * |- Javascript Module
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

function packlist() {
	this.nick = "";
	this.packs = new Array();
	this.search = new Array();
	this.init=function() {
		this.table=document.getElementById('listtable');
		this.searchdiv = document.getElementById('searchdiv');
		this.search = this.packs.slice(0,this.packs.length);
		this.tablehead="<table width='900' cellspacing='0' id='listtable'><tr class='animeColumn'><th class='number'>Pack <a href='javascript:packlist.search.sort(packlist.numberDesc);packlist.flush();'>&#8593;</a>&nbsp;&nbsp;<a href='javascript:packlist.search.sort(packlist.numberAsc);packlist.flush();'>&#8595;</a></th><th class='number'>Gets <a href='javascript:packlist.search.sort(packlist.getsDesc);packlist.flush();'>&#8593;</a>&nbsp;&nbsp;<a href='javascript:packlist.search.sort(packlist.getsAsc);packlist.flush();'>&#8595;</a></th><th class='number'>Size <a href='javascript:packlist.search.sort(packlist.sizeDesc);packlist.flush();'>&#8593;</a>&nbsp;&nbsp;<a href='javascript:packlist.search.sort(packlist.sizeAsc);packlist.flush();'>&#8595;</a></th><th class='name'>Filename <a href='javascript:packlist.search.sort(packlist.nameDesc);packlist.flush();'>&#8593;</a>&nbsp;&nbsp;<a href='javascript:packlist.search.sort(packlist.nameAsc);packlist.flush();'>&#8595;</a></th></tr>";
		this.flush();
	};
	this.flush=function() {
		var buffer = this.tablehead;
		if(this.search.length<1) {
			buffer += "<tr class='anime0' id='none' ><td class='none' colspan='4'>No packs found.</td></tr>";
		} else {
		        for(i=0;i<this.search.length;i++) {
				var size = (this.search[i]['size']==0) ? "<1" : this.search[i]['size'];
				size += "M";
				buffer += "<tr class='anime"+(i%2)+"' onclick=\"packlist.genCommand(this);\"><td class='number'>"+this.search[i]['number']+"</td><td class='number'>"+this.search[i]['gets']+"</td><td class='number'>"+size+"</td><td class='name'>"+this.search[i]['name']+"</td></tr>";
			}
		}
		buffer += "</table>";
		this.table.innerHTML = buffer;
	};
	this.genCommand=function(row) {
		var pack = row.cells[0].innerHTML;
		prompt('Paste this in your irc client:','/msg '+this.nick+' xdcc send #'+pack);
	};
	this.searchFor=function() {
		this.search = new Array();
		var t = document.getElementById('search').value.replace(/\[/ig,"\\[").replace(/\]/ig,"\\]").replace(/\+/ig,"\\+").replace(/\*/ig,"\\*").replace(/\(/ig,"\\(").replace(/\)/ig,"\\)").replace(/(_|;|'|\.)/gi," ").split(" ");
		for(var i in t) {
			t[i] = new RegExp(t[i], "i");
		}
		var index = 0;
		ploop:
		for(var i=0;i<this.packs.length;i++) {
			for(var k in t) {
				if(!this.packs[i]['name'].match(t[k]))
					continue ploop;
			}
			this.search[index] = this.packs[i];
			index++;
		}
		this.flush();
	};
	this.numberAsc=function(a,b) {
		var x = a.number;
		var y = b.number;
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	};
	this.numberDesc=function(a,b) {
		var x = a.number;
		var y = b.number;
		return ((x < y) ? 1 : ((x > y) ? -1 : 0));
	};
	this.getsAsc=function(a,b) {
		var x = a.gets;
		var y = b.gets;
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	};
	this.getsDesc=function(a,b) {
		var x = a.gets;
		var y = b.gets;
		return ((x < y) ? 1 : ((x > y) ? -1 : 0));
	};
	this.sizeAsc=function(a,b) {
		var x = a.size;
		var y = b.size;
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	};
	this.sizeDesc=function(a,b) {
		var x = a.size;
		var y = b.size;
		return ((x < y) ? 1 : ((x > y) ? -1 : 0));
	};
	this.nameAsc=function(a,b) {
		var x = a.name.toLowerCase();
		var y = b.name.toLowerCase();
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	};
	this.nameDesc=function(a,b) {
		var x = a.name.toLowerCase();
		var y = b.name.toLowerCase();
		return ((x < y) ? 1 : ((x > y) ? -1 : 0));
	};
}

packlist = new packlist();

function getScrollY() {
	var scrollY = 0;
	if ( document.documentElement && document.documentElement.scrollTop ) {
		scrollY = document.documentElement.scrollTop;
	} else if ( document.body && document.body.scrollTop ) {
		scrollY = document.body.scrollTop;
	} else if ( window.pageYOffset ) {
		scrollY = window.pageYOffset;
	} else if ( window.scrollY ) {
		scrollY = window.scrollY;
	}
	return scrollY;
}
function goTop() {
	var dx = 0;
	var dy = 0;
	var bx = 0;
	var by = 0;
	if (document.documentElement) {
		dx = document.documentElement.scrollLeft || 0;
		dy = document.documentElement.scrollTop || 0;
	}
	if (document.body) {
		bx = document.body.scrollLeft || 0;
		by = document.body.scrollTop || 0;
	}
	var wx = window.scrollX || 0;
	var wy = window.scrollY || 0;
	var x = Math.max(wx, Math.max(bx, dx));
	var y = Math.max(wy, Math.max(by, dy));
	window.scrollTo(Math.floor(x / 1.5), Math.floor(y / 1.5));
	if(x > 0 || y > 0) {
		window.setTimeout("goTop()", 15);
	}
}
window.onscroll=function() {
	var scrollY = getScrollY();
	if(scrollY > 76) {
		packlist.searchdiv.style.top = (scrollY-79)+"px";
	} else {
		packlist.searchdiv.style.top = "0px";
	}
};

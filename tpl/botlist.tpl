{include file="header.tpl" url=$url}
<h2>Bots</h2>
<ul class="forwards">
{foreach from=$bots key=nick item=bot}
<li><a href="{$url}{$nick}/">{$nick}</a> ({$bot.geos})</li>
{/foreach}
</ul>
</div>
{include file="footer.tpl" ver=$ver}

<h2>Twitch BubbleChat Overlay</h2>

[English](README.md)

<p>Dieses Chat-Overlay sorgt für eine ansprechende Darstellung im Sprechblasendesign von Chatnachrichten in Echtzeit. Zudem werden Emotes von Twitch (Globale und vom Channel), BTTV, 7TV und FFZ vollständig unterstützt, sofern vom Streamenden bei den Anbietern eingerichtet, sodass die gesamte Bandbreite an Community-Emotes nahtlos integriert ist.</p>

<h2>Einrichtung</h2>
<p>Es gibt zwei Möglichkeiten! Man kann entweder die GitHub-URL in den Quellcode der OBS Browser Source einfügen oder die drei Dateien (chat.html, javascript.js und comfy.min.js) in denselben Ordner herunterladen und die lokale chat.html einbinden. In beiden Fällen muss bei der URL der Channelname hinzugefügt werden.<br><br>

<b>GitHub-URL zum Einbinden:</b><br> https://zakoom.github.io/twitchtools-bubblechat/chat.html?channelname=%channelname%</p>
<br>
<p><h3>Es gibt auch optionale Parameter:</h3>
<b>clientid und authtoken:</b> Diese sind Pflicht, wenn man Emotes verwenden möchte. Wenn die Client-ID oder der AuthToken unbekannt ist, kann man sie online generieren, zum Beispiel <a href="https://www.zakoom.de/twitchtools/tokenidgenerator" target="_blank">hier</a> (<a href="https://github.com/Zakoom/twitchtools-tokenidgenerator" target="_blank">Zum GitHub Repo</a>)<br>
<b>use_bttv:</b> Dieser Parameter wird auf 1 gesetzt, wenn die konfigurierten Emotes von BTTV angezeigt werden sollen.<br>
<b>use_7tv:</b> Dieser Parameter wird auf 1 gesetzt, wenn die konfigurierten Emotes von 7TV angezeigt werden sollen.<br>
<b>use_ffz:</b> Dieser Parameter wird auf 1 gesetzt, wenn die konfigurierten Emotes von FFZ angezeigt werden sollen.<br>
<p></p>Wenn alles verwendet werden soll mit Beispielsweise dem Channelnamen zakoom, der Client-ID 123456789 und dem AuthToken abcdef7890, ist hier ein Beispiel:<br><br>

GitHub-URL zum Einbinden:</b><br> https://zakoom.github.io/twitchtools-bubblechat/chat.html?channelname=zakoom&clientid=123456789&authtoken=abcdef7890&use_bttv=1&use_7tv=1&use_ffz=1</p>

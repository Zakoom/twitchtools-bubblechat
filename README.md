# twitchtools-bubblechat
This Twitch chat overlay displays messages in real time in a speech bubble design. It even supports emotes from BTTV, 7TV, and FFZ, as long as the streamer has set them up.

To add this chat overlay to your stream, all you need to do is include a new browser source in OBS with the desired size. Here’s the URL to embed it:

URL to embed: https://github.com/Zakoom/twitchtools-bubblechat/blob/main/chat.html?channelname=%channelname%


Now, let’s talk about some additional parameters:

- twitchid: This is a must-have if you want to use emotes from BTTV, 7TV, and FFZ. If you don't know your Twitch-ID, you can generate it online, for example, here: https://www.zakoom.de/twitchtools/tokenidgenerator (<a href="https://github.com/Zakoom/twitchtools-tokenidgenerator" target="_blank">GitHub Repo</a>)
- use_bttv: This parameter is set to 1 if you want to display the configured emotes from BTTV.
- use_7tv: This parameter is set to 1 if you want to display the configured emotes from 7TV.
- use_ffz: This parameter is set to 1 if you want to display the configured emotes from FFZ.

Let’s say you want to use everything, with the Channelname zakoom and the Twitch-ID 123456789, here’s an example:

URL to embed: https://github.com/Zakoom/twitchtools-bubblechat/blob/main/chat.html?channelname=zakoom&twitchid=123456789&use_bttv=1&use_7tv=1&use_ffz=1

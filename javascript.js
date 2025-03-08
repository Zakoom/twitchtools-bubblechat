// URL-Parameter auslesen
const urlParams = new URLSearchParams(window.location.search);
// EmoteMap aktivieen
const emoteMap = new Map();

// Channelname auslesen & prüfen, ob er existiert und nicht leer ist
const channelName = urlParams.get('channelname');
const isChannelValid = channelName && channelName.trim().length > 3;
// Twitch-ID auslesen & prüfen, ob sie nur Zahlen enthält
const twitchId = urlParams.get('twitchid');
const isTwitchIDValid = twitchId && /^\d+$/.test(twitchId);
const use_7tv = urlParams.get('use_7tv') === "1";
const use_bttv = urlParams.get('use_bttv') === "1";
const use_ffz = urlParams.get('use_ffz') === "1";


if (!isChannelValid) {
    document.getElementById('chat').innerHTML ="Bitte rufe das Chat-Overlay mit den gewünschten Startparametern auf, mindestens aber ?channelname=%channelname%. z.B: chat.html?channelname=zakoom";
	throw new Error("Kein gültiger Channelname angegeben. Skript wird gestoppt.");
}

if (!isTwitchIDValid) {
	console.error("Fehler: Die Twitch-ID darf nur Zahlen enthalten und wird benötigt wenn Emotes dargestellt werden soll");
}

if (use_7tv) { } else { use_7tv === "0" }
if (use_bttv) { } else { use_bttv === "0" }
if (use_ffz) { } else { use_ffz === "0" }

// 7TV-Emotes laden
async function fetch7TVEmotes(twitchId) {
	try {
		const res = await fetch(`https://7tv.io/v3/users/twitch/${twitchId}`);
		const data = await res.json();
		if (!data.emote_set || !data.emote_set.emotes) {
			throw new Error("Es wurden keine 7TV Emotes eingestellt");
		}
		return data.emote_set.emotes;
	} catch (error) {
		console.error("Fehler beim auslesen der 7TV Emotes:", error);
		return [];
	}
}

// BTTV-Emotes laden
async function fetchBTTVEmotes(twitchId) {
	try {
		const res = await fetch(`https://api.betterttv.net/3/cached/users/twitch/${twitchId}`);
		const data = await res.json();
		if (!data.channelEmotes && !data.sharedEmotes) {
			throw new Error("Es wurden keine BTTV Emotes eingestellt");
		}
		return [...(data.channelEmotes || []), ...(data.sharedEmotes || [])];
	} catch (error) {
		console.error("ehler beim auslesen der BTTV Emotes:", error);
		return [];
	}
}

// FFZ-Emotes laden
async function fetchFFZEmotes(twitchId) {
	try {
		const res = await fetch(`https://api.frankerfacez.com/v1/room/id/${twitchId}`);
		const data = await res.json();
		if (!data.sets || !data.sets[data.room.set]) {
			throw new Error("Es wurden keine FFZ Emotes eingestellt");
		}
		return data.sets[data.room.set].emoticons;
	} catch (error) {
		console.error("Fehler beim auslesen der FFZ Emotes:", error);
		return [];
	}
}

// Alle Emotes laden
async function loadEmotes() {

	// 7TV-Emotes
	if (use_7tv) {
		const emotes7tv = await fetch7TVEmotes(twitchId);
		emotes7tv.forEach(emote => {
			const url = `https:${emote.data.host.url}/3x.webp`;
			emoteMap.set(emote.name, url);
		});
	}

	// BTTV-Emotes
	if (use_bttv) {
		const emotesBttv = await fetchBTTVEmotes(twitchId);
		emotesBttv.forEach(emote => {
			const url = `https://cdn.betterttv.net/emote/${emote.id}/3x`;
			emoteMap.set(emote.code, url);
		});
	}

	// FFZ-Emotes
	if (use_ffz) {
		const emotesFfz = await fetchFFZEmotes(twitchId);
		emotesFfz.forEach(emote => {
			const url = `https:${emote.urls["4"] || emote.urls["2"] || emote.urls["1"]}`;
			emoteMap.set(emote.name, url);
		});
	}

	console.log("Emotes loaded:", emoteMap);
}

// Nachricht mit Emotes parsen
function parseMessageWithEmotes(message) {
	return message.split(" ").map(word =>
		emoteMap.has(word)
			? `<img src="${emoteMap.get(word)}" alt="${word}">`
			: word
	).join(" ");
}

document.addEventListener("DOMContentLoaded", async () => {
    const chat = document.querySelector("#chat");
    await loadEmotes();

    function getBrightness(color) {
        if (color.startsWith('#')) {
            color = color.substring(1);
            const r = parseInt(color.substr(0, 2), 16);
            const g = parseInt(color.substr(2, 2), 16);
            const b = parseInt(color.substr(4, 2), 16);
            return (r * 299 + g * 587 + b * 114) / 1000;
        }
        return 128;
    }

    function getTextColor(backgroundColor) {
        const brightness = getBrightness(backgroundColor);
        return brightness > 128 ? '#000000' : '#FFFFFF';
    }

    ComfyJS.onChat = (user, message, flags, self, extra) => {
    
    	const isAtBottom = chat.scrollTop + chat.clientHeight >= chat.scrollHeight - 1;
        const bubbleWrapper = document.createElement("div");
        bubbleWrapper.classList.add("bubble-wrapper");

        const username = document.createElement("div");
        username.classList.add("chat-username");
        username.style.backgroundColor = extra.userColor || "#e74c3c";
        username.style.color = getTextColor(extra.userColor || "#e74c3c");
        username.innerText = user;

        const text = document.createElement("div");
        text.classList.add("chat-message");
        text.innerHTML = parseMessageWithEmotes(message);

        bubbleWrapper.appendChild(username);
        bubbleWrapper.appendChild(text);

        chat.appendChild(bubbleWrapper);

		if (isAtBottom) {
			chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
		}
    };

    ComfyJS.Init(channelName);
});

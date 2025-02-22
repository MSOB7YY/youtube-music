const { ipcMain } = require("electron");
const { Innertube } = require("youtubei.js");

module.exports = async (win, options) => {
	const yt = await Innertube.create();

	ipcMain.handle("audio-url", async (_, videoID) => {
		const info = await yt.getBasicInfo(videoID);
		const url = info.streaming_data?.formats[0].decipher(yt.session.player);

		return url;
	});
};

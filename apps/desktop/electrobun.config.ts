import type { ElectrobunConfig } from "electrobun";

export default {
	app: {
		name: "NoteWordy",
		identifier: "sh.blackboard.notewordy",
		version: "0.0.1",
	},
	build: {
		mainProcess: "cottontail",
		cottontail: {
			entrypoint: "src/main/index.ts",
		},
		copy: {
			"dist-web": "views/mainview",
		},
		mac: {
			bundleCEF: false,
		},
		linux: {
			bundleCEF: false,
			icon: "assets/logo.png",
		},
		win: {
			bundleCEF: false,
			icon: "assets/logo.png",
		},
	},
} satisfies ElectrobunConfig;

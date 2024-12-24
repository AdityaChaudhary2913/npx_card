#!/usr/bin/env node

"use strict";

const boxen = require("boxen");
const chalk = require("chalk");
const gradient = require("gradient-string");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const terminalLink = require("terminal-link");
const chalkAnimation = require("chalk-animation");
clear();

const prompt = inquirer.createPromptModule();

const questions = [
	{
		type: "list",
		name: "action",
		message: "What do you want to do?",
		choices: [
			{
				name: `Send me an ${chalk.green.bold("email")}?`,
				value: () => {
					open("mailto:adityachaudhary1306@gmail.com");
					console.log("\nDone, see you soon at inbox.\n");
				},
			},
			{
				name: `View my ${chalk.magentaBright.bold("Resume")} online?`,
				value: () => {
					open(
						"https://docs.google.com/document/d/e/2PACX-1vQG9F0Bz7Bzv1jpB7Tv2WJUuE7F_vZ6QUS5-xMeqB33-vcy9qH-KVFo3oz1waw9X4lc2AtliTSBScb0/pub"
					);
					console.log("\nResume opened in your browser.\n");
				},
			},
			{
				name: "Just quit.",
				value: () => {
					console.log("Hasta la vista.\n");
				},
			},
		],
	},
];

const data = {
	name: gradient.rainbow("             Aditya Chaudhary"),
	work: `${chalk.white("Student at")} ${chalk
		.hex("#2b82b2")
		.bold("LNMIIT, Jaipur")}`,
	github: terminalLink("GitHub", "https://www.github.com/AdityaChaudhary2913"),
	linkedin: terminalLink(
		"LinkedIn",
		"https://www.linkedin.com/in/adityachaudhary1306"
	),
	web: terminalLink("Web", "https://portfolio-aditya-chi.vercel.app/"),
	labelWork: chalk.white.bold("       Profession:"),
	labelCard: chalk.white.bold("       Card:"),
	npx: chalk.red("npx") + " " + chalk.white("aditya"),
};

const me = boxen(
	[
		`${data.name}`,
		``,
		`${data.labelWork}  ${data.work}`,
		``,
		`GitHub: ${data.github}`,
		`LinkedIn: ${data.linkedin}`,
		`Web: ${data.web}`,
		``,
		`${data.labelCard}  ${data.npx}`,
		``,
		`${chalk.italic("I am currently looking for new opportunities,")}`,
		`${chalk.italic("my inbox is always open. Whether you have a")}`,
		`${chalk.italic("question or just want to say hi, I will try ")}`,
		`${chalk.italic("my best to get back to you!")}`,
	].join("\n"),
	{
		margin: 1,
		float: "center",
		padding: 1,
		borderStyle: "round",
		borderColor: "green",
	}
);

const rainbow = chalkAnimation.rainbow('Loading... Press "CTRL+C" to stop.\n'); // Animation starts
setTimeout(() => {
	rainbow.stop(); // Stop the animation
	console.log(me);
	const tip = [
		`Tip: Try ${chalk.cyanBright.bold("cmd/ctrl + click")} on the links above`,
		"",
	].join("\n");
	console.log(tip);

	prompt(questions).then((answer) => answer.action());
}, 2000);

#!/usr/bin/env node

'use strict'

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require('fs');
const request = require('request');
const path = require('path');
const ora = require('ora');
const cliSpinners = require('cli-spinners');
clear();

const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: "list",
        name: "action",
        message: "What you want to do?",
        choices: [
            {
                name: `Send me an ${chalk.green.bold("email")}?`,
                value: () => {
                    open("mailto:adityachaudhary1306@gmail.com");
                    console.log("\nDone, see you soon at inbox.\n");
                }
            },
            {
                name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
                value: () => {
                    // cliSpinners.dots;
                    const loader = ora({
                        text: ' Downloading Resume',
                        spinner: cliSpinners.material,
                    }).start();
                    let pipe = request(
											"https://docs.google.com/document/d/1EF3p-zqUvzNIXaMBhsIUsFO7usqkst5z8dRGAoWAv1Q/edit?tab=t.0"
										).pipe(fs.createWriteStream("./AdityaChaudhary_CV.pdf"));
                    pipe.on("finish", function () {
                        let downloadPath = path.join(
													process.cwd(),
													"AdityaChaudhary_CV.pdf"
												);
                        console.log(`\nResume Downloaded at ${downloadPath} \n`);
                        open(downloadPath)
                        loader.stop();
                    });
                }
            },
            // {
            //     name: `Schedule a ${chalk.redBright.bold("Meeting")}?`,
            //     value: () => {
            //         open('https://calendly.com/anmol098/30min');
            //         console.log("\n See you at the meeting \n");
            //     }
            // },
            {
                name: "Just quit.",
                value: () => {
                    console.log("Hasta la vista.\n");
                }
            }
        ]
    }
];

const data = {
	name: chalk.bold.green("             Aditya Chaudhary"),
	handle: chalk.white("@AdityaChaudhary2913"),
	work: `${chalk.white("Lead Software Engineer at")} ${chalk
		.hex("#2b82b2")
		.bold("FootLoose Labs")}`,
	twitter: chalk.gray("https://twitter.com/") + chalk.cyan("13Aditya06"),
	github:
		chalk.gray("https://github.com/") + chalk.green("AdityaChaudhary2913"),
	linkedin:
		chalk.gray("https://linkedin.com/in/") + chalk.blue("adityachaudhary1306"),
	web: chalk.cyan("https://portfolio-aditya-chi.vercel.app/"),
	npx: chalk.red("npx") + " " + chalk.white("aditya"),

	labelWork: chalk.white.bold("       Work:"),
	labelTwitter: chalk.white.bold("    Twitter:"),
	labelGitHub: chalk.white.bold("     GitHub:"),
	labelLinkedIn: chalk.white.bold("   LinkedIn:"),
	labelWeb: chalk.white.bold("        Web:"),
	labelCard: chalk.white.bold("       Card:"),
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelWork}  ${data.work}`,
        ``,
        `${data.labelTwitter}  ${data.twitter}`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        `${data.labelWeb}  ${data.web}`,
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        `${chalk.italic(
            "I am currently looking for new opportunities,"
        )}`,
        `${chalk.italic("my inbox is always open. Whether you have a")}`,
        `${chalk.italic(
            "question or just want to say hi, I will try "
        )}`,
        `${chalk.italic(
            "my best to get back to you!"
        )}`
    ].join("\n"),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: "single",
        borderColor: "green"
    }
);

console.log(me);
const tip = [
    `Tip: Try ${chalk.cyanBright.bold(
        "cmd/ctrl + click"
    )} on the links above`,
    '',
].join("\n");
console.log(tip);

prompt(questions).then(answer => answer.action());

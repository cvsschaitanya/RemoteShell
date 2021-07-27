const firebase = require("./fire");
const { getChildrenOfPID, onNoChildren } = require("./process");

const { spawn } = require("child_process");
const sh = spawn("bash", []);
sh.issueCommand = (command) => {
	sh.stdin.write(`${command}\n`);
};

sh.stdout.on("data", (data) => {
	process.stdout.write(data.toString());
});

sh.stderr.on("data", (data) => {
	process.stdout.write(data.toString());
});

sh.on("close", (code) => {
	console.log(`child process exited with code ${code}`);
});

debugger;
const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const prompt = (p) => {
	rl.question(p, function (comm) {
		sh.issueCommand(comm);
		setTimeout(() => {
			onNoChildren(sh.pid, () => {
				prompt("$ ");
			});
		}, 500);
	});
};

rl.on("close", function () {
	console.log("\nBYE BYE !!!");
	process.exit(0);
});

prompt("$ ");

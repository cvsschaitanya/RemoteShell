const path = require("path");
const fs = require("fs");

function getChildrenOfPID(pid) {
	let children = [];
	const dir = path.join("/proc", `${pid}`, "task");
	for (let item of fs.readdirSync(dir)) {
		if (!fs.lstatSync(path.join(dir, item)).isFile()) {
			if (fs.existsSync(path.join(dir, item, "children"))) {
				const contents = fs
					.readFileSync(path.join(dir, item, "children"))
					.toString();
				if (contents === "") return [];
				else
					children = children.concat(
						contents.split("\n").map((child) => parseInt(child))
					);
			}
		}
	}
	return children;
}

const ps = require("ps-node");

function onNoChildren(pid, callback) {
	const childrenFile = path.join(
		"/proc",
		`${pid}`,
		"task",
		`${pid}`,
		"children"
	);
	if (!fs.readFileSync(childrenFile).toString() === "")
		fs.watchFile(childrenFile, (curr, prev) => {
			if (!fs.readFileSync(childrenFile).toString() === "") {
				fs.unwatchFile(childrenFile);
				callback();
			}
		});
	else callback();
}

fs.watchFile(path.join(__dirname, "temp"), (curr, prev) => {
	console.log(curr);
	console.log(prev);
});

module.exports = {
	getChildrenOfPID,
	onNoChildren,
};

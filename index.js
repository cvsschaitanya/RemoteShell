const net = require("net");

const socket = net.connect(15000, "localhost");

socket.on("data", (data) => {
	console.log(data.toString());
});

socket.write("pwd");
socket.write("ls");

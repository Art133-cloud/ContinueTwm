const http = require("http");
const Success = require("./libs/Success");
const Failure = require("./libs/Failure");
const app = require("./app");

const server = http.createServer(app);
const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";
const protocol = process.env.PROTOCOL || "http";
const url = process.env.URL || `${protocol}://${host}:${port}`;

server.connect = ({ port, host, protocol, url }) => {
    return new Promise((resolve, reject) => {
        server.listen(port, host, () => {
            resolve(new Success({
                message: "Server connection succeeded",
                data: { port, host, protocol, url }
            }));
        }).on("error", (error) => {
            reject(new Failure({
                message: "Server connection failed",
                error
            }));
        });
    });
};


server.connect({ port, host, protocol, url })
    .then(success => console.log(success))
    .catch(failure => console.error(failure));
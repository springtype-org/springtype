import {getDestFilePath} from "../getDestFilePath";

const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const fs = require('fs');
const socketIo = require('socket.io');
const compression = require('compression');

export const serveLive = async(entryHTMLFilePath: string, port: number): Promise<any> => {

    app.get([/\/$/, /.*\.html$/], function (req, res) {
        fs.readFile(getDestFilePath(entryHTMLFilePath), (err, sourceCode: string) => {
            res.send(`

                ${sourceCode}

                <!-- === START OF Live-reload code, dynamically injected by st-bundle === -->
                <!-- === This code won't be included in any static build! === -->
                <script src="/socket.io/socket.io.js"></script>
                <script>
                    var socket = io.connect('http://localhost:${port}');
                    
                    var reportError = function(error) {
                        
                        if (!error.name) error.name = 'ERROR';
                       
                        var report = '<h1><pre>' + error.name + ': Transpilation failed:</pre></h1><hr />'
                                                + '<pre><code>' + error.plainFrame.replace(/\\n/g, '<br />') + '</code></pre><br /><br />'
                                                + '<hr /><strong><pre>In file: ' + error.loc.relativeFile + ':' + error.loc.line + ':' + error.loc.column + '</pre></strong>';

                        document.body.innerHTML = report;
                    };
                    
                    socket.on("bundle-finished", function(event) {
                        console.log('bundle-all-end', event);
                        window.location.reload();
                    });
                    
                    socket.on("bundle-error", function(event) {
                        console.log('bundle-error', event);
                        reportError(event.error);
                    });
                    
                </script>
                <!-- === END OF Live-reload code, dynamically injected by st-bundle === -->
            `);
        });
    });

    app.use(compression({ threshold: 0 }));
    app.use(express.static(path.resolve(getDestFilePath(path.dirname(entryHTMLFilePath)))));

    const server = http.createServer(app);
    const io = socketIo(server);

    server.listen(port);

    return io;
};
var ZooKeeper = require("zookeeper");
var zk = new ZooKeeper({
    connect: "localhost:2181",
    timeout: 200000,
    debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARNING,
    host_order_deterministic: false
});
zk.connect(function(err) {
    if (err) throw err;
    console.log("zk session established, id=%s", zk.client_id);
    zk.a_create("/clustertest/server", "some value", ZooKeeper.ZOO_SEQUENCE | ZooKeeper.ZOO_EPHEMERAL, function(rc, error, path) {
        if (rc != 0) {
            console.log("zk node create result: %d, error: '%s', path=%s", rc, error, path);
        } else {
            console.log("created zk node %s", path);
            process.nextTick(function() {
                //zk.close ();
            });
        }
    });
});


var http = require('http');
http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Hello World\n');
}).listen(1334, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
const express = require('express');
const cassandra = require('cassandra-driver');
require('dotenv').config();

const NODE_IP = process.env.NODE_IP;
const DATA_CENTER = process.env.DATA_CENTER;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const ITEMS_KEYSPACE = process.env.ITEMS_KEYSPACE;

const cluster = new cassandra.Client({
    contactPoints: ["node-0.aws_eu_west_3.38298a3d6df3020d407f.clusters.scylla.cloud"],
    localDataCenter: 'AWS_EU_WEST_3',
    credentials: {username: "scylla", password: "X89lreIp1isjLDG"},
	keyspace: "todos",
});

/* const cluster = new cassandra.Client({
    contactPoints: [NODE_IP],
    localDataCenter: DATA_CENTER,
    credentials: {username: USERNAME, password: PASSWORD},
	keyspace: ITEMS_KEYSPACE,
}); */

const router = express.Router();

// hard coded dummy datas
/* const items = [
	{
		"id": "1",
		"name": "Cedric",
		"completed": "false"
	},
	{
		"id": "2",
		"name": "MacKenzie",
		"completed": "false"
	},
	{
		"id": "3",
		"name": "Fatima",
		"completed": "false"
	},
	{
		"id": "4",
		"name": "Alec",
		"completed": "true"
	}
];
 */


router.get('/', async (req, res)=>{
	const result = await cluster.execute('SELECT * FROM items');
	console.log(NODE_IP);
    res.json({ items : result.rows });
});

module.exports = router;

// docker run -it --rm --entrypoint cqlsh scylladb/scylla -u scylla -p X89lreIp1isjLDG node-0.aws_eu_west_3.38298a3d6df3020d407f.clusters.scylla.cloud
const express = require('express');
const cassandra = require('cassandra-driver');
require('dotenv').config();

const NODE_IP = process.env.NODE_IP;
const DATA_CENTER = process.env.DATA_CENTER;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const ITEMS_KEYSPACE = process.env.ITEMS_KEYSPACE;

const cluster = new cassandra.Client({
    contactPoints: ["node-0.aws_eu_west_3.38298a3d6df3020d407f.clusters.scylla.cloud", "node-1.aws_eu_west_3.38298a3d6df3020d407f.clusters.scylla.cloud", "node-2.aws_eu_west_3.38298a3d6df3020d407f.clusters.scylla.cloud"],
    localDataCenter: 'AWS_EU_WEST_3',
    credentials: {username: "scylla", password: "X89lreIp1isjLDG"},
	keyspace: "todos",
});

/* const cluster = new cassandra.Client({
    contactPoints: NODE_IP,
    localDataCenter: DATA_CENTER,
    credentials: {username: USERNAME, password: PASSWORD},
	keyspace: ITEMS_KEYSPACE,
}); */

const router = express.Router();

// hard coded dummy datas
/* const items = [
	{
		id: "1",
		name: "Jenette",
		completed: true
	},
	{
		id: "2",
		name: "Meredith",
		completed: true
	},
	{
		id: "3",
		name: "Basia",
		completed: false
	},
	{
		id: "4",
		name: "Amethyst",
		completed: false
	},
	{
		id: "5",
		name: "Clementine",
		completed: false
	},
	{
		id: "6",
		name: "Demetrius",
		completed: true
	},
	{
		id: "7",
		name: "Quamar",
		completed: true
	},
	{
		id: "8",
		name: "Preston",
		completed: true
	},
	{
		id: "9",
		name: "Sierra",
		completed: false
	},
	{
		id: "10",
		name: "Luke",
		completed: false
	}
]; */


// get all items
router.get('/', async (req, res)=>{
	const result = await cluster.execute('SELECT * FROM items');
	console.log('Get all items');
    res.json({ items : result.rows });
});

// create one item
router.post('/', async (req, res) => {
	const id = cassandra.types.Uuid.random();
	const {name} = req.body;
	const query = 'INSERT INTO items(id, name, completed) VALUES (?, ?, ?)';
	const result = await cluster.execute(query, [id, name, false]);
	res.status(200).send({ id, result });
});

// delete an item
router.delete('/:id', async (req, res) =>{
	const {id} = req.params;
	console.log(`delete ${id}`)
	const query = 'DELETE FROM items WHERE id=?';
	const result = await cluster.execute(query, [id]);
	res.status(200).send();
});

// update an item
router.put('/:id', async (req, res) =>{
	const { id } = req.params;
	console.log(`update ${id}`)
	const { completed } = req.body;
	const query = 'UPDATE items SET completed=? WHERE id=?';
	const result = await cluster.execute(query, [!completed, id]);
	res.status(200).send();
});









//dummy datas route
/* router.get('/dummy', async (req, res)=>{
	res.json({
		items,
	});

	console.log('Get dummy datas');
}); */

//test route
/* let test = [NODE_IP]
router.get('/test', async (req, res)=>{
	res.json({
		message: 'test here'
	});
	console.log(NODE_IP);
}); */

module.exports = router;

// docker run -it --rm --entrypoint cqlsh scylladb/scylla -u scylla -p X89lreIp1isjLDG node-0.aws_eu_west_3.38298a3d6df3020d407f.clusters.scylla.cloud
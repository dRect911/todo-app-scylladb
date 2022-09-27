const express = require('express');

const router = express.Router();

const items = [
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
	},
	{
		"name": "Thomas",
		"completed": "true"
	}
];

router.get('/', (req, res)=>{
    res.json({
        items,
    })
})

module.exports = router;
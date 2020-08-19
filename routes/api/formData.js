const express = require("express")
const router = express.Router()

router.get('/', (req,res) => res.send("form data route"))

router.post('/', (req,res) => { 
	res.json({"message":"posting data"}) 
	console.log("made a post req")
})

module.exports = router;
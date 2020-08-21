const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
const nodemailer = require("nodemailer");

router.get('/', (req,res) => res.send("form data route"))

router.post(
	'/', 
	[
		body('name', 'Please include a valid name')
			.not().isEmpty()
			.trim()
			.escape(),
		body('email', 'Please include a valid email')
			.isEmail()
			.normalizeEmail(),
		body('message', 'Please include a message')
			.not().isEmpty()
			.trim()
			.escape()
	],
	(req,res) => { 

		// Extract the validation errors from a request.
	    const errors = validationResult(req);

	    if (!errors.isEmpty()) {
	        // There are errors. Render form again with sanitized values/errors messages.
	        // Error messages can be returned in an array using `errors.array()`.
	        return res.status(400).json({ errors: errors.array() });
	    }

	    const { name, email, message } = req.body;

	    try {

	        // Data from form is valid.
	        // const data = req.body;

		        var transport = nodemailer.createTransport({
					host: "smtp.mailtrap.io",
					port: 2525,
					auth: {
					    user: "831341cc14cf45",
					    pass: "c3ccc0ccd0fe54"
					}
				});

		        var mailOptions = {
				    from: `${email}`,
				    to: 'codholic@umailz.com',
				    subject: `Hello from ${name}`,
				    text: `${message}`, 
				    // html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
				};

				transport.sendMail(mailOptions, (error, info) => {
				  if (error) {
				    return console.log(error);
				  }
				  console.log('Message sent: %s', info.messageId);
				});	       

			// res.send(req.body) 
			res.send(`Thanks for your message ${name}. Expect a reply soon`);
			console.log("made a post req")

	    } catch (err) {
	      console.error(err.message);
	      res.status(500).send('Server error');
    	}

})

module.exports = router;
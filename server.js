const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'daraj.marketing@gmail.com',
        pass: 'sryi sjdx uzpo rguv'
    }
});

app.post('/webhook-lead', (req, res) => {
    const lead = req.body;
    console.log("Lead جديد:", lead);

    const mailOptions = {
        from: 'daraj.marketing@gmail.com',
        to: 'info@dyrealestate.ae',
        subject: 'Lead جديد من Facebook',
        text: JSON.stringify(lead, null, 2)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.sendStatus(200);
});

app.listen(10000, () => console.log('✅ Server running on port 10000'));

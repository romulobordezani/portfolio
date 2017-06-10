#!/bin/env node

var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
app.use( bodyParser.json() );


var httpServer = http.Server( app );

app.post('/api/sendemail', function (req, res) {

    var transporter = nodemailer.createTransport( {
        service:  'Mailgun',
        auth: {
            user: 'postmaster@sandbox9d71bdc8ab7f446ba6952142af86409c.mailgun.org',
            pass: process.env.SMTP_TRANSPORT
        }
    });

    var mailOptions = {
        from: '"' + req.body.name + ' 👥" <' + req.body.email + '>',
        to: 'romulobordezani@gmail.com',
        subject: 'Contact from romulobordezani.com.br ✔',
        text: req.body.message + '\r\n\r\n\r\n' + req.body.phone + '\r\n\r\n\r\n' + req.body.address
    };

    transporter.sendMail( mailOptions, function( error, info ){

        if( error ){
            return console.log(error);
        }

        console.log('Message sent: ' + info.response );


    });

    res.send( 'Sent'  );

});

app.listen( 3333 );

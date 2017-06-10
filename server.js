#!/bin/env node

var express = require('express');
var nodeMailer = require('nodemailer');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
app.use( bodyParser.json() );

var pjson = require('./node_modules/nodemailer/package.json');
console.log( 'node mailer version: ', pjson.version);


var httpServer = http.Server( app );

app.post('/api/sendemail', function (req, res) {

    var transporter = nodeMailer.createTransport( process.env.SMTP_TRANSPORT.replace('\'', '') );

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

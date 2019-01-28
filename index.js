var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

const APP_TOKEN = 'EAAO9xR4dD5MBAC3JzfoNAtYvyBovmTZAhZAi71CNnVlLpoLekPggZCdgHZAqMbVXtQ92ngGfuitpzlv9VtWLhOPTaIuC8F0BK3AplTfJwv8PyBqF9YoAW0aXuYqZAMeTfZBtRwA5QMlNIPnBHxrjAeWr9QaOtUSPy9Vn6uAw8NsAZDZD';

var app = express();
app.use(bodyParser.json());


app.get('/setup',function(req,res){

    setupGetStartedButton(res);
});
function setupGetStartedButton(res){
    var messageData = {
            "get_started":[
            {
                "payload":"USER_DEFINED_PAYLOAD"
                }
            ]
    };

    // Start the request
    request({
        url: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+ PAGE_ACCESS_TOKEN,
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        form: messageData
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            res.send(body);

        } else {
            // TODO: Handle errors
            res.send(body);
        }
    });
}

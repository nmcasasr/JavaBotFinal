var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

const APP_TOKEN = 'EAAO9xR4dD5MBAC3JzfoNAtYvyBovmTZAhZAi71CNnVlLpoLekPggZCdgHZAqMbVXtQ92ngGfuitpzlv9VtWLhOPTaIuC8F0BK3AplTfJwv8PyBqF9YoAW0aXuYqZAMeTfZBtRwA5QMlNIPnBHxrjAeWr9QaOtUSPy9Vn6uAw8NsAZDZD';

var app = express();
app.use(bodyParser.json());

app.listen(5000,function(){
  console.log("El servidor se encuentra en el 5000");
});

app.get('/',function(req,res){
  res.send('Hola');
});

app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] == 'test_token_java') {
        res.send(req.query['hub.challenge']);
        
    }
    else {
        res.send('Tu no deberias estar aqui');
    }
    
});


app.post('/webhook', function (req, res) {
    var data = req.body;
    
    if (data.object == 'page') {

        data.entry.forEach(function (pageEntry) {
            pageEntry.messaging.forEach(function (messagingEvent) {

               

                if (messagingEvent.message) {
                receiveMessage(messagingEvent);
                }
                else if (messagingEvent.postback) {
                    receivePostBack(messagingEvent);
                }
                
                
            });
        });
        res.sendStatus(200);
    }
});

function receiveMessage(event) {
    var senderId = event.sender.id;
    var messageText = event.message.text;
    evaluateMessage(senderId, messageText);
    //sendMessageButtonStart(senderId, messageText)
}
function receivePostBack(event) {
    var senderId = event.sender.id;
    var messagePayload = event.postback.payload;
    evaluateMessage(senderId, messagePayload);

}
function setupGetStartedButton(res) {
    var messageData = {
        "get_started": [
            {
                "payload": "USER_DEFINED_PAYLOAD"
            }
        ]
    };
    console.log("Star button work");
    callSendAPI(messageData);
    // Start the request
  
}        
function firstMessage(recipientId, message) {

}
function evaluateMessage(recipientId, message) {
    var finalMessage = '';
    console.log("entro");
    //opcion uno 
    if (isContain(message, 'Informacion de productos')) {
        finalMessage = 'En esta sección conocerás todo acerca de los precios y variedad de los productos que puedes encontrar en Java’ Shoppu';
        sendMessageButtonInfo(recipientId,finalMessage);
    }
    else if (isContain(message, 'Informacion de pedido')) {
        finalMessage = 'A continuación te explicaré cómo realizar un pedido, confirmar un pago y realizar seguimiento a una compra ya realizada.';
        sendMessageButtonReq(recipientId, finalMessage);
    }
   
    else if (isContain(message, 'Preguntas frecuentes')) {
        finalMessage = 'En esta secciñón conocerás todo acerca de los precios y variedad de los productos que puedes encontrar en Java’ Shoppu';
        sendMessageButtonAsk(recipientId, finalMessage);
    }
    else if (isContain(message, 'coreanos')) {
        finalMessage = 'Estos son los últimos lanzamientos publicados en la sección tienda de Java’ Shoppu, en su buscador puedes encontrar tu artista o álbum favorito.Si no está lo que deseas no dudes en comentarme, pronto el #JavaTeam te estará dando respuesta.';
        sendMessageText(recipientId, finalMessage);
    }
    else if (isContain(message, 'japoneses')) {
        finalMessage = 'A continuación te explicaré cómo realizar un pedido, confirmar un pago y realizar seguimiento a una compra ya realizada.';
        sendMessageText(recipientId, finalMessage);
    }

    else if (isContain(message, 'otros')) {
        finalMessage = 'En esta secciñón conocerás todo acerca de los precios y variedad de los productos que puedes encontrar en Java’ Shoppu';
        sendMessageText(recipientId, finalMessage);
    }
    else if (isContain(message, 'proceso de compra')) {
        finalMessage = 'En esta sección conocerás todo acerca de los precios y variedad de los productos que puedes encontrar en Java’ Shoppu';
        sendMessageButtonInfo(recipientId, finalMessage);
    }
    else if (isContain(message, 'confirmar pago')) {
        finalMessage = 'A continuación te explicaré cómo realizar un pedido, confirmar un pago y realizar seguimiento a una compra ya realizada.';
        sendMessageButtonReq(recipientId, finalMessage);
    }
    else if (isContain(message, 'estado de un pedido')) {
        finalMessage = 'A continuación te explicaré cómo realizar un pedido, confirmar un pago y realizar seguimiento a una compra ya realizada.';
        sendMessageButtonReq(recipientId, finalMessage);
    }

    else if (isContain(message, '#ClienteJavaShoopu')) {
        finalMessage = 'En esta secciñón conocerás todo acerca de los precios y variedad de los productos que puedes encontrar en Java’ Shoppu';
        sendMessageButtonAsk(recipientId, finalMessage);
    }
    else if (isContain(message, '#JavaShoppuFamily')) {
        finalMessage = 'En esta sección conocerás todo acerca de los precios y variedad de los productos que puedes encontrar en Java’ Shoppu';
        sendMessageButtonInfo(recipientId, finalMessage);
    }
    else if (isContain(message, 'Japoneses')) {
        finalMessage = 'A continuación te explicaré cómo realizar un pedido, confirmar un pago y realizar seguimiento a una compra ya realizada.';
        sendMessageButtonReq(recipientId, finalMessage);
    }

    else if (isContain(message, 'Otros productos')) {
        finalMessage = 'En esta secciñón conocerás todo acerca de los precios y variedad de los productos que puedes encontrar en Java’ Shoppu';
        sendMessageButtonAsk(recipientId, finalMessage);
    }
    else {
        finalMessage = 'No funcionña';
        sendMessageButtonStart(recipientId, finalMessage);
    }

}

function sendMessageText(recipientId,message) {

    var messageData = {
        recipient : {
            id : recipientId

        },
        message: {
            text: message
        }
    };

    callSendAPI(messageData);
}
function sendMessageButtonInfo(recipientId, message) {

    var messageData = {
        recipient: {
            id: recipientId

        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: message,
                    buttons: [
                        {
                            type: "postback",
                            title: "Coreanos",
                            payload: "coreanos"
                        },
                        {
                            type: "postback",
                            title: "Japoneses",
                            payload: "japoneses"
                        },
                        {
                            type: "postback",
                            title: "Otros productos",
                            payload: "otros"
                        }

                    ]
                }
            }
        }
    };

    callSendAPI(messageData);
}
function sendMessageButtonReq(recipientId, message) {

    var messageData = {
        recipient: {
            id: recipientId

        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: message,
                    buttons: [
                        {
                            type: "postback",
                            title: "Proceso de compra",
                            payload: "buy"
                        },
                        {
                            type: "postback",
                            title: "Confirmar pago",
                            payload: "confirm pay"
                        },
                        {
                            type: "postback",
                            title: "Estado de un pedido",
                            payload: "otros"
                        }
                       

                    ]
                }
            }
        }
    };

    callSendAPI(messageData);
}
function sendMessageButtonAsk(recipientId, message) {

    var messageData = {
        recipient: {
            id: recipientId

        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text : message,
                    buttons: [
                        {
                            type: "postback",
                            title: "#ClienteJavaShoopu",
                            payload: "javaClient"
                        },
                        {
                            type: "postback",
                            title: "#JavaShoppuFamily",
                            payload: "javaFamily"
                        },
                        {
                            type: "postback",
                            title: "Hablar con el #JavaTeam",
                            payload: "javaTeam"
                        }

                    ]
                }
            } 
        }
    };

    callSendAPI(messageData);
}
function sendMessageButtonStart(recipientId, message) {
    console.log("xxxxxxxxxxxxx");
    var messageData = {
        recipient: {
            id: recipientId

        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "¡Hola! soy Javabot, el asistente virtual de Java’ Shoppu ¿en qué puedo asesorarte?",
                    buttons: [
                        {
                            type: "postback",
                            title: "Informacion de productos",
                            payload: "Informacion de productos"
                        },
                        {
                            type: "postback",
                            title: "Informacion de pedido",
                            payload: "Informacion de pedido"
                        },
                        {
                            type: "postback",
                            title: "Preguntas frecuentes",
                            payload: "Preguntas frecuentes"
                        }

                    ]
                }
            }
        }
    };

    callSendAPI(messageData);
}
function callSendAPI(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages?access_token=test_token_java',
        qs: { access_token : APP_TOKEN },
        method: 'POST',
        json: messageData
    }, function (error, response, data) {
        if (error) {
            console.log('No esta funcionando');
        } else {
            console.log('exito');
        }
    });
}
function isContain(sentence, word) {
    return sentence.indexOf(word) > -1;
}


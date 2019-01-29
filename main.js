var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

const APP_TOKEN = 'EAAO9xR4dD5MBAC3JzfoNAtYvyBovmTZAhZAi71CNnVlLpoLekPggZCdgHZAqMbVXtQ92ngGfuitpzlv9VtWLhOPTaIuC8F0BK3AplTfJwv8PyBqF9YoAW0aXuYqZAMeTfZBtRwA5QMlNIPnBHxrjAeWr9QaOtUSPy9Vn6uAw8NsAZDZD';

var app = express();
app.use(bodyParser.json());

app.listen(8080,function(){
  console.log("El servidor se encuentra en el 8080");
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
    console.log("Get started 1");
    setupGetStartedButton(res);
});

app.post('/webhook', function (req, res) {
    var data = req.body;

    if (data.object == 'page') {

        data.entry.forEach(function (pageEntry) {
            pageEntry.messaging.forEach(function (messagingEvent) {


               if (messagingEvent.postback) {
              receivePostBack(messagingEvent);
              }
                else if (messagingEvent.message) {
                receiveMessage(messagingEvent);
                }



            });
        });
        res.sendStatus(200);
    }
});

function receiveMessage(event) {
    var senderId = event.sender.id;
    var messageText = event.message.text;
    //evaluateMessage(senderId, messageText);
    sendMessageButtonStart(senderId, messageText)
}
function receivePostBack(event) {
    var senderId = event.sender.id;
    var messagePayload = event.postback.payload;
    evaluatePostBack(senderId, messagePayload);

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
    callSendAPIStart(messageData);
    // Start the request

}
function firstMessage(recipientId, message) {

}
function evaluateMessage(recipientId, message) {
    var finalMessage = '';
    /*
    console.log("entro");
    //opcion uno
    if (isContain(message, 'Informacion de productos')) {
        finalMessage = 'En esta secci�n conocer�s todo acerca de los precios y variedad de los productos que puedes encontrar en Java� Shoppu';
        sendMessageButtonInfo(recipientId,finalMessage);
    }
    else if (isContain(message, 'Informacion de pedido')) {
        finalMessage = 'A continuaci�n te explicar� c�mo realizar un pedido, confirmar un pago y realizar seguimiento a una compra ya realizada.';
        sendMessageButtonReq(recipientId, finalMessage);
    }
    else if (isContain(message, 'Preguntas frecuentes')) {
        finalMessage = 'En esta secci��n conocer�s todo acerca de los precios y variedad de los productos que puedes encontrar en Java� Shoppu';
        sendMessageButtonAsk(recipientId, finalMessage);
    }
    else if (isContain(message, 'coreanos')) {
        finalMessage = 'Estos son los �ltimos lanzamientos publicados en la secci�n tienda de Java� Shoppu, en su buscador puedes encontrar tu artista o �lbum favorito.Si no est� lo que deseas no dudes en comentarme, pronto el #JavaTeam te estar� dando respuesta.';
        sendMessageText(recipientId, finalMessage);
    }
    else if (isContain(message, 'japoneses')) {
        finalMessage = 'A continuaci�n te explicar� c�mo realizar un pedido, confirmar un pago y realizar seguimiento a una compra ya realizada.';
        sendMessageText(recipientId, finalMessage);
    }
    else if (isContain(message, 'otros')) {
        finalMessage = 'En esta secci��n conocer�s todo acerca de los precios y variedad de los productos que puedes encontrar en Java� Shoppu';
        sendMessageText(recipientId, finalMessage);
    }
    else if (isContain(message, 'proceso de compra')) {
        finalMessage = 'En esta secci�n conocer�s todo acerca de los precios y variedad de los productos que puedes encontrar en Java� Shoppu';
        sendMessageButtonInfo(recipientId, finalMessage);
    }
    else if (isContain(message, 'confirmar pago')) {
        finalMessage = 'A continuaci�n te explicar� c�mo realizar un pedido, confirmar un pago y realizar seguimiento a una compra ya realizada.';
        sendMessageButtonReq(recipientId, finalMessage);
    }
    else if (isContain(message, 'estado de un pedido')) {
        finalMessage = 'A continuaci�n te explicar� c�mo realizar un pedido, confirmar un pago y realizar seguimiento a una compra ya realizada.';
        sendMessageButtonReq(recipientId, finalMessage);
    }
    else if (isContain(message, '#ClienteJavaShoopu')) {
        finalMessage = 'En esta secci��n conocer�s todo acerca de los precios y variedad de los productos que puedes encontrar en Java� Shoppu';
        sendMessageButtonAsk(recipientId, finalMessage);
    }
    else if (isContain(message, '#JavaShoppuFamily')) {
        finalMessage = 'En esta secci�n conocer�s todo acerca de los precios y variedad de los productos que puedes encontrar en Java� Shoppu';
        sendMessageButtonInfo(recipientId, finalMessage);
    }
    else if (isContain(message, 'Japoneses')) {
        finalMessage = 'A continuaci�n te explicar� c�mo realizar un pedido, confirmar un pago y realizar seguimiento a una compra ya realizada.';
        sendMessageButtonReq(recipientId, finalMessage);
    }
    else if (isContain(message, 'Otros productos')) {
        finalMessage = 'En esta secci��n conocer�s todo acerca de los precios y variedad de los productos que puedes encontrar en Java� Shoppu';
        sendMessageButtonAsk(recipientId, finalMessage);
    }
    else {
        finalMessage = 'No funcion�a';
        sendMessageButtonStart(recipientId, finalMessage);
    }
*/
}
function evaluatePostBack(recipientId, message) {
    var finalMessage = '';
    console.log("entro");
    if (isContain(message, 'empezar')) {
        finalMessage = 'En esta sección conoceras todo acerca de los precios y variedad de los productos que puedes encontrar en Java’ Shoppu';
        sendMessageButtonStart(recipientId,finalMessage);
    }
    //opcion uno
    else if (isContain(message, 'informacion de productos')) {
        finalMessage = 'En esta sección conoceras todo acerca de los precios y variedad de los productos que puedes encontrar en Java’ Shoppu';
        sendMessageButtonInfo(recipientId,finalMessage);
    }
   // sub-opciones de opcion 1
    else if (isContain(message, 'coreanos')) {
        finalMessage = 'Estos son los últimos lanzamientos publicados en la sección tienda de Java’ Shoppu, en su buscador puedes encontrar tu artista o álbum favorito.Si no está lo que deseas no dudes en comentarme, pronto el #JavaTeam te estará dando respuesta.';
        sendMessageText(recipientId, finalMessage);
    }
    else if (isContain(message, 'japoneses')) {
        finalMessage = 'En Java’ Shoppu también puedes conseguir CD’s, DVD’s, photobooks y otros productos de tus artistas japoneses o extranjeros con lanzamientos en Japón. Recuerda que su tiempo de espera es mayor a los productos coreanos.\n\nCuénteme cuál artista y producto desea y le comunicaré al #JavaTeam para que dé pronta respuesta :D';
        sendMessageText(recipientId, finalMessage);
    }
    else if (isContain(message, 'otros productos')) {
        finalMessage = '¿Deseas algo más que productos oficiales? En Java’ Shoppu puedes conseguir maquillaje TONYMOLY y productos fanmade como afiches con la imagen que desees, set con postcards y stickers, pines metálicos, gorras, camisetas y mucho más.\n\nTambién contamos con productos de otros países como China, Taiwán y EEUU, sólo pregúntame y estaré comunicándole la info al #JavaTeam para su pronta respuesta.';
        sendMessageText(recipientId, finalMessage);
    }


    //opcion 2
    else if (isContain(message, 'informacion de pedido')) {
        finalMessage = 'A continuación te explicaré cómo realizar un pedido, confirmar un pago y realizar seguimiento a una compra ya realizada.';
        sendMessageButtonReq(recipientId, finalMessage);
    }
  // sub-opciones de opcion 2
      else if (isContain(message, 'procesoDeCompra')) {
        //finalMessage = 'El proceso de compra en Java’ Shoppu es muuuy sencillo, te lo explico en 5 pasos: \n1. Ya encontrados los productos que deseas y sus precios, debes realizar un abono inicial de mínimo el 60% correspondiente al total sin envío. \n 2. Una vez culminada la fecha de pedido, el tiempo de llegada a Colombia es de 5-10 días hábiles para productos coreanos. Productos japoneses y especiales tardan entre 20-25 días hábiles. \n 3. En Java’ Shoppu se cierran pedidos todos los 15 y 30 de cada mes. \n 4. Al llegar tus productos el #JavaTeam te lo comunicará vía Facebook, si existe un saldo pendiente se tendrán 10 días hábiles para su cancelación a partir del aviso. \n 5. El servicio de envío se cancela en contra-entrega al mensajero. En Medellín contamos con mensajero propio dentro del #JavaTeam :D \n ¿He sido claro? Aquí tengo otra información que puede serte útil:';
        finalMessage = 'Es muy largo javaaaaaaaa';
        sendMessageButtonReqSub(recipientId, finalMessage);
      }
          //sub-sub-opcion de proceso de compra
          else if (isContain(message, 'formas de pago')) {
              finalMessage = 'En Java’ Shoppu se manejan las siguientes formas de pago para toda Colombia:\n\nGratis por transferencia bancaria desde cualquier banco, recarga en Nequi y depósito en Corresponsal Bancario de Bancolombia.\n\nGiro con cobro por servicio vía Efecty..';
              sendMessageText(recipientId, finalMessage);
          }
          else if (isContain(message, 'confiabilidad')) {
              finalMessage = 'Java’ Shoppu es una tienda totalmente confiable ¡lleva en el mercado colombiano 7 años! entregándole a los seguidores de la música asiática los mejores productos oficiales y fanmade de sus artistas favoritos.\n\nEn nuestro Facebook e Instagram @JavaShoppu puedes encontrar fotos de los productos, calificaciones y comentarios de nuestros #ClienteJavaShoppu a lo largo de estos años.';
              sendMessageText(recipientId, finalMessage);
          }

      else if (isContain(message, 'confirmar pago')) {
        finalMessage = '¡Muchas gracias por confiar en Java’ Shoppu! Por favor no olvides adjuntar una foto del comprobante de pago y los siguientes datos: nombres, celular, ciudad, dirección detallada y número de documento. Pronto el #JavaTeam estará enviando su orden de compra.';
        sendMessageText(recipientId, finalMessage);
      }
      else if (isContain(message, 'estado de un pedido')) {
        finalMessage = '¡Sé que deseas tu pedido ya en tus manos! Vi trabajar arduamente al #JavaTeam para que muy pronto lo tengas en ellas para su disfrute ^^ por favor escríbeme el número de orden para que el #JavaTeam se comunique con nuevas noticias.';
        sendMessageText(recipientId, finalMessage);
      }

//opcion 3
    else if (isContain(message, 'preguntas frecuentes')) {
        finalMessage = 'Por si te queda alguna dudita adicional jeje, aquítle presentamos nuestro programa de fidelización y otras cositas';
        sendMessageButtonAsk(recipientId, finalMessage);
    }
//sub-opcion de opciones 3
    else if (isContain(message, '#ClienteJavaShoopu')) {
        finalMessage = 'Java’ Shoppu posee un programa que premia a sus clientes fieles. Es muy fácil pertenecer a este, sólo con realizar una compra de un producto oficial te conviertes automáticamente en #ClienteJavaShoppu. Los beneficios son:\n\n 1. Descuento del 5% en todas sus compras.\n\n 2. Descuento del 10% durante el mes de su cumpleaños.\n\n3. Descuento del 10% en productos de la sección #HoyHace1Año.\n\n 4. Participación exclusiva en rifas y concursos.\n\n 5. Futuras promociones que se comunicarán.';
        sendMessageText(recipientId, finalMessage);
    }
    else if (isContain(message, '#JavaShoppuFamily')) {
        finalMessage = '#JavaShoppuFamily es toda la Comunidad creada alrededor de Java’ Shoppu, en donde se comparte información de primera como nuevos lanzamientos, promociones y futuros concursos. Es gratis pertenecer a ella, sólo debes inscribirte en nuestra base de datos para recibir información ^^';
        sendMessageLink(recipientId, finalMessage);
    }
    else if (isContain(message, 'hablar con el #JavaTeam')) {
        finalMessage = 'Espero haberte podido ayudar en aclarar sus dudas, en un momento el #JavaTeam estará comunicándose.\n\nSe despide tu amigo Javabot ¡seguro estaremos en contacto de nuevo';
        sendMessageText(recipientId, finalMessage);
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
function sendMessageLink(recipientId,message) {

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
                         type: "web_url",
                          url: "https://www.facebook.com/pg/JavaShoppu/shop/?rid=404621399554702&rt=39",
                          title: "Inscribirse",
                       }

                   ]
               }
           }
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
                            payload: "otros productos"
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
                            payload: "procesoDeCompra"
                        },
                        {
                            type: "postback",
                            title: "Confirmar pago",
                            payload: "confirmar pago"
                        },
                        {
                            type: "postback",
                            title: "Estado de un pedido",
                            payload: "estado de un pedido"
                        }


                    ]
                }
            }
        }
    };

    callSendAPI(messageData);
}
function sendMessageButtonReqSub(recipientId, message) {

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
                            title: "Formas de pago",
                            payload: "formas de pago"
                        },
                        {
                          type: "web_url",
                           url: "https://www.facebook.com/pg/JavaShoppu/shop/?rid=404621399554702&rt=39",
                           title: "ver productos",
                        },
                        {
                            type: "postback",
                            title: "Confiabilidad",
                            payload: "confiabilidad"
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
                            payload: "#ClienteJavaShoopu"
                        },
                        {
                            type: "postback",
                            title: "#JavaShoppuFamily",
                            payload: "#JavaShoppuFamily"
                        },
                        {
                            type: "postback",
                            title: "Hablar con el #JavaTeam",
                            payload: "hablar con el #JavaTeam"
                        }

                    ]
                }
            }
        }
    };

    callSendAPI(messageData);
}
function sendMessageButtonStart(recipientId, message) {

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
                            payload: "informacion de productos"
                        },
                        {
                            type: "postback",
                            title: "Informacion de pedido",
                            payload: "informacion de pedido"
                        },
                        {
                            type: "postback",
                            title: "Preguntas frecuentes",
                            payload: "preguntas frecuentes"
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
function setupGetStartedButton(res){
     var messageData = {

get_started:{
payload:"empezar"
}

     };

     // Start the request
     console.log("empezar");
     request({
         uri: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token=test_token_java',
         qs: { access_token : APP_TOKEN },
         method: 'POST',
         json: messageData
     },
     function (error, response, data) {
         if (error) {
             console.log('No esta funcionando');
         } else {
             console.log('exito get started');
         }
     });
 }
function isContain(sentence, word) {
    return sentence.indexOf(word) > -1;
}

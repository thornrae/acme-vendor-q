'use strict';

const io = require('socket.io-client');

const host = 'http://localhost:3000';

io.connect(host);

const capsConnection = io.connect(`${host}/caps`)

const faker = require('faker');
require('dotenv').config();

let storeName = process.env.STORE_NAME;

//emit get all --> in caps will do the broadcast + call that function which will be in the class queue. 

setInterval( () => {
  let address = (faker.fake("{{address.streetAddress}} {{address.city}}, {{address.state}}  {{address.zipCode}}"));
  let customerName = (faker.fake("{{name.lastName}}, {{name.firstName}}"));
  let orderId = faker.datatype.number();

  let payload = {
    storeName: storeName,
    address: address, 
    customerName: customerName,
    orderId: orderId,
  }
  console.log(payload);

  capsConnection.emit('pickup', payload);
}, 5000);

capsConnection.on('delivered', thankYou);


function thankYou(payload) {
  console.log('thank you payload..', payload)
  console.log(`VENDOR: thank you for ${payload.storeName} delivery of order #: ${payload.orderId}`);

  capsConnection.emit('received', payload)

}

//when to emit received
//


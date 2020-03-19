import mongoose from 'mongoose';
import {
    paymentSchema
} from '../models/paymentModel'
import { v1 as uuidv1 } from 'uuid';
const axios = require('axios');

const Payment = mongoose.model('Payment', paymentSchema);

export const addNewPayment = (req, res) => {
    let newPayment = new Payment(req.body);

    newPayment.save((err, Payment) => {
        if (err) {
            res.send(err);
        }
        res.json(Payment);
    })

    var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient(),
    producer = new Producer(client),
    payloads = [
        { topic: 'topic1', 
        messages: [
`{
entity: Payment,
id: ${newPayment._id}, 
correlationId: ${uuidv1()},
before: null,
after: 
${newPayment}
 }` 
],
        partition: 0 }
    ];
    producer.on('ready', function () {
        producer.send(payloads, function (err, data) {
            console.log(data);
        });
    });
    producer.on('error', function (err) {})


};

export const getPayment = (req, res) => {

    Payment.find({}, (err, Payment) => {
        if (err) {
            res.send(err);
        }
        res.json(Payment);
    })
}

export const getPaymentWithId = (req, res) => {

    Payment.findById(req.params.PaymentId, (err, Payment) => {
        if (err) {
            res.send(err);
        }
        res.json(Payment);
    })
}

export const updatePayment = (req, res) => {
    var beforePayloadPayment
    axios.get('http://localhost:4000/payment/' + req.params.PaymentId)
  .then(function (response) {
    // handle success
    beforePayloadPayment = response
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed

    Payment.findOneAndUpdate({_id: req.params.PaymentId}, req.body, {new: true}, (err, Payment) => {
        if (err) {
            res.send(err);
        }
        res.json(Payment);
    var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient(),
    producer = new Producer(client),
    payloads = [
        { topic: 'topic1', 
        messages: [
`{
entity: Payment",
id: ${req.params.PaymentId}, 
correlationId: ${uuidv1()},
before: 
{ 
_id: ${beforePayloadPayment.data._id} 
termInterval: ${beforePayloadPayment.data.termInterval} 
amount: ${beforePayloadPayment.data.amount}
}
after: ${Payment}
}`  
],
        partition: 0 }
    ];
    producer.on('ready', function () {
        producer.send(payloads, function (err, data) {
            console.log(data);
        });
    });
    producer.on('error', function (err) {})
})
})
}

export const deletePayment = (req, res) => {
    var beforePayloadPayment
    axios.get('http://localhost:4000/payment/' + req.params.PaymentId)
  .then(function (response) {
    // handle success
    beforePayloadPayment = response
  })
  .catch(function (error) {
    // handle error
    beforePayloadVehicle = 
    console.log(error);
  })
  .finally(function () {
    // always executed
    if (beforePayloadPayment.data == null) {
        res.json({ message: 'Payment does not exist', Payment});
    
        var kafka = require('kafka-node'),
        Producer = kafka.Producer,
        client = new kafka.KafkaClient(),
        producer = new Producer(client),
        payloads = [
            { topic: 'topic1', 
            messages: [
`
{
entity: Payment
id: ${req.params.PaymentId}, 
correlationId: ${uuidv1()},
before: null,
after: null
}` 

        ],
            partition: 0 }
        ];
        producer.on('ready', function () {
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
        });
        producer.on('error', function (err) {})
    } else {

    Payment.deleteOne({_id: req.params.PaymentId}, (err, Payment) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted Payment', Payment});
    })

    var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient(),
    producer = new Producer(client),
    payloads = [
        { topic: 'topic1', 
        messages: [
`
{
entity: Payment,
id: ${req.params.PaymentId}, 
correlationId: ${uuidv1()},
before: { 
    _id: ${beforePayloadPayment.data._id} 
    termInterval: ${beforePayloadPayment.data.termInterval} 
    amount: ${beforePayloadPayment.data.amount}}
after: null
}` 
    ],
        partition: 0 }
    ];
    producer.on('ready', function () {
        producer.send(payloads, function (err, data) {
            console.log(data);
        });
    });
    producer.on('error', function (err) {})
}
  })
}
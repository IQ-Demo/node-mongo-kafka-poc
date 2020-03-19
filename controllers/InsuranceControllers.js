import mongoose from 'mongoose';
import {
    insuranceSchema
} from '../models/insuranceModel'
import { v1 as uuidv1 } from 'uuid';
const axios = require('axios');

const Insurance = mongoose.model('Insurance', insuranceSchema);

export const addNewInsurance = (req, res) => {
    let newInsurance = new Insurance(req.body);

    newInsurance.save((err, Insurance) => {
        if (err) {
            res.send(err);
        }
        res.json(Insurance);
    })

    var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient(),
    producer = new Producer(client),
    payloads = [
        { topic: 'topic1', 
        messages: [
`{
entity: InsuranceQuote,
id: ${newInsurance._id}, 
correlationId: ${uuidv1()},
before: null,
after: 
${newInsurance}
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

export const getInsurance = (req, res) => {

    Insurance.find({}, (err, Insurance) => {
        if (err) {
            res.send(err);
        }
        res.json(Insurance);
    })
}

export const getInsuranceWithId = (req, res) => {

    Insurance.findById(req.params.InsuranceId, (err, Insurance) => {
        if (err) {
            res.send(err);
        }
        res.json(Insurance);
    })
}

export const updateInsurance = (req, res) => {
    var beforePayloadInsurance
    axios.get('http://localhost:4000/insurance/' + req.params.InsuranceId)
  .then(function (response) {
    // handle success
    beforePayloadInsurance = response
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed


    Insurance.findOneAndUpdate({_id: req.params.InsuranceId}, req.body, {new: true}, (err, Insurance) => {
        if (err) {
            res.send(err);
        }
        res.json(Insurance);

    var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient(),
    producer = new Producer(client),
    payloads = [
        { topic: 'topic1', 
        messages: [
`{
entity: InsuranceQuote",
id: ${req.params.InsuranceId}, 
correlationId: ${uuidv1()},
before: 
{ 
_id: ${beforePayloadInsurance.data._id}, 
quote: ${beforePayloadInsurance.data.quote}, 
termLength: ${beforePayloadInsurance.data.termLength},
},
after: ${Insurance} 
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

export const deleteInsurance = (req, res) => {
    var beforePayloadInsurance
    axios.get('http://localhost:4000/insurance/' + req.params.InsuranceId)
  .then(function (response) {
    // handle success
    beforePayloadInsurance = response
  })
  .catch(function (error) {
    // handle error
    beforePayloadInsurance = null 
    console.log(error);
  })
  .finally(function () {
    // always executed
    if (beforePayloadInsurance.data == null) {
        res.json({ message: 'Insurance Quote does not exist', Insurance});
    
        var kafka = require('kafka-node'),
        Producer = kafka.Producer,
        client = new kafka.KafkaClient(),
        producer = new Producer(client),
        payloads = [
            { topic: 'topic1', 
            messages: [
`
{
entity: InsuranceQuote,
id: ${req.params.InsuranceId}, 
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

    Insurance.deleteOne({_id: req.params.InsuranceId}, (err, Insurance) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted Insurance', Insurance});
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
entity: InsuranceQuote,
id: ${req.params.InsuranceId}, 
correlationId: ${uuidv1()},
before: { 
    _id: ${beforePayloadInsurance.data._id} 
    quote: ${beforePayloadInsurance.data.quote} 
    termLength: ${beforePayloadInsurance.data.termLength}},
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
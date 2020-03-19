import mongoose from 'mongoose';
import { disclaimerSchema } from '../models/disclaimerModel'
import { v1 as uuidv1 } from 'uuid';
const axios = require('axios');

const Disclaimer = mongoose.model('Disclaimer', disclaimerSchema);

Disclaimer.watch().
on('change', data => {
    console.log(data);
});


// POST Disclaimer collection
export const addNewDisclaimer = (req, res) => {
    let newDisclaimer = new Disclaimer(req.body);

    newDisclaimer.save((err, Disclaimer) => {
        if (err) {
            res.send(err);
        }
        res.json(Disclaimer);
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
entity: Disclaimer,
id: ${newDisclaimer._id},
correlationId: ${uuidv1()},
before: null,
after: ${newDisclaimer}
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


// GET entire disclaimer collection
export const getDisclaimer = (req, res) => {

    Disclaimer.find({}, (err, Disclaimer) => {
        if (err) {
            res.send(err);
        }
        res.json(Disclaimer);
    })
}


// GET by ID
export const getDisclaimerWithId = (req, res) => {

    Disclaimer.findById(req.params.DisclaimerId, (err, Disclaimer) => {
        if (err) {
            res.send(err);
        }
        res.json(Disclaimer)
    })
}

// PUT by id
export const updateDisclaimer = (req, res) => {
    var beforePayload
    axios.get('http://localhost:4000/disclaimer/' + req.params.DisclaimerId)
  .then(function (response) {
    // handle success
    beforePayload=response
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed

    Disclaimer.findOneAndUpdate({_id: req.params.DisclaimerId}, req.body, {new: true}, (err, Disclaimer) => {
        if (err) {
            res.send(err);
        }
        res.json(Disclaimer);
        // console.log(beforePayload.data.title)
        // console.log(Disclaimer)

        var kafka = require('kafka-node'),
        Producer = kafka.Producer,
        client = new kafka.KafkaClient(),
        producer = new Producer(client),
        payloads = [
            { topic: 'topic1', 
            messages: [
`
{
entity: Disclaimer,
id: ${req.params.DisclaimerId}, 
correlationId: ${uuidv1()},
before: { 
_id: ${beforePayload.data._id} 
title: ${beforePayload.data.title} 
body: ${beforePayload.data.body}},
after: ${Disclaimer}
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
});
        
}

// DELETE by ID
export const deleteDisclaimer = (req, res) => {

    var beforePayload
    axios.get('http://localhost:4000/disclaimer/' + req.params.DisclaimerId)
  .then(function (response) {
    // handle success
    beforePayload=response
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed


    Disclaimer.findOneAndRemove({_id: req.params.DisclaimerId}, (err, Disclaimer) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted Disclaimer', Disclaimer});
    })

    var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient(),
    producer = new Producer(client),
    payloads = [
        { topic: 'topic1', 
        messages: [
`{
entity: Disclaimer",
id: ${req.params.DisclaimerId}, 
correlationId: ${uuidv1()},
before: { _id: ${beforePayload.data._id}, 
title: ${beforePayload.data.title},
body: ${beforePayload.data.body}},
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
});
}
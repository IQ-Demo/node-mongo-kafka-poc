import mongoose from 'mongoose';
import {
    leaseSchema
} from '../models/leaseModel'
import { v1 as uuidv1 } from 'uuid';
const axios = require('axios');

const Lease = mongoose.model('Lease', leaseSchema);

export const addNewLease = (req, res) => {
    let newLease = new Lease(req.body);

    newLease.save((err, Lease) => {
        if (err) {
            res.send(err);
        }
        res.json(Lease);
    })

    var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient(),
    producer = new Producer(client),
    payloads = [
        { topic: 'topic1', 
        messages: [
`{
entity: LeaseAgreement,
id: ${newLease._id}, 
correlationId: ${uuidv1()},
before: null,
after: 
${newLease}
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

export const getLease = (req, res) => {

    Lease.find({}, (err, Lease) => {
        if (err) {
            res.send(err);
        }
        res.json(Lease);
    })
}

export const getLeaseWithId = (req, res) => {

    Lease.findById(req.params.LeaseId, (err, Lease) => {
        if (err) {
            res.send(err);
        }
        res.json(Lease);
    })
}

export const updateLease = (req, res) => {
    var beforePayloadLease
    axios.get('http://localhost:4000/lease/' + req.params.LeaseId)
  .then(function (response) {
    // handle success
    beforePayloadLease = response
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed


    Lease.findOneAndUpdate({_id: req.params.LeaseId}, req.body, {new: true}, (err, Lease) => {
        if (err) {
            res.send(err);
        }
        res.json(Lease);

    var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient(),
    producer = new Producer(client),
    payloads = [
        { topic: 'topic1', 
        messages: [
`{
entity: LeaseAgreement,
id: ${req.params.LeaseId}, 
correlationId: ${uuidv1()},
before: 
{ 
_id: ${beforePayloadLease.data._id} 
term: ${beforePayloadLease.data.term} 
termLength: ${beforePayloadLease.data.termLength}
},
after: ${Lease} 
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

export const deleteLease = (req, res) => {
    var beforePayloadLease
    axios.get('http://localhost:4000/lease/' + req.params.LeaseId)
  .then(function (response) {
    // handle success
    beforePayloadLease = response
  })
  .catch(function (error) {
    // handle error
    beforePayloadLease = null 
    console.log(error);
  })
  .finally(function () {
    // always executed
    if (beforePayloadLease.data == null) {
        res.json({ message: 'Lease does not exist', Lease});
    
        var kafka = require('kafka-node'),
        Producer = kafka.Producer,
        client = new kafka.KafkaClient(),
        producer = new Producer(client),
        payloads = [
            { topic: 'topic1', 
            messages: [
`
{
entity: LeaseAgreement,
id: ${req.params.LeaseId}, 
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

    Lease.deleteOne({_id: req.params.LeaseId}, (err, Lease) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted Lease', Lease});
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
entity: LeaseAgreement,
id: ${req.params.LeaseId}, 
correlationId: ${uuidv1()},
before: { 
_id: ${beforePayloadLease.data._id} 
termInterval: ${beforePayloadLease.data.term} 
amount: ${beforePayloadLease.data.termLength}}
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
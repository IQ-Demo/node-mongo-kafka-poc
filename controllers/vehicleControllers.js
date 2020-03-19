import mongoose from 'mongoose';
import { vehicleSchema } from '../models/vehicleModel'
import { v1 as uuidv1 } from 'uuid';
const axios = require('axios');

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export const addNewVehicle = (req, res) => {
    let newVehicle = new Vehicle(req.body);

    newVehicle.save((err, Vehicle) => {
        if (err) {
            res.send(err);
        }
        res.json(Vehicle);
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
entity: Disclaimer",
id: ${newVehicle._id},
correlationId: ${uuidv1()},
"before: null",
after: ${newVehicle}
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

export const getVehicle = (req, res) => {

    Vehicle.find({}, (err, Vehicle) => {
        if (err) {
            res.send(err);
        }
        res.json(Vehicle);
    })
    console.log(uuidv1());
}

export const getVehicleWithId = (req, res) => {

    Vehicle.findById(req.params.VehicleId, (err, Vehicle) => {
        if (err) {
            res.send(err);
        }
        res.json(Vehicle);
    })
}

export const updateVehicle = (req, res) => {
    var beforePayloadVehicle
    axios.get('http://localhost:4000/vehicle/' + req.params.VehicleId)
  .then(function (response) {
    // handle success
    console.log(response)
    beforePayloadVehicle = response
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed

    Vehicle.findOneAndUpdate({_id: req.params.VehicleId}, req.body, {new: true}, (err, Vehicle) => {
        if (err) {
            res.send(err);
        }
        res.json(Vehicle);

    var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient(),
    producer = new Producer(client),
    payloads = [
        { topic: 'topic1', 
        messages: [
`
{
entity: Vehicle",id: ${req.params.VehicleId}, 
correlationId: ${uuidv1()},
before: { 
_id: ${beforePayloadVehicle.data._id}, 
name: ${beforePayloadVehicle.data.name}, 
make: ${beforePayloadVehicle.data.make},
model: ${beforePayloadVehicle.data.model},
trim: ${beforePayloadVehicle.data.trim},
year: ${beforePayloadVehicle.data.year},
bodyStyle: ${beforePayloadVehicle.data.bodyStyle},
oem: ${beforePayloadVehicle.data.oem},
},
after: ${Vehicle}
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
    });
}

export const deleteVehicle = (req, res) => {

    var beforePayloadVehicle
    axios.get('http://localhost:4000/vehicle/' + req.params.VehicleId)
  .then(function (response) {
    // handle success
    beforePayloadVehicle = response
  })
  .catch(function (error) {
    // handle error
    beforePayloadVehicle = 
    console.log(error);
  })
  .finally(function () {
    // always executed
    if (beforePayloadVehicle.data == null) {
        res.json({ message: 'Vehicle does not exist', Vehicle});

        var kafka = require('kafka-node'),
        Producer = kafka.Producer,
        client = new kafka.KafkaClient(),
        producer = new Producer(client),
        payloads = [
            { topic: 'topic1', 
            messages: ["entity: Vehicle",`id: ${req.params.VehicleId}`, 
            `correlationId: ${uuidv1()}`,
            "before: null",
            "after: null" ],
            partition: 0 }
        ];
        producer.on('ready', function () {
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
        });
        producer.on('error', function (err) {})
    } else {

    Vehicle.deleteOne({_id: req.params.VehicleId}, (err, Vehicle) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted Vehicle', Vehicle});
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
entity: Vehicle,
id: ${req.params.VehicleId}, 
correlationId: ${uuidv1()},
before: { 
_id: ${beforePayloadVehicle.data._id} 
name: ${beforePayloadVehicle.data.name} 
make: ${beforePayloadVehicle.data.make}
model: ${beforePayloadVehicle.data.model}
trim: ${beforePayloadVehicle.data.trim}
year: ${beforePayloadVehicle.data.year}
bodyStyle: ${beforePayloadVehicle.data.bodyStyle}
oem: ${beforePayloadVehicle.data.oem}
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
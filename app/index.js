var express = require('express');
var app = express();
var request = require('request');
const parseString = require('xml2js').parseString;

const vmixAPIPath = 'http://10.211.55.6:8088/api';

app.get('/', function (req, res) {
  res.send('Hello World')
})


app.get('/inputs', function (req, res) {
    request(vmixAPIPath, function (error, response, bodyXML) {

        parseString(bodyXML, {attributesKey: 'asdf'}, function (err, result) {
            res.json(
                result.vmix.inputs[0].input.map((input) => {
                    return input['$'];
                })
            );
        });
    });
});

app.get('/inputs/:inputId', function (req, res) {
    request(vmixAPIPath, function (error, response, bodyXML) {

        parseString(bodyXML, function (err, result) {
            res.json(
                result.vmix.inputs[0].input.find((input) => {
                    return input['$'].key === req.params.inputId;
                })['$']
            );
        });
    });
})
 
app.listen(3000)
var express = require('express');
var router = express.Router();
var axios = require('axios');
const qs = require("qs");

const data = {"attachments":[
  {
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.3",
  "body": [
      {
          "type": "TextBlock",
          "size": "Medium",
          "weight": "Bolder",
          "text": "Team Building",
          "horizontalAlignment": "Center",
          "wrap": true
      },
      {
          "type": "TextBlock",
          "text": "What color do you want? (expanded)",
          "wrap": true
      },
      {
          "type": "Input.ChoiceSet",
          "id": "SingleSelectVal",
          "style": "expanded",
          "choices": [
              {
                  "title": "Red",
                  "value": "1"
              },
              {
                  "title": "Green",
                  "value": "2"
              },
              {
                  "title": "Blue",
                  "value": "3"
              }
          ]
      },
      {
          "type": "TextBlock",
          "text": "What color do you want? (multiselect)",
          "wrap": true
      },
      {
          "type": "Input.ChoiceSet",
          "id": "MultiSelectVal",
          "isMultiSelect": true,
          "choices": [
              {
                  "title": "Red",
                  "value": "1"
              },
              {
                  "title": "Green",
                  "value": "2"
              },
              {
                  "title": "Blue",
                  "value": "3"
              }
          ]
      }
  ],
  "actions": [
      {
          "type": "Action.Submit",
          "title": "Submit",
          "data": {
              "id": "1234567890"
          }
      }
  ]
}
]}

router.post('/', function(req, res, next) {
  
  res.send({status: req.body.webhook});
  
  axios({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: req.body.webhook,
    data: data
  })
});

module.exports = router;

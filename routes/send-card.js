var express = require('express');
var router = express.Router();
var axios = require('axios');
const qs = require("qs");

const template_body = {
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
          "text": "Description here",
          "wrap": true
      },
  ],
  "actions": [
      {
          "type": "Action.Submit",
          "title": "Submit",
          "data": {
              
          }
      }
  ]
}

const template_expanded = [
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
]

const template_multiselect = [
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
]

router.post('/', function(req, res, next) {
  
  res.send({status: req.body.webhook});

  const config = global.config;

  const data = template_body;

  data.body[0].text = config.title;

  data.body[1].text = config.desc;

  const questionJson = config.questions.forEach(question => {
    let _question;
    if (question.multiselect) {
      _question = JSON.parse(JSON.stringify(template_multiselect));

    } else {
      _question = JSON.parse(JSON.stringify(template_expanded));
    }
      
    _question[0].text = question.question;
    
    _question[1].choices = question.options.map((option, index) => ({ title: option.title, value: index + 1 + "" }));

    data.body.push(..._question);
  })

  console.log(data)
  
  axios({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: req.body.webhook,
    data: JSON.stringify({
      attachments: [data]
    })
  })
});

module.exports = router;

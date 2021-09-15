// This is the data that should theoretically get returned from:
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-den/qa/questions?product_id=5
// In reality there are currently no results in the results array...
// My guess is that the results will get populated by us posting reviews for products
// This data is the example provided by Learn so we can work off it for now

/* export const listQuestions = {
  "product_id": "5",
  "results": [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": false,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
            // ...
          }
        }
      },
      {
        "question_id": 38,
        "question_body": "How long does it last?",
        "question_date": "2019-06-28T00:00:00.000Z",
        "asker_name": "funnygirl",
        "question_helpfulness": 2,
        "reported": false,
        "answers": {
          70: {
            "id": 70,
            "body": "Some of the seams started splitting the first time I wore it!",
            "date": "2019-11-28T00:00:00.000Z",
            "answerer_name": "sillyguy",
            "helpfulness": 6,
            "photos": [],
          },
          78: {
            "id": 78,
            "body": "9 lives",
            "date": "2019-11-12T00:00:00.000Z",
            "answerer_name": "iluvdogz",
            "helpfulness": 31,
            "photos": [],
          }
        }
      },
      // ...
  ]
} */

export const listQuestions = {
  "product_id": "5",
  "results": [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": false,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
            // ...
          }
        }
      },
      {
        "question_id": 38,
        "question_body": "How long does it last?",
        "question_date": "2019-06-28T00:00:00.000Z",
        "asker_name": "funnygirl",
        "question_helpfulness": 2,
        "reported": false,
        "answers": {
          70: {
            "id": 70,
            "body": "Some of the seams started splitting the first time I wore it!",
            "date": "2019-11-28T00:00:00.000Z",
            "answerer_name": "sillyguy",
            "helpfulness": 6,
            "photos": [],
          },
          71: {
            "id": 71,
            "body": "this is a newly added answer",
            "date": "2019-11-06T00:00:00.000Z",
            "answerer_name": "sillygal",
            "helpfulness": 9,
            "photos": [],
          },
          78: {
            "id": 78,
            "body": "9 lives",
            "date": "2019-11-12T00:00:00.000Z",
            "answerer_name": "iluvdogz",
            "helpfulness": 31,
            "photos": [{
              "id": 1,
              "url": "urlplaceholder/answer_5_photo_number_1.jpg"
            },
            {
              "id": 2,
              "url": "urlplaceholder/answer_5_photo_number_2.jpg"
            }
          ],
          }
        }
      },
      {
        "question_id": 39,
        "question_body": "Why do I buy this?",
        "question_date": "2020-06-28T00:00:00.000Z",
        "asker_name": "funnyboy",
        "question_helpfulness": 5,
        "reported": false,
        "answers": {
          66: {
            "id": 66,
            "body": "I don't know about it!",
            "date": "2020-01-28T00:00:00.000Z",
            "answerer_name": "aguy",
            "helpfulness": 6,
            "photos": [],
          },
          67: {
            "id": 67,
            "body": "because your wife told you to",
            "date": "2020-01-18T00:00:00.000Z",
            "answerer_name": "aguy",
            "helpfulness": 6,
            "photos": [],
          },
          79: {
            "id": 79,
            "body": "because you need to",
            "date": "2020-07-12T00:00:00.000Z",
            "answerer_name": "agirl",
            "helpfulness": 20,
            "photos": [{
              "id": 1,
              "url": "urlplaceholder/answer_5_photo_number_1.jpg"
            },
            {
              "id": 2,
              "url": "urlplaceholder/answer_5_photo_number_2.jpg"
            }
          ],
          }
        }
      },
      {
        "question_id": 40,
        "question_body": "Is this is a question?",
        "question_date": "2020-04-28T00:00:00.000Z",
        "asker_name": "funnyboy",
        "question_helpfulness": 5,
        "reported": false,
        "answers": {
          11: {
            "id": 11,
            "body": "no it is not a good question!",
            "date": "2020-03-28T00:00:00.000Z",
            "answerer_name": "aguy",
            "helpfulness": 1,
            "photos": [],
          },
          40: {
            "id": 40,
            "body": "you should ask yourself",
            "date": "2020-09-12T00:00:00.000Z",
            "answerer_name": "agirl",
            "helpfulness": 2,
            "photos": [{
              "id": 1,
              "url": "urlplaceholder/answer_5_photo_number_1.jpg"
            },
            {
              "id": 2,
              "url": "urlplaceholder/answer_5_photo_number_2.jpg"
            }
          ],
          }
        }
      },
      {
        "question_id": 41,
        "question_body": "why is this product not good?",
        "question_date": "2020-04-28T00:00:00.000Z",
        "asker_name": "funnyboy",
        "question_helpfulness": 12,
        "reported": false,
        "answers": {
          12: {
            "id": 12,
            "body": "because it is not a good product!",
            "date": "2020-03-28T00:00:00.000Z",
            "answerer_name": "a person",
            "helpfulness": 1,
            "photos": [],
          },
          41: {
            "id": 41,
            "body": "what do you mean",
            "date": "2020-09-12T00:00:00.000Z",
            "answerer_name": "a dog",
            "helpfulness": 2,
            "photos": [{
              "id": 1,
              "url": "urlplaceholder/answer_5_photo_number_1.jpg"
            },
            {
              "id": 2,
              "url": "urlplaceholder/answer_5_photo_number_2.jpg"
            }
          ],
          },
          13: {
            "id": 13,
            "body": "because it is so cheap, what do you expect!",
            "date": "2020-03-02T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 1,
            "photos": [],
          },
        }
      },
      // ...
  ]
}



// This is the data that should theoretically get returned from:
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-den/qa/questions/1/answers
// In reality there are currently no results in the results array...
// My guess is that the results will get populated by us posting reviews for products
// This data is the example provided by Learn so we can work off it for now

export const answersList = {
  "question": "1",
  "page": 0,
  "count": 5,
  "results": [
    {
      "answer_id": 8,
      "body": "What a great question!",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 8,
      "photos": [],
    },
    {
      "answer_id": 5,
      "body": "Something pretty durable but I can't be sure",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/answer_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/answer_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    // ...
  ]
}
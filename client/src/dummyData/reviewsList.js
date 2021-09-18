// This is the data that should theoretically get returned from:
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-den/reviews?product_id=5
// In reality there are currently no results in the results array...
// My guess is that the results will get populated by us posting reviews for products
// This data is the example provided by Learn so we can work off it for now

export const dummyReviewsDataEmpty = {
  "product": "2",
  "page": 0,
  "count": 5,
  results: [],
}

export const dummyReviewsData = {
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": false,
      "response": "Some sort of response",
      "body": "Sonic X-treme was a platform game developed by the Sega Technical Institute from 1990 until its cancellation in 1996. It was planned as the first fully 3D Sonic the Hedgehog game, taking Sonic into the 3D era of video games, and the first original Sonic game for the Sega Saturn. The storyline followed Sonic on his journey to stop Dr. Robotnik from stealing six magic rings from Tiara Boobowski and her father. X-treme was conceived as a side-scrolling platform game for the Sega Genesis to succeed Sonic & Knuckles (1994). Development shifted to the 32X and then the Saturn and Windows, and the game was redesigned as a 3D platform game for the 1996 holiday season. The plan was disrupted by company politics, an unfavorable visit by Sega of Japan executives, and obstacles using a game engine developed by Sonic Team for Nights into Dreams. Amid increasing pressure and declining morale, the lead designers became ill, prompting producer Mike Wallis to cancel the game. A film tie-in with Metro-Goldwyn-Mayer was also canceled. In place of X-treme, Sega released a port of the Genesis game Sonic 3D Blast, but did not release an original 3D Sonic platform game until Sonic Adventure for the Dreamcast in 1998. The cancellation is considered an important factor in the Saturn's commercial failure, as it left the system with no original Sonic platform game. Elements similar to those in X-treme appeared in later games, such as Sonic Lost World (2013).",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "https://images.unsplash.com/photo-1542574621-e088a4464f7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3028&q=80"
        },
        {
          "id": 2,
          "url": "https://images.unsplash.com/photo-1560294559-1774a164fb0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
        },
        // ...
      ]
    },
    {
      "review_id": 3,
      "rating": 4,
      "summary": "I am liking these glasses",
      "recommend": false,
      "response": "Glad you're enjoying the product!",
      "body": "They are very dark. But that's good because I'm in very sunny spots",
      "date": "2019-06-23T00:00:00.000Z",
      "reviewer_name": "bigbrotherbenjamin",
      "helpfulness": 3,
      "photos": [],
    },
    {
      "review_id": 6,
      "rating": 4,
      "summary": "I am another review",
      "recommend": true,
      "response": "This is yet another response!",
      "body": "Faded colors are so IN right now",
      "date": "2019-07-14T00:00:00.000Z",
      "reviewer_name": "littlebrotherjim",
      "helpfulness": 6,
      "photos": [{
        "id": 12,
        "url": "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      }],
    },
    {
      "review_id": 7,
      "rating": 4,
      "summary": "blahblahblah",
      "recommend": true,
      "response": "This is yet another response!",
      "body": "Faded colors are so IN right now",
      "date": "2019-07-14T00:00:00.000Z",
      "reviewer_name": "littlebrotherjim",
      "helpfulness": 6,
      "photos": [{
        "id": 12,
        "url": "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      }],
    },
    {
      "review_id": 8,
      "rating": 4,
      "summary": "ah booboo ah booboo",
      "recommend": true,
      "response": "Whelp!",
      "body": "Wow I'm tired",
      "date": "2019-07-19T00:00:00.000Z",
      "reviewer_name": "xXtechbroXx",
      "helpfulness": 10,
      "photos": [{
        "id": 12,
        "url": "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      }],
    },
  ]
}

export const dummyReviewsDataResolved = {
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I am resolved data",
      "recommend": false,
      "response": "Some sort of response",
      "body": "Sonic X-treme was a platform game developed by the Sega Technical Institute from 1990 until its cancellation in 1996. It was planned as the first fully 3D Sonic the Hedgehog game, taking Sonic into the 3D era of video games, and the first original Sonic game for the Sega Saturn. The storyline followed Sonic on his journey to stop Dr. Robotnik from stealing six magic rings from Tiara Boobowski and her father. X-treme was conceived as a side-scrolling platform game for the Sega Genesis to succeed Sonic & Knuckles (1994). Development shifted to the 32X and then the Saturn and Windows, and the game was redesigned as a 3D platform game for the 1996 holiday season. The plan was disrupted by company politics, an unfavorable visit by Sega of Japan executives, and obstacles using a game engine developed by Sonic Team for Nights into Dreams. Amid increasing pressure and declining morale, the lead designers became ill, prompting producer Mike Wallis to cancel the game. A film tie-in with Metro-Goldwyn-Mayer was also canceled. In place of X-treme, Sega released a port of the Genesis game Sonic 3D Blast, but did not release an original 3D Sonic platform game until Sonic Adventure for the Dreamcast in 1998. The cancellation is considered an important factor in the Saturn's commercial failure, as it left the system with no original Sonic platform game. Elements similar to those in X-treme appeared in later games, such as Sonic Lost World (2013).",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "https://images.unsplash.com/photo-1542574621-e088a4464f7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3028&q=80"
        },
        {
          "id": 2,
          "url": "https://images.unsplash.com/photo-1560294559-1774a164fb0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
        },
        // ...
      ]
    },
    {
      "review_id": 3,
      "rating": 4,
      "summary": "I am liking these glasses",
      "recommend": false,
      "response": "Glad you're enjoying the product!",
      "body": "They are very dark. But that's good because I'm in very sunny spots",
      "date": "2019-06-23T00:00:00.000Z",
      "reviewer_name": "bigbrotherbenjamin",
      "helpfulness": 3,
      "photos": [],
    },
    {
      "review_id": 6,
      "rating": 4,
      "summary": "I am another review",
      "recommend": true,
      "response": "This is yet another response!",
      "body": "Faded colors are so IN right now",
      "date": "2019-07-14T00:00:00.000Z",
      "reviewer_name": "littlebrotherjim",
      "helpfulness": 6,
      "photos": [{
        "id": 12,
        "url": "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      }],
    },
    {
      "review_id": 7,
      "rating": 4,
      "summary": "blahblahblah",
      "recommend": true,
      "response": "This is yet another response!",
      "body": "Faded colors are so IN right now",
      "date": "2019-07-14T00:00:00.000Z",
      "reviewer_name": "littlebrotherjim",
      "helpfulness": 6,
      "photos": [{
        "id": 12,
        "url": "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      }],
    },
    {
      "review_id": 8,
      "rating": 4,
      "summary": "ah booboo ah booboo",
      "recommend": true,
      "response": "Whelp!",
      "body": "Wow I'm tired",
      "date": "2019-07-19T00:00:00.000Z",
      "reviewer_name": "xXtechbroXx",
      "helpfulness": 10,
      "photos": [{
        "id": 12,
        "url": "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      }],
    },
  ]
}
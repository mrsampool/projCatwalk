// This is the data that should theoretically get returned from:
//https://app-hrsei-api.herokuapp.com/api/fec2/hr-den/reviews/meta?product_id=2
// See dummyReviewsData.js for more explanation

export const dummyReviewsMetadata = {
  "product_id": "2",
  "ratings": {
    2: 1,
    3: 1,
    4: 2,
    5: 1
  },
  "recommended": {
    0: 5
  },
  "characteristics": {
    "Size": {
      "id": 14,
      "value": "4.0000"
    },
    "Width": {
      "id": 15,
      "value": "3.5000"
    },
    "Comfort": {
      "id": 16,
      "value": "4.0000"
    }
  }
}

export const dummyReviewsMetadata2 = {
  "product_id": "2",
  "ratings": {
    2: 1,
    3: 1,
    4: 2,
  },
  "recommended": {
    0: 5
  },
  "characteristics": {
    "Size": {
      "id": 14,
      "value": "4.0000"
    },
    "Width": {
      "id": 15,
      "value": "3.5000"
    },
    "Quality": {
      "id":16,
      "value": "3.000"
    },
  }
}
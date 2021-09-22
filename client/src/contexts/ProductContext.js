import React from 'react';

export const ProductContext = React.createContext(init);

const init = {
  "currentProduct": {
    "id":null,
    "campus":null,
    "name":null,
    "slogan":null,
    "description":null,
    "category":null,
    "default_price":null,
    "created_at":null,
    "updated_at":null,
    "features": [
      null
      ]
  },
  "reviewsMetadata": {
    "product_id":null,
    "ratings":{},
    "recommended":{},
    "characteristics":{}
  }
};
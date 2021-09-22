export const emptyPhoto = {
  url: null,
  thumbnail_url: null
};
export const loadingPhotos = Array(5).fill(emptyPhoto);

export const emptyStyle = {
  "style_id": null,
  "name": null,
  "original_price": null,
  "sale_price":null,
  "default?": null,
  "photos":[
    Array(5).fill(emptyPhoto)
  ],
  "skus":{}
};
export const loadingStyles = Array(5).fill(emptyStyle);

export const emptyProductCard = {
  name: null,
  category: null,
  default_price: null,
}
export const loadingProductCards = Array(5).fill(emptyProductCard);

export const emptyProductCategory = {
  name: null,
  list: [{}]
};
export const loadingProductCategories = Array(5).fill(emptyProductCategory);
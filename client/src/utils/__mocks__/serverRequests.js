import { dummyReviewsDataResolved } from '../../dummyData/dummyReviewsData'

export const serverRequests = {
  getProductReviews: jest.fn()
    .mockResolvedValue( dummyReviewsDataResolved ),
  postReview: jest.fn()
    .mockResolvedValue( 'Status: 201 CREATED' ),
}
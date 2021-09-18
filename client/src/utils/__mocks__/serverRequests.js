import { dummyReviewsDataResolved } from '../../dummyData/reviewsList'

export const serverRequests = {
  getProductReviews: jest.fn()
    .mockResolvedValue( dummyReviewsDataResolved ),
  postReview: jest.fn()
    .mockResolvedValue( 'Status: 201 CREATED' ),
}
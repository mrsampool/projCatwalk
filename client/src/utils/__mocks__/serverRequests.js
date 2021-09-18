import { reviewsList } from '../../dummyData/reviewsList'

export const serverRequests = {
  getProductReviews: jest.fn()
    .mockResolvedValue( reviewsList ),
  postReview: jest.fn()
    .mockResolvedValue( 'Status: 201 CREATED' ),
}
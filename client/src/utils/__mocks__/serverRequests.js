import { reviewsList } from '../../dummyData/reviewsList'

export const serverRequests = {
  getProductReviews: jest.fn()
    .mockResolvedValue( reviewsList )
}
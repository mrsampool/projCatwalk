import { dummyReviewsDataResolved } from '../../dummyData/dummyReviewsData'
import { listQuestions } from '../../dummyData/answersList.js'
import {singleProductStyles} from "../../dummyData/productsList";

export const serverRequests = {
  getProductReviews: jest.fn().mockResolvedValue( dummyReviewsDataResolved ),
  getProductQuestions: jest.fn().mockResolvedValue( listQuestions ),
  postReview: jest.fn().mockResolvedValue( 'Status: 201 CREATED' ),
  putReviewHelpful: jest.fn().mockResolvedValue('Status: 204 NO CONTENT'),
  putReviewReport: jest.fn().mockResolvedValue('Status: 204 NO CONTENT'),
  getProductStyles: jest.fn().mockResolvedValue( singleProductStyles )
}
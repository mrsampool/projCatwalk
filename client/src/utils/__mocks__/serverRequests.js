import { dummyReviewsDataResolved } from '../../dummyData/dummyReviewsData'
<<<<<<< HEAD
import { listQuestions } from '../../dummyData/answersList.js'
=======
import {singleProductStyles} from "../../dummyData/productsList";
>>>>>>> 3d97ca39aa4dbe28d7b6554237b4a78a9c5d30f1

export const serverRequests = {
  getProductReviews: jest.fn().mockResolvedValue( dummyReviewsDataResolved ),
  getProductQuestions: jest.fn().mockResolvedValue( listQuestions ),
  postReview: jest.fn().mockResolvedValue( 'Status: 201 CREATED' ),
  putReviewHelpful: jest.fn().mockResolvedValue('Status: 204 NO CONTENT'),
  putReviewReport: jest.fn().mockResolvedValue('Status: 204 NO CONTENT'),
  getProductStyles: jest.fn().mockResolvedValue( singleProductStyles )
}
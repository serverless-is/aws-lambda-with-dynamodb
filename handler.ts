import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'AWS Lambda and AWS Dynamodb! Your function executed successfully!',
      input: event,
    }, null, 2),
  };
}

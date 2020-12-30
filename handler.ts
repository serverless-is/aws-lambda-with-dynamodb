import { APIGatewayEvent, APIGatewayProxyHandler, Context } from 'aws-lambda';
import 'source-map-support/register';

export const getToDoItem: APIGatewayProxyHandler = async (event: APIGatewayEvent,
  context: Context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'AWS Lambda and AWS Dynamodb! Your function executed successfully!',
      input: event,
    }, null, 2),
  };
}

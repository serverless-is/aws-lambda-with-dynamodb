import { APIGatewayEvent, APIGatewayProxyHandler, Context } from 'aws-lambda';
import 'source-map-support/register';
import { saveItemInDB, getItemFromDB } from "./dynamodb-actions";

export const getToDoItem: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context) => {
    const id: string = event.pathParameters.id;

    try {
      const toDoItem = await getItemFromDB(id);
  
      return buildResponse(toDoItem, 200);
    } catch (err) {
      console.log("Error: ", err);
      return buildResponse(err, 404);
    }
}

/** Save an item in the to-do list */
export const saveToDoItem: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context) => {

  console.log('event.body >>', event.body);
  const incoming: { item: string; complete: boolean } = JSON.parse(event.body);
  const { item, complete } = incoming;

  try {
    await saveItemInDB(item, complete);

    return buildResponse({ created: incoming }, 201);
  } catch (err) {
    console.log("Error: ", err);
    return buildResponse(err, 400);
  }
};

export const buildResponse = (fulfillmentText: any, statusCode: number): any => {
  return {
    statusCode,
    body: JSON.stringify(fulfillmentText),
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  };
};
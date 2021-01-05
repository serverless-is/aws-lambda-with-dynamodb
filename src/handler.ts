import { APIGatewayEvent, APIGatewayProxyHandler, Context } from 'aws-lambda';
import 'source-map-support/register';
import { createItemInDB, getItemFromDB, getAllItemsFromDB, deleteItemFromDB } from "./dynamodb-actions";

/** Save an item in the to-do list */
export const createToDoItem: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context) => {

  console.log('event.body >>', event.body);
  const incoming: { item: string; complete: boolean } = JSON.parse(event.body);
  const { item, complete } = incoming;

  try {
    await createItemInDB(item, complete);

    return buildResponse({ created: incoming }, 201);
  } catch (err) {
    console.log("Error: ", err);
    return buildResponse(err, 400);
  }
};

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

export const getAllToDoItems: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context) => {

    try {
      const toDoItems = await getAllItemsFromDB();
  
      return buildResponse(toDoItems, 200);
    } catch (err) {
      console.log("Error: ", err);
      return buildResponse(err, 404);
    }
}

export const deleteToDoItem: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context) => {
    const id: string = event.pathParameters.id;

    try {
      await deleteItemFromDB(id);
      return buildResponse({ deleted: id }, 200);
    } catch (err) {
      console.log("Error: ", err);
      return buildResponse(err, 404);
    }
}

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
import { APIGatewayEvent, APIGatewayProxyHandler, Context } from 'aws-lambda';
import 'source-map-support/register';
import { createItemInDB, getItemFromDB, getAllItemsFromDB, deleteItemFromDB, updateItemInDB } from "./dynamodb-actions";

/** Save an item in the to-do list */
export const createToDoItem: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context) => {

  console.log('event.body >>', event.body);
  const incoming: { todoItem: string; complete: boolean } = JSON.parse(event.body);
  const { todoItem, complete } = incoming;

  try {
    await createItemInDB(todoItem, complete);

    return buildResponse({ created: incoming }, 201);
  } catch (err) {
    console.log("Error: ", err);
    return buildResponse(err, 400);
  }
};

export const updateToDoItem: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context) => {

  const id: string = event.pathParameters.id;  
  console.log('updated id >>', id);
  console.log('updated event.body >>', event.body);
  const incoming: { todoItem: string; complete: boolean } = JSON.parse(event.body);
  const { todoItem, complete } = incoming;

  try {
    const result = await updateItemInDB(id, todoItem, complete);
    console.log('updated result >>', result);
    return buildResponse({ updated: incoming }, 201);
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
      const response = await getItemFromDB(id);
  
      return buildResponse(response, 200);
    } catch (err) {
      console.log("Error: ", err);
      return buildResponse(err, 404);
    }
}

export const getAllToDoItems: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context) => {

    try {
      const response = await getAllItemsFromDB();
  
      return buildResponse(response, 200);
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
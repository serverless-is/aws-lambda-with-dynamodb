import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

/** create a to-do item in the db table */
export function createItemInDB(todoItem: string, complete: boolean) {
  const timestamp = new Date().getTime();
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: uuid(),
      todoItem,
      complete,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  };

  return dynamoDB
    .put(params)
    .promise()
    .then(res => res)
    .catch(err => err);
}

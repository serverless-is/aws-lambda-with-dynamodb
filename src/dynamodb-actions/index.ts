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

/** update a to-do item in the db table */
export function updateItemInDB(id: string, todoItem: string, complete: boolean) {
  const timestamp = new Date().getTime();
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id },
    ExpressionAttributeValues: {
      ':todoItem': todoItem,
      ':complete': complete,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET todoItem = :todoItem, complete = :complete, updatedAt = :updatedAt',
  };
  console.log('updated params >>', params);
  return dynamoDB
    .update(params)
    .promise()
    .then(res => res)
    .catch(err => err);
} 

/** get a to-do item from the db table */
export function getItemFromDB(id: string) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {id}
  };

  return dynamoDB
    .get(params)
    .promise()
    .then(res => res.Item)
    .catch(err => err);
}

/** get all the to-do items from the db table */
export function getAllItemsFromDB() {
  const params = {
    TableName: process.env.TABLE_NAME
  };

  return dynamoDB
    .scan(params)
    .promise()
    .then(res => res)
    .catch(err => err);
}

/** delete a to-do item from the db table */
export function deleteItemFromDB(id: string) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id
    }
  };

  return dynamoDB
    .delete(params)
    .promise()
    .then(res => res)
    .catch(err => err);
}
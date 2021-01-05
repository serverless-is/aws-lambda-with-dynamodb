import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

/** create a to-do item in the db table */
export function createItemInDB(item: string, complete: boolean) {
  const timestamp = new Date().getTime();
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: uuid(),
      item,
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
/*export function updateItemInDB(item: string, complete: boolean) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: uuid(),
      item,
      complete
    }
  };

  return dynamoDB
    .put(params)
    .promise()
    .then(res => res)
    .catch(err => err);
} */

/** get a to-do item from the db table */
export function getItemFromDB(id: string) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id
    }
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
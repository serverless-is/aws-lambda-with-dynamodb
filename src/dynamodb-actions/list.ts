import * as AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

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

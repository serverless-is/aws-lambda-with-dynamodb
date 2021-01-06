import * as AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

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
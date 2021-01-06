import * as AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

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

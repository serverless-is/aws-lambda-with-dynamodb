import * as AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

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


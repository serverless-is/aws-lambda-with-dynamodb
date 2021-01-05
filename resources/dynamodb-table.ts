export const db_resources = { 
  Resources: {
    ToDoListTable: {
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        TableName: '${env:TABLE_NAME}',
        AttributeDefinitions: [
          {
            AttributeName: 'id',
            AttributeType: 'S'
          }
        ],
        KeySchema: [
          {
            AttributeName: 'id',
            KeyType: 'HASH'
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: '${env:READ_CAPACITY}',
          WriteCapacityUnits: '${env:WRITE_CAPACITY}'
        }
      }
    }
  }
}

export const db_resources = { 
  Resources: {
    ToDoListTable: {
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        TableName: 'to-do-list',
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
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1
        }
      }
    }
  }
}

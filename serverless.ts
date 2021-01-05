import type { AWS } from '@serverless/typescript';
// Load environment variables form `.env` 
const dotenvResult = require('dotenv').config();

if (dotenvResult.error) {
  console.warn('Lambda is configured by env variables. No .env configuration file was detected.');
}

const serverlessConfiguration: AWS = {
  service: 'aws-lambda-with-dynamodb',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'us-east-1',
    iamRoleStatements: [
      {
        'Effect': 'Allow',
        'Action': [
          'dynamodb:DescribeTable',
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem'
        ],
        'Resource': `arn:aws:dynamodb:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:table/${process.env.TABLE_NAME}`
      },
      {
        "Effect": "Allow",
        "Action": "dynamodb:ListTables",
        "Resource": "*",
        "Condition": {}
      }
    ],    
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    
  },
  functions: {
    saveToDoItem: {
      handler: 'src/handler.saveToDoItem',
      events: [
        {
          http: {
            method: 'post',
            path: 'to-do-item',
            cors: true
          }
        }
      ]
    },
    getToDoItem: {
      handler: 'src/handler.getToDoItem',
      events: [
        {
          http: {
            method: 'get',
            path: 'to-do-item/{id}',
          }
        }
      ]
    },
    deleteToDoItem: {
      handler: 'src/handler.deleteToDoItem',
      events: [
        {
          http: {
            method: 'delete',
            path: 'to-do-item/{id}',
          }
        }
      ]
    }
  },
  resources: {
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
}

module.exports = serverlessConfiguration;

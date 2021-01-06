import type { Serverless } from 'serverless/aws';
import { db_resources } from './resources/dynamodb-table';

const serverlessConfiguration: Serverless = {
  service: 'aws-lambda-with-dynamodb',
  frameworkVersion: '2',
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-offline', 'serverless-dotenv-plugin'],
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    dotenv: {
      required: {
        file: true
      }
    }
  },
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
        'Resource': 'arn:aws:dynamodb:${env:AWS_DB_REGION}:${env:AWS_ACCOUNT_ID}:table/${env:TABLE_NAME}'
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
    createToDoItem: {
      handler: 'src/handler.createToDoItem',
      events: [
        {
          http: {
            method: 'post',
            path: 'todos',
            cors: true
          }
        }
      ]
    },
    updateToDoItem: {
      handler: 'src/handler.updateToDoItem',
      events: [
        {
          http: {
            method: 'put',
            path: 'todos/{id}',
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
            path: 'todos/{id}',
          }
        }
      ]
    },
    getAllToDoItems: {
      handler: 'src/handler.getAllToDoItems',
      events: [
        {
          http: {
            method: 'get',
            path: 'todos',
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
            path: 'todos/{id}',
          }
        }
      ]
    }
  },
  resources: db_resources
}

module.exports = serverlessConfiguration;

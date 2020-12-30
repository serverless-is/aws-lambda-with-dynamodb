# aws-lambda-with-dynamodb

This project demonstrates how to make crud operations using AWS Lambda, AWS Dynamodb, AWS API Gateway via simple REST API with Node.js v12 and Typescript v4 using the Serverless Framework [Serverless Framework v2](https://www.serverless.com/). It includes the following files and folders.

- handler - Code for the application's Lambda function.
- serverless.yml - A template that defines the application's AWS Lambda resources
- package.json - Dev Dependencies and plugin `serverless-plugin-typescript`

**Table of contents:**

1. [Prerequisites and Installation](#prerequisites-and-installation)
2. [Dependencies and Libraries](#dependencies-and-libraries)
3. [Quick Start](#quick-start)
4. [Create AWS Lambda Function using Serverless Framework](#create-aws-lambda-function-using-serverless-framework)
5. [Status and Issues](#status-and-issues)

## Prerequisites and Installation

1. Create a free-tier account in [AWS](www.aws.amazon.com).

2. Create an `IAM` user  with [AdministratorAccess](https://console.aws.amazon.com/iam/home?region=us-east-1#/policies/arn:aws:iam::aws:policy/AdministratorAccess$jsonEditor) policy and [AmazonS3FullAccess](https://console.aws.amazon.com/iam/home?region=us-east-1#/policies/arn:aws:iam::aws:policy/AmazonS3FullAccess$jsonEditor) policy. It is highly recommended not to use `Root` account.

3. Install Python v3.9.x

   ![Installation Instruction](./docs/1.png)

4. Install AWS CLI v2
   ![Installation Instruction](./docs/2.png)

5. Configure AWS CLI. To configure the AWS CLI you’ll need the following from your AWS account :

   1. Access Key Id
   2. Secret Key
   3. Default AWS region

6. To avoid conflict, delete the existing AWS CLI configurations and credentials
    ![Installation Instruction](./docs/3.png)

7. Configure AWS credentials for AWS CLI
    ![Installation Instruction](./docs/4.png)

8. Install Serverless Framework CLI

   ```bash
    npm install -g serverless
    ```

## Dependencies and Libraries

Library | Version | Notes
:-------|:--------:|-------
[Node](https://nodejs.org/) | 12.13.x | Recommended NodeJS version
[NPM](https://nodejs.org/) | 6.12.x | Recommended NPM version
[Serverless Framework](https://www.serverless.com/) | 2.16.x | Framework for serverless development like Lambda, Azure functions, Google functions
[serverless-plugin-typescript](https://github.com/prisma-labs/serverless-plugin-typescript)| ~1.1.x | Serverless plugin for zero-config Typescript support
[serverless-offline](https://github.com/dherault/serverless-offline)| ~6.8.x | plugin emulates AWS λ and API Gateway on your local machine to speed up your development cycles. To do so, it starts an HTTP server that handles the request's lifecycle like APIG does and invokes your handlers
[Python](https://www.python.org/)| ~3.9.x | programming language
[awscli](https://aws.amazon.com/cli/)| ~2.x.x | AWS Command Line Interface

## Quick Start

1. Clone repository and run `npm install`

  ```bash
  git clone https://github.com/serverless-is/aws-lambda-with-dynamodb.git
  cd hello-world
  npm install
  ```

2. Test the lambda function by invoking the lambda function locally. runs your code locally by emulating the AWS Lambda environment.

  ```bash
   sls invoke local --function hello
  ```

3. Run `serverless offline` command to start the Lambda/API simulation.

  ```bash
  sls offline

  or

  sls offline start

  // Test the AWS lambda function locally via emulated API gateway.
  GET - http://localhost:3000/dev/greet

  or
  // start on specific port
   sls offline start --port 4000

   GET - http://localhost:4000/dev/greet
  ```

4. Deploy the service(defined in your current working directory) to AWS as lambda function and invoking event as REST End point via AWS API gateway.

  ```bash
 // deploy to default stage (dev) and default region (us-east-1). 
 sls deploy

 // deploy with stage and region options
 sls deploy --stage production --region us-west-1
  ```

5. Test the AWS lambda function.

  ```bash
 sls invoke -f hello
  ```

6. Test the AWS lambda function via Trigger events (i.e) REST API End Points.

  ```bash
 GET - https://wvz961twj2.execute-api.us-east-1.amazonaws.com/dev/greet
  ```

7. If there are changes only to the functions(handler) and no changes to infrastructure(serverless.yml), then deploy only the function(no AWS cloudformation changes). This is a much faster way of deploying changes in code.

  ```bash
 sls deploy function -f hello

 // deploy with stage and region options
 sls deploy function -f hello --stage production --region us-west-1

 // deploy only configuration changes, ONLY Lambda-level configuration changes e.g. handler, timeout or memorySize
 sls deploy function -f hello --update-config
  ```

8. To list information about your deployments.

  ```bash
 // List existing deploys 
 sls deploy list

 // List deployed functions and their versions
 sls deploy list functions
  ```

9. To list information about the deployed service.

  ```bash
 sls deploy info
  ```

10. To watch the logs of a specific function.

  ```bash
  sls logs -f hello

  // Optionally tail the logs with -t
  sls logs -f hello -t

  // Optionally fetch only the logs that contain the string serverless
  sls logs -f hello --filter serverless
  ``` 

11. To remove the deployed service, defined in your current working directory

  ```bash
 sls remove

// Removal of service in specific stage and region
 sls remove --stage dev --region us-east-1
  ```

12. To Rollback a service to a specific deployment using timestamp

  ```bash
 sls rollback -t timestamp

// Optionally Shows any Stack Output
 sls rollback -v -t timestamp

// To get timestamp of all the existing deployments, run 
   sls deploy list 
  ```

## Create AWS Lambda Function using Serverless Framework

1. Create service a new service or project(hellow-world-typescript) for AWS Lambda function (hello). You can define one or more functions in a service

  ```bash
  sls create --template aws-nodejs --path hellow-world-typescript --name hello
  ```

  This creates 3 files:
    - gitignore file
    - handler.ts - Code for the application's Lambda function.
    - serverless.yml - A template that defines the application's AWS Lambda resources and Trigger events

1. Define events in `serverless.yml` to trigger the lambda function. Example: for this `hello` function,  we defined HTTP REST End points with path `wish` and method `GET`. On deploying this service, it create lambda function and REST API service via AWS API Gateway

  ```yml
  functions:
  hello:
    handler: handler.hello
    events:
       - http:
          path: greet
          method: get
  ```

1. Define  plugins `serverless-plugin-typescript` and `serverless-offline` in `serverless.yml`

  ```yml
  plugins:
    - serverless-plugin-typescript
    - serverless-offline
  ```

  Note: Add the plugins to your serverless.yml file and make sure that serverless-plugin-typescript precedes serverless-offline as the order is important:

  serverless-plugin-typescript: Serverless plugin for zero-config Typescript support.Works out of the box without the need to install any other compiler or plugins

  serverless-offline: This Serverless plugin emulates AWS Lambda and API Gateway on your local machine to speed up your development cycles. To do so, it starts an HTTP server that handles the request's lifecycle like APIG does and invokes your handlers.

1. On running the `sls deploy` command, will automatically compile the Typescript to JavaScript and creates an AWS Lambda function `hello-world-typescript-dev-hello` and a REST API via AWS API Gateway `dev-hello-world-typescript` with endpoints `https://wvz961twj2.execute-api.us-east-1.amazonaws.com/dev/greet`

1. Run `serverless offline` command to start the Lambda/API simulation.

  ```bash
  sls offline

  or

  sls offline start

  // Test the AWS lambda function locally via emulated API gateway.
  GET - http://localhost:3000/dev/greet
  ```

## Status and Issues

* [Change History](./CHANGELOG.md).
* [Issue tracker](https://github.com/serverless-is/aws-lambda-with-dynamodb/issues?state=open)
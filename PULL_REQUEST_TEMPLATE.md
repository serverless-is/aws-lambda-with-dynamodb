## What changed

- {Describe changes here}

## How to test

- Get the code

```bash
git clone git clone https://github.com/serverless-is/aws-lambda-with-dynamodb.git
cd hello-world
git checkout {branch-name}
npm install
```

- Deploy and invoke the AWS Lambda function

```bash
sls deploy
sls invoke -f hello
```

- Follow the Readme and invoke the AWS Lambda function via REST End Point


## What to check

Verify that the following are valid:

- Verify the code changes work as expected without any errors
- Review the code changes and verify it is written as Serverless coding standard
- Changelog file is updated
- Review if any changes are needed to README prescription or any other project documents
- Delete the branch after merging back with the `develop` branch

import * as dynamoDbLib from './libs/dynamodb-lib';
import { response } from './libs/response-lib';

export const main = async (event, context, callback) => {
  const params = {
    TableName: 'notes',
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId' partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id of the authenticated user
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId,
    }
  };

  try {
    const result = await dynamoDbLib.call('query', params);
    callback(null, response(200, result.Items));
  } catch(e) {
    callback(null, response(e.statusCode, { error: e }));
  }
};

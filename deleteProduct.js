"use strict";
const AWS = require("aws-sdk");
const formatResponse = require("./formatResponse");

module.exports.deleteProduct = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  if (!event.pathParameters || !event.pathParameters.id)
    return formatResponse({ message: "Missing product id", status: 400 });
  const deleteParams = {
    TableName: process.env.DYNAMODB_PRODUCT_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };
  await dynamoDb.delete(deleteParams).promise();

  return formatResponse({
    message: "Product deleted successfully",
    status: 201,
  });
};

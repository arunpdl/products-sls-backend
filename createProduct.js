"use strict";
const AWS = require("aws-sdk");
const formatResponse = require("./formatResponse");

module.exports.createProduct = async (event, context) => {
  if (!event)
    return formatResponse({ message: "Missing product data", status: 400 });
  console.log("name", event.name);
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_PRODUCT_TABLE,
    Item: {
      id: context.awsRequestId,
      price: event.price,
      name: event.name,
      description: event.description,
      imageUrl: event.imageUrl,
    },
  };
  await dynamoDb.put(putParams).promise();

  return formatResponse({
    message: "Product created successfully",
    status: 201,
  });
};

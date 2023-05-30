"use strict";
const AWS = require("aws-sdk");
const formatResponse = require("./formatResponse");

module.exports.createProduct = async (event, context) => {
  if (!event.body)
    return formatResponse({ message: "Missing product data", status: 400 });
  console.log("name", event.name);
  const reqBody = JSON.parse(event.body);
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_PRODUCT_TABLE,
    Item: {
      id: context.awsRequestId,
      price: reqBody.price,
      name: reqBody.name,
      description: reqBody.description,
      imageUrl: reqBody.imageUrl,
      createdAt: new Date().toISOString()
    },
  };
  await dynamoDb.put(putParams).promise();

  return formatResponse({
    message: "Product created successfully",
    status: 201,
  });
};

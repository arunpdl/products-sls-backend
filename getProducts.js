"use strict";
const AWS = require("aws-sdk");
const formatResponse = require("./formatResponse");

module.exports.getProducts = async () => {
  const scanParams = {
    TableName: process.env.DYNAMODB_PRODUCT_TABLE,
  };

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.scan(scanParams).promise();

  // if (result.Count === 0) {
  //   return formatResponse({
  //     message: "No products found",
  //     status: 404,
  //   });
  // }

  return formatResponse({
    response: result.Items || [] ,
    status: 200,
  });
};

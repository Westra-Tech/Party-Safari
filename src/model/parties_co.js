db.createCollection("parties_co", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["Name", "Description", "AddressLine1", "City", "EndDate", "Guests", "Price", "StartDate", "State", "Zip", "HostName"],
        properties: {
          Name: {
            bsonType: "string",
            description: "Name is required and must be a string"
          },
          Description: {
            bsonType: "string",
            description: "Description is required and must be a string"
          },
          AddressLine1: {
            bsonType: "string",
            description: "AddressLine1 is required and must be a string"
          },
          City: {
            bsonType: "string",
            description: "City is required and must be a string"
          },
          EndDate: {
            bsonType: "date",
            description: "EndDate is required and must be a date"
          },
          Guests: {
            bsonType: "array",
            description: "Guests is required and must be an array of strings"
          },
          Price: {
            bsonType: "double",
            minimum: 0.00,
            description: "Price is required and must be a non-negative number"
          },
          StartDate: {
            bsonType: "date",
            description: "StartDate is required and must be a date"
          },
          State: {
            bsonType: "string",
            description: "State is required and must be a string"
          },
          Zip: {
            bsonType: "string",
            description: "Zip is required and must be a string"
          },
          HostName: {
            bsonType: "string",
            description: "HostName is required and must be a string"
          }
        }
      }
    }
  });
  
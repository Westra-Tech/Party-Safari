//reviews_co.js
db.createCollection("reviews_co", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["user_id", "party_id", "review_date", "rating", "review_title", "review_text"],
            properties: {
                user_id: {
                    bsonType: "string",
                    description: "user_id is required and must be an string"
                },
                party_id: {
                    bsonType: "string",
                    description: "party_id is required and must be an string"
                },
                review_date: {
                    bsonType: "date",
                    description: "review_date is required and must be a date"
                },
                rating: {
                    bsonType: "int",
                    minimum: 0,
                    maximum: 10,
                    description: "rating is required and must be an integer between 0 and 10"
                },
                review_title: {
                    bsonType: "string",
                    description: "review_title is required and must be a string"
                },
                review_text: {
                    bsonType: "string",
                    description: "review_text is required and must be a string"
                }
            }
        }
    }
});

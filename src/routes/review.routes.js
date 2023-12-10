const reviewController = require("../controllers/review.controller.js");

function handleRequest(req, res) {
  reviewController.dbConnect();

  const parsedUrl = new URL(req.url, "http://localhost:8080");
  if (
    // GET
    parsedUrl.pathname === "/api/reviews/get-one" &&
    req.method === "GET" &&
    parsedUrl.searchParams.has("review_id")
  ) {
    reviewController.getOneReviewByID(req, res,
      parsedUrl.searchParams.get("review_id")
    );


  } else if (
    // GET
    parsedUrl.pathname === "/api/reviews/get-latest-n" &&
    req.method === "GET" &&
    parsedUrl.searchParams.has("party_id") && 
    parsedUrl.searchParams.has("user_id") &&
    parsedUrl.searchParams.has("N")
  ) {
    reviewController.getNLatestReviewsByID(req, res,
      parsedUrl.searchParams.get("party_id"),
      parsedUrl.searchParams.get("user_id"),
      parseInt(parsedUrl.searchParams.get("N"), 10)
    );


  } else if (
    // POST
    parsedUrl.pathname === "/api/reviews/create" &&
    req.method === "POST" &&
    parsedUrl.searchParams.has("user_id") &&
    parsedUrl.searchParams.has("party_id") &&
    parsedUrl.searchParams.has("review_date") &&
    parsedUrl.searchParams.has("rating") &&
    parsedUrl.searchParams.has("review_title") &&
    parsedUrl.searchParams.has("review_text")
  ) {
    reviewController.createReview(req, res,
      parsedUrl.searchParams.get("user_id"),
      parsedUrl.searchParams.get("party_id"),
      parsedUrl.searchParams.get("review_date"),
      parsedUrl.searchParams.get("rating"),
      parsedUrl.searchParams.get("review_title"),
      parsedUrl.searchParams.get("review_text")
    );


  } else if (
    // PUT
    parsedUrl.pathname === "/api/reviews/edit" &&
    req.method === "PUT" &&
    parsedUrl.searchParams.has("review_id") &&
    parsedUrl.searchParams.has("user_id") &&
    parsedUrl.searchParams.has("rating") &&
    parsedUrl.searchParams.has("review_title") &&
    parsedUrl.searchParams.has("review_text")
  ) {
    reviewController.editReview(req, res,
      parsedUrl.searchParams.get("review_id"),
      parsedUrl.searchParams.get("user_id"),
      parsedUrl.searchParams.get("rating"),
      parsedUrl.searchParams.get("review_title"),
      parsedUrl.searchParams.get("review_text")
    );


  } else if (
    // DELETE
    parsedUrl.pathname === "/api/reviews/delete" &&
    req.method === "DELETE" &&
    parsedUrl.searchParams.has("review_id") &&
    parsedUrl.searchParams.has("user_id")
  ) {
    reviewController.deleteReview(req, res,
      parsedUrl.searchParams.get("review_id"),
      parsedUrl.searchParams.get("user_id")
    );


  } else {
    // NOT FOUND
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Endpoint not found" }));
  }
}

module.exports = handleRequest;

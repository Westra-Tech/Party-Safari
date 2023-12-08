const editAttendanceController = require("../controllers/editAttendance.controller.js");

async function handleEditAttendanceRequest(req, res) {
  console.log(`editAttendance.routes started`);
  try {
    await editAttendanceController.dbConnect();  // Ensure dbConnect is called and awaited
    console.log(`editAttendance.routes dbconnect`);

    const parsedUrl = new URL(req.url, "http://localhost:8080");

    if (
      parsedUrl.pathname === "/api/edit-attendance/delete" &&
      req.method === "DELETE" &&
      parsedUrl.searchParams.has("party_id") &&
      parsedUrl.searchParams.has("user_id")
    ) {
      await editAttendanceController.deleteRsvp(
        req,
        res,
        parsedUrl.searchParams.get("party_id"),
        parsedUrl.searchParams.get("user_id")
      );
    } else if (
        parsedUrl.pathname === "/api/edit-attendance/display" &&
        req.method === "GET"
      ) {
        await editAttendanceController.displayRsvpsPage(req, res);
      }else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Endpoint not found" }));
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}

module.exports = handleEditAttendanceRequest;

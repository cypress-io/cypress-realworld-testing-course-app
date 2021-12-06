export default function handler(req, res) {
  if (req.method === "POST" && req.body.email) {
    res.status(200).json({
      message: `Success: ${req.body.email} has been successfully subscribed`,
    })
  } else {
    res.status(400).json({
      message: "Error: There was an error with your request. Please try again.",
    })
  }
}

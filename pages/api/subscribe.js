const subscribed = ["john@example.com"]

export default function handler(req, res) {
  if (!req.rawHeaders.includes("application/json")) {
    res.status(400).json({
      message: `Error: request must be sent as JSON`,
    })

    return
  }

  if (
    req.method === "POST" &&
    req.body.email &&
    !subscribed.includes(req.body.email)
  ) {
    res.status(200).json({
      message: `Success: ${req.body.email} has been successfully subscribed`,
    })

    return
  }

  if (
    req.method === "POST" &&
    req.body.email &&
    subscribed.includes(req.body.email)
  ) {
    res.status(403).json({
      message: `Error: ${req.body.email} already exists. Please use a different email address.`,
    })

    return
  }

  res.status(400).json({
    message: "Error: There was an error with your request. Please try again.",
  })
}

import coursesJson from "../../data/courses.json"

export default function handler(req, res) {
  res.status(200).json(coursesJson)
}

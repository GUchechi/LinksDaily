import Link from "../models/link";

export const postLink = async (req, res) => {
  try {
    const link = await new Link({ ...req.body, postedBy: req.user._id }).save();
    // console.log("saved link => ", link);
    res.json(link);
  } catch (err) {
    console.log(err);
  }
};

export const links = async (req, res) => {
  try {
    const all = await Link.find().sort({ createdAt: -1 }).limit(500);
    res.json(all);
  } catch (err) {
    console.log(err);
  }
};

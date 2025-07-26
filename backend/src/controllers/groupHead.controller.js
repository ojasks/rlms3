import { FormResponse } from "../models/formResponse.model.js";
import { RESPONSE_STATUS } from "../constants.js";

export const getFormResponses = async (req, res) => {
  const formType = req.params.formType || req.user.groupHeadFormType;

  try {
    const responses = await FormResponse.aggregate([
      { $match: { formType: Number(formType) } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          "user.password": 0,
          "user.refreshToken": 0
        }
      }
    ]);

    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateResponseStatus = async (req, res) => {
  const { responseId } = req.params;
  const { status } = req.body;

  try {
    const response = await FormResponse.findOneAndUpdate(
      { _id: responseId, formType: req.user.groupHeadFormType },
      { status },
      { new: true }
    );

    if (!response) {
      return res.status(404).json({ error: "Response not found" });
    }

    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
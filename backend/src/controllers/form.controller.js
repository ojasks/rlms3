import { FormResponse } from "../models/formResponse.model.js";
import { ROLES, RESPONSE_STATUS } from "../constants.js";

export const submitForm = async (req, res) => {
  const { formType, responses } = req.body;
  const userId = req.user._id;

  try {
    const submission = await FormResponse.create({
      userId,
      formType,
      responses,
      status: req.user.role === ROLES.USER 
        ? RESPONSE_STATUS.PENDING 
        : RESPONSE_STATUS.APPROVED
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserSubmissions = async (req, res) => {
  try {
    const submissions = await FormResponse.find({ userId: req.user._id });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { UserAttributes } from "../types/User";
import { UsersAssessments } from "../models/UsersAssessments";
import { Assessment } from "../models/Assessments";
import { Question } from "../models/Questions";
import { Answer } from "../models/Answers";
import { Op } from "sequelize";

const signUp = async (user: UserAttributes) => {
  const { firstName, lastName, email, password } = user;
  const newUser = await User.create({
    usersAssessments: [],
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password, 8),
  });

  const assessmentIds = await Assessment.findAll({
    attributes: ["id"],
    include: [{ model: Question, attributes: ["id"] }],
  });

  assessmentIds.forEach(async (item) => {
    const newUserAssessment = await UsersAssessments.create({
      assessmentId: item.id,
      userId: newUser.id,
      completed: false,
    });

    item.questions.forEach(async (el) => {
      await Answer.create({
        questionId: el.id,
        userAssessmentId: newUserAssessment.id,
      });
    });
  });

  return newUser;
};

const signIn = async (user: UserAttributes) => {
  const checkUser = await User.findOne({
    where: {
      email: user.email,
    },
  });

  return checkUser;
};

const getUserById = async (userId: string) => {
  const user = await User.findByPk(userId, {
    include: [
      {
        model: UsersAssessments,
        include: [
          {
            model: Assessment,
          },
          {
            model: Answer,
            include: [
              {
                model: Question,
              },
            ],
          },
        ],
      },
    ],
  });

  return user;
};

const getAnswers = async (userAssessmentId: string) => {
  const answers = await Answer.findAll({
    where: {
      userAssessmentId: { [Op.eq]: userAssessmentId },
    },
  });
};

export const userService = {
  signUp,
  signIn,
  getUserById,
};

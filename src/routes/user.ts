import { Router } from "express";
import { userController } from "../controllers/user";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter = Router();

userRouter.post("/signup", userController.signUp);
/**
 * @swagger
 * /users/signup:
 *   post:
 *     description: Create new user
 *     parameters:
 *      - name: body
 *        description: firstName, lastName, email, password
 *        in: body
 *        required: true
 *        type: object
 *     responses:
 *       200:
 *         description: Success
 *
 */
userRouter.post("/signin", userController.signIn);
/**
 * @swagger
 * /users/signin:
 *   post:
 *     description: Login
 *     parameters:
 *      - name: body
 *        description: email, password
 *        in: body
 *        required: true
 *        type: object
 *     responses:
 *       200:
 *         description: Success
 *
 */
userRouter.put("/signout", authMiddleware, userController.signOut);
/**
 * @swagger
 * /users/signout:
 *   put:
 *     description: Logout
 *     parameters:
 *      - name: authorization
 *        in: header
 *        description: an authorization header
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 *
 */

userRouter.get("/profile", authMiddleware, userController.profile);
/**
 * @swagger
 * /users/profile:
 *   get:
 *     description: Profile
 *     parameters:
 *      - name: authorization
 *        in: header
 *        description: an authorization header
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 *
 */
userRouter.get(
  "/assessment/:userAssessmentId",
  authMiddleware,
  userController.getUserAssessment
);
/**
 * @swagger
 * /users/assessment/{userAssessmentId}:
 *   get:
 *     description: Profile
 *     parameters:
 *      - name: authorization
 *        in: header
 *        description: an authorization header
 *        required: true
 *        type: string
 *      - name: userAssessmentId
 *        description: id
 *        in: path
 *        required: true
 *        type: integer
 *     responses:
 *       200:
 *         description: Success
 *
 */
userRouter.put(
  "/assessment/:userAssessmentId",
  authMiddleware,
  userController.updateUserAssessment
);
/**
 * @swagger
 * /users/assessment/{userAssessmentId}:
 *   put:
 *     description: Profile
 *     parameters:
 *      - name: authorization
 *        in: header
 *        description: an authorization header
 *        required: true
 *        type: string
 *      - name: userAssessmentId
 *        description: id
 *        in: path
 *        required: true
 *        type: integer
 *      - name: body
 *        description: id, assessmentId, userId, completed, createdAt, updatedAt, answer
 *        in: body
 *        required: true
 *        type: object
 *     responses:
 *       200:
 *         description: Success
 *
 */

export default userRouter;

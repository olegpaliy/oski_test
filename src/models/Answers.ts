import { Optional } from "sequelize";
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { AnswersAttributes } from "../types/Answers";
import { Question } from "./Questions";
import { UsersAssessments } from "./UsersAssessments";

export interface AnswersCreationAttributes
  extends Optional<AnswersAttributes, "id"> {}

@Table({
  tableName: "answers",
  modelName: "answer",
  underscored: true,
})
export class Answer extends Model<
  AnswersAttributes,
  AnswersCreationAttributes
> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Question)
  @Column({
    allowNull: false,
  })
  questionId: number;

  @ForeignKey(() => UsersAssessments)
  @Column({
    allowNull: false,
  })
  userAssessmentId: number;

  @Column({
    allowNull: true,
  })
  answer: boolean;

  @BelongsTo(() => Question, "questionId")
  question: Question;

  @BelongsTo(() => UsersAssessments, "userAssessmentId")
  usersAssessments: UsersAssessments;
}

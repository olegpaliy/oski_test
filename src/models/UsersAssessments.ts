import { Optional } from "sequelize";
import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import { UsersAssessmentsAttributes } from "../types/UsersAssessments";
import { User } from "./User";
import { Assessment } from "./Assessments";
import { Answer } from "./Answers";

export interface UsersAssessmentsCreationAttributes
  extends Optional<UsersAssessmentsAttributes, "id"> {}

@Table({
  tableName: "users_assessments",
  modelName: "usersAssessment",
  underscored: true,
})
export class UsersAssessments extends Model<
  UsersAssessmentsAttributes,
  UsersAssessmentsCreationAttributes
> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Assessment)
  @Column({
    allowNull: false,
  })
  assessmentId: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User, "userId")
  user: User;

  @BelongsTo(() => Assessment, "assessmentId")
  assessment: Assessment;

  @HasMany(() => Answer, "userAssessmentId")
  answer: Answer[];

  @Column({
    allowNull: false,
  })
  completed: boolean;
}

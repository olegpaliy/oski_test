import { Optional } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { AssessmentAttributes } from "../types/Assessments";
import { UsersAssessments } from "./UsersAssessments";
import { Question } from "./Questions";

export interface AssessmentCreationAttributes
  extends Optional<AssessmentAttributes, "id"> {}

@Table({
  tableName: "assessments",
  modelName: "Assessment",
  underscored: true,
})
export class Assessment extends Model<
  AssessmentAttributes,
  AssessmentCreationAttributes
> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    allowNull: false,
  })
  name: string;

  @HasMany(() => UsersAssessments, "assessmentId")
  usersAssessments: UsersAssessments[];

  @HasMany(() => Question, "assessmentId")
  questions: Question[];
}

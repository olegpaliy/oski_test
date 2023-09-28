import { Optional } from "sequelize";
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { QuestionsAttributes } from "../types/Questions";
import { Assessment } from "./Assessments";
import { Answer } from "./Answers";

export interface QuestionsCreationAttributes
  extends Optional<QuestionsAttributes, "id"> {}

@Table({
  tableName: "questions",
  modelName: "Question",
  underscored: true,
})
export class Question extends Model<
  QuestionsAttributes,
  QuestionsCreationAttributes
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
  title: string;

  @Column({
    allowNull: false,
  })
  body: string;

  @Column({
    allowNull: false,
  })
  correctAnswer: boolean;

  @ForeignKey(() => Assessment)
  @Column({
    allowNull: false,
  })
  assessmentId: number;

  @BelongsTo(() => Assessment, "assessmentId")
  assessment: Assessment;

  @HasMany(() => Answer, "questionId")
  answers: Answer[];
}

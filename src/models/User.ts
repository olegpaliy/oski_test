import { Optional } from "sequelize";
import { Column, Model, Table, HasMany } from "sequelize-typescript";
import { UserAttributes } from "../types/User";
import { UsersAssessments } from "./UsersAssessments";

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

@Table({
  tableName: "users",
  modelName: "User",
  underscored: true,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    allowNull: false,
  })
  firstName: string;

  @Column({
    allowNull: false,
  })
  lastName: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  email: string;

  @HasMany(() => UsersAssessments, "userId")
  usersAssessments: UsersAssessments[];

  @Column({
    allowNull: false,
  })
  password: string;
}

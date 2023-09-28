import { UsersAssessmentsAttributes } from "./UsersAssessments";

export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  usersAssessments: UsersAssessmentsAttributes[];
}

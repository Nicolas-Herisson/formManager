import Form from "./form.model";
import Question from "./questions.model";
import Response from "./response.model";
import Option from "./option";
import User from "./user.model";
import Role from "./role.model";
import Invite from "./invite.model";

Form.hasMany(Question, {
  as: "questions",
  foreignKey: "form_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Question.belongsTo(Form, {
  as: "form",
  foreignKey: "form_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Question.hasMany(Option, {
  as: "options",
  foreignKey: "question_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Option.belongsTo(Question, {
  as: "question",
  foreignKey: "question_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Question.hasMany(Response, {
  as: "responses",
  foreignKey: "question_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Response.belongsTo(Question, {
  as: "question",
  foreignKey: "question_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Form, {
  as: "forms",
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Form.belongsTo(User, {
  as: "user",
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.belongsTo(Role, {
  as: "role",
  foreignKey: "role_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Role.hasMany(User, {
  as: "users",
  foreignKey: "role_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Invite.belongsTo(User, {
  as: "sender",
  foreignKey: "sender_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Invite.belongsTo(User, {
  as: "receiver",
  foreignKey: "receiver_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export { Form, Question, Response, Option, User, Role, Invite };

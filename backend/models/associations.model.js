import Form from "./form.model.js";
import Question from "./questions.model.js";
import Response from "./response.model.js";
import Option from "./option.js";


Form.hasMany(Question, { 
    as: 'questions',
    foreignKey: 'form_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
 });

Question.belongsTo(Form, { 
    as: 'form',
    foreignKey: 'form_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
 });

Question.hasMany(Response, { 
    as: 'responses',
    foreignKey: 'question_id' });

Question.hasMany(Option, { 
    as: 'options',
    foreignKey: 'question_id' });

Option.belongsTo(Question, { 
    as: 'question',
    foreignKey: 'question_id' });

Response.belongsTo(Question, { 
    as: 'question',
    foreignKey: 'question_id' });



export {
    Form,
    Question,
    Response,
    Option
};
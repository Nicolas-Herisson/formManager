import Form from "./form.model.js";
import Question from "./questions.model.js";
import Response from "./response.model.js";


Form.hasMany(Question, { 
    as: 'questions',
    foreignKey: 'form_id' });

Question.belongsTo(Form, { 
    as: 'form',
    foreignKey: 'form_id' });

Question.hasMany(Response, { 
    as: 'responses',
    foreignKey: 'question_id' });

Response.belongsTo(Question, { 
    as: 'question',
    foreignKey: 'question_id' });



export {
    Form,
    Question,
    Response
};
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

Question.hasMany(Option, {
    as: 'options',
    foreignKey: 'question_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Option.belongsTo(Question, {
    as: 'question',
    foreignKey: 'question_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Question.hasMany(Response, { 
    as: 'responses',
    foreignKey: 'question_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE' 
});
    
Response.belongsTo(Question, { 
    as: 'question',
    foreignKey: 'question_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE' 
});


export {
    Form,
    Question,
    Response,
    Option,
};
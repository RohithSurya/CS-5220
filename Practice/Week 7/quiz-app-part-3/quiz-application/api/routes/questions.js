const router = require('express').Router();

const questions = require('../../../mock_database/questions.json');
const quizzes = require('../../../mock_database/quizzes.json');

// POST /questions
router.post('/', (req, res) => {
    const { body } = req;

    // map from an array ofquestions  objects to array of question ids
    const ids = questions.map((question) => question.id);

    // find the max using the spread operator
    // take the ids array and passes them as individual arguments
    const id = Math.max(...ids) + 1;

    // spread all the key/values from the body object
    // and assign the id from the above
    const question = { ...body, id };

    questions.push(question);

    res.json(question);
});

// PUT /questions/:id
router.put('/:id', (req, res) => {
    const { params, body } = req;
    const id = parseInt(params.id);

    const question = questions.find((question) => question.id === id);

    if (question) {
        const updated = { ...question, ...body, id };

        res.json(updated);
    } else {
        res.status(404).json({ error: `No question found by id: ${id}` });
    }
});

// DELETE /questions/:id
router.delete('/:id', (req, res) => {
    const { params } = req;
    const id = parseInt(params.id);

    const index = questions.findIndex((question) => question.id === id);

    if (index !== -1) {
        // remove the question from the mock db
        questions.splice(index, 1);

        // find and remove the question id from inside the quiz.question_ids
        const quiz = quizzes.find((quiz) => {
            const questionIdIndex = quiz.question_ids.indexOf(id);

            if (questionIdIndex !== -1) {
                // removing the question id from the quiz.question_ids
                quiz.question_ids.splice(questionIdIndex, 1);
                return quiz;
            }
        });

        res.json({ message: 'success', question: id, quiz: quiz.id });
    } else {
        res.status(404).json({ error: `No question found by id: ${id}` });
    }
});

module.exports = router;

const router = require('express').Router();

// require in our mock data for quizzes to support API interactions
const quizzes = require('../../../mock_database/quizzes.json');
const questions = require('../../../mock_database/questions.json');

// GET /quizzes
router.get('/', (req, res) => {
    const { query } = req;
    const language = query.language;

    let result = quizzes;

    if (language) {
        result = quizzes.filter((quiz) => {
            return quiz.language_type.toLowerCase() === language.toLowerCase();
        });
    }

    res.json(result);
});

// GET /quizzes/:id
router.get('/:id', (req, res) => {
    const { params, query } = req;
    const id = parseInt(params.id);

    // find a quiz in the array of quiz objects by matching the id
    let quiz = quizzes.find((quiz) => quiz.id === id);

    if (quiz) {
        if (query.questions === 'true') {
            const quizQuestions = questions
                .filter((question) => {
                    return quiz.question_ids.includes(question.id);
                })
                .map((question) => {
                    const { answers, ...remaining } = question;

                    if (query.answers !== 'true') {
                        return remaining;
                    }

                    return question;
                });

            quiz = { ...quiz, questions: quizQuestions };
        }

        res.json(quiz);
    } else {
        res.status(404).json({ error: `No quiz found by id: ${id}` });
    }
});

// POST /quizzes
router.post('/', (req, res) => {
    const { body } = req;

    // mapped from an array of objects to an array of quiz ids
    const ids = quizzes.map((quiz) => quiz.id);
    const id = Math.max(...ids) + 1;

    const created = new Date().toJSON();

    const quiz = { ...body, id, created, question_ids: [] };
    quizzes.push(quiz);

    res.json(quiz);
});

// PUT /quizzes/:id
router.put('/:id', (req, res) => {
    const { params, body } = req;
    const id = parseInt(params.id);

    const quiz = quizzes.find((quiz) => quiz.id === id);

    if (quiz) {
        // removing the created key from body
        delete body.created;
        const updated = { ...quiz, ...body, id };

        res.json(updated);
    } else {
        res.status(404).json({ error: `No quiz found by id: ${id}` });
    }
});

// DELETE /quizzes/:id
router.delete('/:id', (req, res) => {
    const { params } = req;
    const id = parseInt(params.id);

    // if found returns the index, else returns -1
    const index = quizzes.findIndex((quiz) => quiz.id === id);

    if (index !== -1) {
        // find out what questions belong to the quiz
        const quiz = quizzes[index];
        const questionIDs = quiz.question_ids;

        // remove the quiz from the mock db
        // splice mutates and changes the quizzes array until server restart
        quizzes.splice(index, 1);

        // remove the associated quiz questions
        questionIDs.forEach((id) => {
            const questionIndex = questions.findIndex(
                (question) => question.id === id
            );

            if (questionIndex !== -1) {
                questions.splice(questionIndex, 1);
            }
        });

        res.json({ message: 'success', type: 'quiz', removed: id });
    } else {
        res.status(404).json({ error: `No quiz found by id: ${id}` });
    }
});

module.exports = router;

const router = require('express').Router();

const util = require('../util');

const professors = require('../../../mock_database/professors.json');
const quizzes = require('../../../mock_database/quizzes.json');

router.get('/', (req, res) => {
    const { query } = req;
    const specialty = query.specialty;

    let result = professors;

    if (specialty) {
        result = professors.filter((prof) => {
            return prof.specialties.includes(specialty);
        });
    }

    res.json(result);
});

router.get('/:id', (req, res) => {
    const { params, query } = req;
    const id = parseInt(params.id);

    const includeQuizzes = util.queryToBoolean(query.quizzes);

    // use let because we might re-asign if the query parameter is used
    let professor = professors.find((prof) => prof.id === id);

    if (professor) {
        // query parameters are string - so 'true' is a String and NOT a boolean
        if (includeQuizzes) {
            const professorQuizzes = quizzes
                .filter((quiz) => {
                    return quiz.professor_id === id;
                })
                .map((quiz) => {
                    const { name, id } = quiz;
                    return { name, id };
                });

            // we use spread the professor object in and add on the quizzes this prevents mutation
            professor = { ...professor, quizzes: professorQuizzes };
        }

        res.json(professor);
    } else {
        res.status(404).json({ error: `No professor found by id: ${id}` });
    }
});

router.post('/', (req, res) => {
    const { body } = req;

    const ids = professors.map((prof) => prof.id);
    const id = Math.max(...ids) + 1;

    const professor = { ...body, id };
    professors.push(professor);

    res.json(professor);
});

router.put('/:id', (req, res) => {
    const { params, body } = req;
    const id = parseInt(params.id);

    const professor = professors.find((prof) => prof.id === id);

    if (professor) {
        const updated = { ...professor, ...body, id };

        res.json(updated);
    } else {
        res.status(404).json({ error: `No Professor found by id: ${id}` });
    }
});

module.exports = router;

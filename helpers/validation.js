const { check } = require('express-validator');

const userCreation = [
    check('firstName', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('lastName', 'lastname is required').not().isEmpty(),
    check('favoriteMovie', 'favorite movie is required').not().isEmpty(),
    check('birthday', 'birthday is required').not().isEmpty()
];

const dataCreation = [
    check('favoriteMovie', 'Favorite Movie is required').not().isEmpty(),
    check('releasedDate', 'Released Date is required').not().isEmpty(),
    check('plot', 'Plot is required').not().isEmpty(),
    check('imdb', 'IMDB is required').not().isEmpty(),
    check('budget', 'Budget is required').not().isEmpty(),
    check('boxOffice', 'Box Office is required').not().isEmpty(),
    check('director', 'Director name is required').not().isEmpty(),
    check('whereToWatch', 'Where to Watch is required').not().isEmpty()
]


const idCheck = [
    check('id').isMongoId(),
]

module.exports = {
    userCreation,
    dataCreation,
    idCheck
}
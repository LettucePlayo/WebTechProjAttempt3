const express = require('express');
const router = express.Router();
const User = require('../models/user');
router.get('/register', (req, res) => {
res.render('register');
 });
router.post('/register', (req, res) => {
const user = new User({
email: req.body.email,
password: req.body.password
});
user.save(err => {
if (err) {
console.log(err);
} else {
res.redirect('/login');
}
});
 });
module.exports = router;



router.get('/login', (req, res) => {
res.render('login');
 });
router.post('/login', (req, res) => {
const user = new User({
email: req.body.email,
password: req.body.password})}
)

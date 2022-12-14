import express from 'express';
import connectDatabase from './config/db';
import { check, validationResult } from 'express-validator';
import cors from 'cors';

const port = 5000;
const app = express();

connectDatabase();

app.use(express.json({ extended: false }));
app.use(
    cors(
        {
            origin: 'http://localhost:3000'
        }
    )
);




/**
 * @route GET /
 * @desc Test endpoint
 */

app.get('/', (req,res) => res.send('the blog is under development'));






/**
 * @route POST api/users
 * @desc Register user
 */
app.post('/api/users', 
    [
        check('name','Please enter your name')
            .not()
            .isEmpty(),
        check('content', 'Your post is empty')
            .not()
            .isEmpty(),
        check('password', 'Please enter a password with 6 or more characters')
            .isLength({min: 6})
    ],
    (req, res) => 
    {
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(422).json({ errors: errors.array()})
        } else
        {
            return res.send(req.body)
        }
    }
);




app.listen(port, () => console.log(`Express server running on port ${port}`));
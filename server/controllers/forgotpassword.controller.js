import User from '../models/user.model.js';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const sendResetEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const isValid = await User.findOne({ email: email });

        if (!isValid) {
            return res.status(404).send({ error: 'No user Found' });
        }

        const token = jwt.sign({ id: isValid?._id, email: isValid?.email }, process.env.JWT_SECRET, { expiresIn: '5min' });

        console.log(token)

        //send this token with verify page to email
        return res.status(200).send('Password Reset Link Sent Succesfull');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}

export const changePassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { email } = req.user;

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
        ).then((data) => {
            return res.status(200).send('Updated Successfull');
        })
            .catch(err => {
                console.log(err);
                return res.status(500).send({ error: err })
            })

    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}
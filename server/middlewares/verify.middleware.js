import jwt from "jsonwebtoken"

export const verifyPasswordReset = async (req, res, next) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(401).json({ message: "UnAuthorized" });
        }
        await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).send({ error: "Token has expired" });
                } else {
                    return res.status(401).send({ error: "Invalid token" });
                }
            }
            req.user = decoded;
            next();
        });

    } catch (err) {
        console.log(err)
        return res.status(500).send('Internal Server Error');
    }
}
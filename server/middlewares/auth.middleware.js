import jwt from "jsonwebtoken"

export const verifyAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const authToken = token.split(' ')[1];

        if (!authToken) {
            return res.status(401).json({ message: "UnAuthorized" });
        }
        const decoded = await jwt.verify(authToken, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
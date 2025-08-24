import jwt from 'jsonwebtoken'

export const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message: "Unauthorized token"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded.id;
        next();
    } catch(err) {
        res.status(401).json({message: "Token not valid"});
    }
}
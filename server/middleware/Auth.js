import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header('Authorization');
        //if token not present in the request
        if(!token) return res.status(403).json({error: 'Access Denied'});

        if(token.startsWith("Bearer "))
            token = token.slice(7, token.length).trimLeft();

        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        next();    
    } catch (error) {
        console.log(`error: ${error}`);
        return res.status(401).json({ error: error.message});
    }
}
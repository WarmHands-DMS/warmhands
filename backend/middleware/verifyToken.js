import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: 'Not authenticated AS user' });

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload) => {
        if (error) return res.status(403).json({ message: 'Invalid token' });
        req.userId = payload.id;
        
        next();
    });
}

export const verifyAdminToken = (req, res, next) => {
  const adminToken = req.cookies.adminToken;
  console.log(adminToken)

  if (!adminToken) return res.status(401).json({ message: 'Not authenticated as Admin!' });

  jwt.verify(adminToken, process.env.JWT_SECRET_KEY, async (error, payload) => {
    if (error) return res.status(403).json({ message: 'Invalid Admin token' });
    req.adminId = payload.id;

    next();
  });
};
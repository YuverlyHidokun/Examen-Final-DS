import jwt from "jsonwebtoken";

const verificarJWT = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ msg: "No hay token, permiso no válido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;  // Decoded contiene el id y rol
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token no es válido" });
    }
};

export default verificarJWT;
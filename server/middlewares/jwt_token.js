import jwt from 'jsonwebtoken';

export const generateToken = (user,role) => {
    return jwt.sign({
            name: user.name,
            role: role
        },
        process.env.JWT_SECRET || 'UcantGuessThis',
        {
            expiresIn: '1h',
        }
    );
}
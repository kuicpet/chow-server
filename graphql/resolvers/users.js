const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { validateRegisterInput, validateLoginInput } = require("../../utils/validators");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
        SECRET_KEY,
        { expiresIn: "1h" }
    );
}

module.exports = {
    Mutation: {
        async login (_, { email, password }){
            const {errors, valid} = validateLoginInput( email, password );

            if(!valid){
                throw new UserInputError("Errors", {errors})
            }
            const user = await User.findOne({ email })

            if(!user){
                errors.general = "User with that email not found";
                throw new UserInputError("User with that email not found", { errors })
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = "Wrong Password";
                throw new UserInputError("Wrong Password", { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
    }
}
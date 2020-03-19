const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function signUp(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.createUser({
        ...args,
        password
    });
    const token = jwt.sign({ userId: user.id }, "Noor Jahaan");
    return {
        token,
        user,
    }
}

async function Login(parent, args, context, info) {
    const user = await context.prisma.user({ email: args.email });
    if(!user) {
        throw new Error("User Not Found");
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if(!valid){
        throw new Error("Invalid Credentials");
    }

    const token = jwt.sign({ userID: user.id }, "Noor Jahaan");
    return {
        token,
        user
    }
}

function post(parent, args, context, info) {
    const userId = getUserId(context);
    return context.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
    })
}

async function vote(parent, args, context, info) {
    const userId = getUserId(context);
    const voteExists = await context.prisma.$exists.vote({
        user: { id: userId },
        link: { id: args.linkId },
    });
    if(voteExists) {
        throw new Error(`Already Voted for link : ${args.linkId}`);
    }

    return context.prisma.createVote({
        user: { connect: { id: userId }},
        link: { connect: { id: args.linkId } },
    });
}

module.exports = {
    signUp,
    Login,
    post,
    vote,
}
const jwt = require('jsonwebtoken');
const APP_SECRET = "GraphQL-IS-AWESOME";

function getUserId(context) {
    const Authorization = context.request.get('Authorization');
    if(Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const { userId } = jwt.decode(token, "Noor Jahann");
        return userId;
    }
    throw new Error('Authentication Failed');
}

module.exports = {
    getUserId,
    APP_SECRET,
}

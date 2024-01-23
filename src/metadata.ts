/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger/plugin": { "models": [[import("./auth/dto/create-user.dto"), { "CreateUserDto": { name: { required: true, type: () => String }, password: { required: true, type: () => String } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String }, "getHelloName": { type: String } } }], [import("./auth/auth.controller"), { "AuthController": { "register": {}, "login": {}, "refreshToken": {}, "updatePassword": { type: Object } } }], [import("./users/users.controller"), { "UserController": { "getUserList": {} } }]] }, "@nestjs/graphql/plugin": { "models": [[import("./common/models/base.model"), { "BaseModel": { id: {}, createdAt: {}, updatedAt: {} } }]] } };
};
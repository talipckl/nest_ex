import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard('user') {
    constructor() {
        super({})
    }
}
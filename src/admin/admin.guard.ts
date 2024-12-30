import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class AdminGuard implements CanActivate{
  constructor(private reflector: Reflector, private prisma: PrismaService){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true
    const req = context.switchToHttp().getRequest()
    const user = await this.prisma.user.findUnique({
      where: {id: req.user.id}
    })
    delete user.password
    if(user.role !== "ADMIN") throw new UnauthorizedException("Only admin can access this route")
    else return !!user
  }
}
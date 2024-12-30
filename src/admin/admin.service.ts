import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto, LoginAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { Status } from 'src/events/dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService, private jwtService: JwtService){}

  async findOne(id: string){
    const user = await this.prisma.user.findUnique({
      where: { id }
    })
    return user
  }

  async signup(dto: CreateAdminDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: dto.username },
          { email: dto.email }
        ]
      },
    });

    if (user)
      throw new HttpException('User Already Exists!', HttpStatus.CONFLICT);

    const hashedPassword = await hash(dto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        username: dto.username,
        password: hashedPassword,
        email: dto.email,
        role: 'ADMIN'
      },
    });

    const access_token = this.jwtService.sign(newUser);

    return access_token;
  }
  
  async inviteAdmin(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (user) throw new HttpException('User Already Exists!', HttpStatus.CONFLICT);

    const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 1000)
    const newToken = await this.prisma.token.create({
      data: {
        email,
        expiresAt
      }
    })
    return {
      success: true,
      message: "Admin Invite Sent Successfully " + newToken.id
    }
  }
  
  async acceptAdminInvite(dto: CreateAdminDto, token: string) {
    const {email, password, username } = dto

    const foundToken = await this.prisma.token.findUnique({
      where: { id_email: {
        id: token,
        email
      }}
    })

    if(!foundToken) throw new HttpException("Token does not exist!", HttpStatus.FORBIDDEN)
    const isExpired = foundToken.expiresAt <= new Date()

    if(isExpired) throw new HttpException("Token is Expired!", HttpStatus.FORBIDDEN)
    
    await this.prisma.token.delete({
      where: { id: foundToken.id }
    })

    const hashedPassword = await hash(password, 10);
    await this.prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        email: email,
        role: 'ADMIN'
      },
    });

    return {
      success: true,
      message: "Admin User Created Successfully"
    };
  }

  async login(dto: LoginAdminDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    if (!user)
      throw new HttpException('User does not exist', HttpStatus.UNAUTHORIZED);
    if (user.role !== "ADMIN")
      throw new HttpException('User is not an admin', HttpStatus.UNAUTHORIZED);

    const isPasswordCorrect = await compare(dto.password, user.password);

    if (!isPasswordCorrect)
      throw new HttpException('User Unauthorized', HttpStatus.UNAUTHORIZED);
    const { ...data } = user;
    const access_token = this.jwtService.sign(data);

    return access_token;
  }

  logout() {
    return ['....'];
  }

  async getAllUsers(){
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    })
    return users
  }

  async getUser(id: string){
    if(id.length !== 24) throw new HttpException("User does not exist", HttpStatus.NOT_FOUND)
    const user = await this.findOne(id);
    delete user.password
    if (!user) throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    return user
  }
  
  async deleteUser(id: string){
    if(id.length !== 24) throw new HttpException("User does not exist", HttpStatus.NOT_FOUND)
      const user = await this.findOne(id);
    if (!user)
      throw new HttpException(
        'User does not exist',
        HttpStatus.NOT_FOUND,
      );
    
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return { success: true, message: "User deleted Successfully" }
  }

  async getAllEvents(){
    const events = await this.prisma.event.findMany({
      include: {
        host: true
      }
    })
    return events
  }
  
  async getEvent(id: string){
    if(id.length !== 24) throw new HttpException("Event does not exist", HttpStatus.NOT_FOUND)
    const event = await this.prisma.event.findUnique({
      where: { id }
    });
    if(!event) throw new HttpException("Event does not exist", HttpStatus.NOT_FOUND)
    return event
  }

  async changeEventStatus(id: string, status: Status){
    if(id.length !== 24) throw new HttpException("Event does not exist", HttpStatus.NOT_FOUND)
    const event = await this.prisma.event.findUnique({
      where: { id }
    });
    await this.prisma.event.update({
      where: { id },
      data: {
        status
      }
    })
    if(!event) throw new HttpException("Event does not exist", HttpStatus.NOT_FOUND)
    return {
      success: true,
      message: "Event Status Updated Successfully"
    }
  }
}

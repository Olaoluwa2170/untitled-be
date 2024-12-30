import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminEventStatusDto, CreateAdminDto, InviteAdminDto, LoginAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { AdminGuard } from './admin.guard';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // AUTH
  @Public()
  @Post('auth/signup')
  signup(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.signup(createAdminDto);
  }
  
  @Public()
  @Post('auth/invite')
  inviteAdmin(@Body() inviteAdminDto: InviteAdminDto) {
    return this.adminService.inviteAdmin(inviteAdminDto.email);
  }
  
  @Public()
  @Post('auth/accept-invite/:token')
  acceptInviteAdmin(@Body() inviteAdminDto: CreateAdminDto, @Param("token") token: string) {
    return this.adminService.acceptAdminInvite(inviteAdminDto, token);
  }

  
  @Public()
  @Post('auth/login')
  login(@Body() createAdminDto: LoginAdminDto) {
    return this.adminService.login(createAdminDto);
  }

  // USERS
  @Get('user/list')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('user/:id')
  getUser(@Param("id") id: string) {
    return this.adminService.getUser(id);
  }

  @Get('event/list')
  getAllEvents() {
    return this.adminService.getAllEvents();
  }

  @Get('event/:id')
  getEvent(@Param("id") id: string) {
    return this.adminService.getEvent(id);
  }

  @Patch('event/:id')
  changeEventStatus(@Param("id") id: string, @Body() eventDto: AdminEventStatusDto) {
    return this.adminService.changeEventStatus(id, eventDto.status);
  }

  @Get('admin/list')
  getAllAdmins() {
    return this.adminService.getAllUsers();
  }

  
  @Delete('delete-user/:id')
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  @Public()
  @Get('auth/logout')
  logout() {
    // return this.adminService.deleteUser(id);
    return "logout"
  }
}

import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/guards/refreshToken.guard';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateEmailDto } from './dto/create-email.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() createLoginDto:CreateLoginDto){
    return this.authService.signIn(createLoginDto)
  }
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req:Request){
    this.authService.logout(req.user['sub'])
  }

  @ApiBearerAuth('refresh-token')
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshToken(@Req() req:Request){
    const userId=req.user['sub']
    const refreshToken=req.user['refreshToken']
    return this.authService.refreshTokens(userId, refreshToken)
  }
  
  @Patch('updatePassword/:id')
  async updatePassword(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() response) {
      try {
          const password = await this.authService.updatePassword(id, updateUserDto);
          return response.status(HttpStatus.OK).json({
              message: "Password updated successfully!",
              status: HttpStatus.OK,
              data: password
          });
      } catch (error) {
          return response.status(HttpStatus.BAD_REQUEST).json({
              message: error.message,
              status: HttpStatus.BAD_REQUEST,
              data: null
          });
      }
  }
  @Patch('updateProfile/:id')
  async updateProfile(@Body() updateUserDto:UpdateUserDto, @Param('id') id:string){
    await this.authService.updateProfile(id, updateUserDto)
  }
  @Post('resetpassword')
  async resetPassword(@Body() createEmailDto:CreateEmailDto){
  const tokenPassword=Math.floor(
    10000000000000000000+ Math.random() * 234567891057963
  ).toString()
  const user={email:createEmailDto.email}
  await this.authService.resetPassword(user , tokenPassword)
  }
}



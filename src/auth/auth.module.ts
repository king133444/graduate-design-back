import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'YOUR_SECRET',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignInDTO } from './dto/signin.dto';
import { SignUpDTO } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { RefreshTokens } from 'src/entities/RefreshTokens';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

function randomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomBytes = crypto.getRandomValues(new Uint8Array(length));

    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(randomBytes[i] % chars.length);
    }
    return result;
};

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(Users)
        private readonly userRepo: Repository<Users>,

        @InjectRepository(RefreshTokens)
        private readonly refreshTokenRepo: Repository<RefreshTokens>) { };

    async signIn(signInDto: SignInDTO) {
        if (signInDto.email == null || signInDto.password == null) return "Do not leave anything empty.";
        const isUserExists = await this.userRepo.findOne({ where: { email: signInDto.email } })
        if (!isUserExists) {
            throw new NotFoundException("User not found.");
        };
        let isPasswordCorrect = await bcrypt.compare(signInDto.password, isUserExists.passwordHash)
        if (!isPasswordCorrect) {
            throw new UnauthorizedException("Invalid credentials")
        };

        const payload = { sub: isUserExists.id, email: signInDto.email }

        const existingRefreshToken = await this.refreshTokenRepo.findOne({
            where: { user: { id: isUserExists.id } },
        });

        if (existingRefreshToken) {
            await this.refreshTokenRepo.delete({ id: existingRefreshToken.id });
        }

        const refreshTokenValue = await randomString(30);
        const refreshTokenEntity = this.refreshTokenRepo.create({
            id: randomUUID(),
            tokenHash: refreshTokenValue,
            user: isUserExists,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
        await this.refreshTokenRepo.save(refreshTokenEntity);

        return {
            access_token: await this.jwtService.signAsync(payload),
            refresh_token: refreshTokenValue,
        };
    };

    async signUp(signUpDto: SignUpDTO) {
        const isUserExists = await this.userRepo.findOne({
            where: { email: signUpDto.email },
        });

        if (isUserExists) {
            throw new Error("An account with that email already exists.");
        }
        const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

        const newUser = this.userRepo.create();
        newUser.id = randomUUID();
        newUser.email = signUpDto.email;
        newUser.passwordHash = hashedPassword;
        newUser.createdAt = new Date();

        await this.userRepo.save(newUser);

        return "User created successfully";
    };

    async refresh(refresh_token: string) {
        const IsRefreshTokenExists = await this.refreshTokenRepo.findOne({ where: { tokenHash: refresh_token } });
        const isUserExists = await this.userRepo.findOne({ where: { email: IsRefreshTokenExists?.user.email } });
        if (!IsRefreshTokenExists) {
            throw new NotFoundException("Refresh token not found");
        };
        const tokenExpireDate = IsRefreshTokenExists.expiresAt;
        if (tokenExpireDate) {
            const now = new Date();
            if (tokenExpireDate < now) {
                throw new UnauthorizedException('Refresh token has expired');
            };
            if (isUserExists) {
                const payload = { sub: isUserExists.id, email: isUserExists.email };
                const existingRefreshToken = await this.refreshTokenRepo.findOne({
                    where: { user: { id: isUserExists.id } },
                });

                if (existingRefreshToken) {
                    await this.refreshTokenRepo.delete({ id: existingRefreshToken.id });
                }

                const refreshTokenValue = await randomString(30);
                const refreshTokenEntity = this.refreshTokenRepo.create({
                    id: randomUUID(),
                    tokenHash: refreshTokenValue,
                    user: isUserExists,
                    createdAt: new Date(),
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                });
                await this.refreshTokenRepo.save(refreshTokenEntity);
                return {
                    access_token: await this.jwtService.signAsync(payload),
                    refresh_token: refreshTokenValue,
                };
            };
        };
    };
};

import { ApiProperty } from '@nestjs/swagger';

export class LoginPassportDto {
  @ApiProperty({
    type: [String],
    description: 'login user',
    example: 'User 1',
  })
  login: string;

  @ApiProperty({
    type: [String],
    description: 'password user',
    example: 'efwe',
  })
  pass: string;
}

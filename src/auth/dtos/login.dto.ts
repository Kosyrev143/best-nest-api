import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    type: [String],
    description: 'username',
    example: 'User 1',
  })
  username: string;

  @ApiProperty({
    type: [String],
    description: 'password user',
    example: 'sdf',
  })
  password: string;
}

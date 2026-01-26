import { ApiProperty } from "@nestjs/swagger";

export class UserDeleteRequest {
    @ApiProperty() public email: string;
    @ApiProperty() public name: string;
}

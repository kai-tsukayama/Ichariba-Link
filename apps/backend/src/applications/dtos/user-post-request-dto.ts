import { ApiProperty } from "@nestjs/swagger";

export class UserPostRequest {
    @ApiProperty() name: string;
    @ApiProperty() email: string;
    @ApiProperty() password: string;
}

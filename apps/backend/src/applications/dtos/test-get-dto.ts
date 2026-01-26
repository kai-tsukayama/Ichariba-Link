import { ApiProperty } from "@nestjs/swagger";

export class TestDto {
    @ApiProperty()
    readonly firstName: string;
    @ApiProperty()
    readonly lastName: string;
}

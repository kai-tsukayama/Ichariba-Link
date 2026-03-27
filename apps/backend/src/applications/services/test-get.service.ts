import { Injectable } from "@nestjs/common";
import { TestDto } from "../dtos/test-get-dto";
import { TestGetInterface } from "../interfaces/test-get.interface";

@Injectable()
export class TestGetService implements TestGetInterface {
    async testGetAsync(request: TestDto): Promise<string> {
        return `Hello, ${request.firstName} ${request.lastName} !`;
    }
}

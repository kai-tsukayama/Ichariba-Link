import { Controller, Get, Inject, Query } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { get } from "http";
import { TestDto } from "src/applications/dtos/test-get-dto";
import { TEST_GET_SERVICE } from "src/applications/interfaces/test-get.interface";
import { TestGetService } from "src/applications/services/test-get.service";

@Controller("test")
export class TestContoller {
    constructor(
        @Inject(TEST_GET_SERVICE)
        private readonly testService: TestGetService,
    ) {}
    @Get()
    getTest(@Query() request: TestDto): Promise<string> {
        return this.testService.testGetAsync(request);
    }
}

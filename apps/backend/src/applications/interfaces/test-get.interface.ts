import { TestDto } from "../dtos/test-get-dto";

export const TEST_GET_SERVICE = Symbol("TEST_GET_SERVICE");
export interface TestGetInterface {
    testGetAsync(request: TestDto): Promise<string>;
}

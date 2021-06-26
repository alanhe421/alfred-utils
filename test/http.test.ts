import {http} from "../lib";

test('axios url', () => {
    expect(http.createHttpClient('http://127.0.0.1:8899/').defaults.baseURL).toEqual('http://127.0.0.1:8899/');
});

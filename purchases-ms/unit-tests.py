import unittest

import pytest

from main import decode_token


class MyTestCase(unittest.TestCase):


    def test_decode_token_success(self):
        valid_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEifQ.ivJ5P23wqVo3w31flg3aOu7er--Ijght_RrBf_MuqsU"
        payload = decode_token(valid_token)
        assert payload == {"id": "1"}

    def test_decode_token_invalid(self):
        t = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaSI6ImhhbnpvIn0.P-UUp5HBEwtcZxNgsYwYvciQcT6In5LaFjm3cF89XuQ"
        decode_token(t).__contains__("id")
        pytest.raises(KeyError)

    def test_decode_token_success2(self):
        valid_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIifQ.HC0yYuYXqXlHzBlt7QGWGYbVmpG3zb7iepoJABXUASQ"
        payload = decode_token(valid_token)
        assert payload == {"id": "2"}

    def test_decode_token_invalid2(self):
        invalid_token = 5
        pytest.raises(RuntimeError)

    def test_decode_token_success3(self):
        valid_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImhhbnpvIn0.F0pAM4CtHiPcMOMkhk9ocxY2hSgCRxovY1JiNdBuKFQ"
        payload = decode_token(valid_token)
        assert payload == {"id": "hanzo"}

    def test_decode_token_invalid3(self):
        invalid_token = "invalid_token"
        pytest.raises(RuntimeError)


if __name__ == '__main__':
    unittest.main()

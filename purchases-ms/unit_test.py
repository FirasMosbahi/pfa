import pytest
import jwt
from main import decode_token
from jwt.exceptions import InvalidTokenError

def test_decode_token_success():
    valid_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEifQ.ivJ5P23wqVo3w31flg3aOu7er--Ijght_RrBf_MuqsU"
    payload = decode_token(valid_token)
    assert payload == {"id": "1"}

def test_decode_token_success2():
    valid_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIifQ.HC0yYuYXqXlHzBlt7QGWGYbVmpG3zb7iepoJABXUASQ"
    payload = decode_token(valid_token)
    assert payload == {"id": "2"}

def test_decode_token_invalid2():
    invalid_token = 5
    with pytest.raises(RuntimeError):
        decode_token(invalid_token)

def test_decode_token_success3():
    valid_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImhhbnpvIn0.F0pAM4CtHiPcMOMkhk9ocxY2hSgCRxovY1JiNdBuKFQ"
    payload = decode_token(valid_token)
    assert payload == {"id": "hanzo"}

def test_decode_token_invalid3():
    invalid_token = "invalid_token"
    with pytest.raises(RuntimeError):
        decode_token(invalid_token)

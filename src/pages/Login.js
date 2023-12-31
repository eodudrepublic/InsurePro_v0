import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/buttons/Button";
import Header from "../components/Header";
import LoginImg from "../external/image 14.png";

const Login = () => {
  const email = useRef("");
  const password = useRef(null);
  const navigate = useNavigate();

  const onLogin = () => {
    axios
      .post(" http://3.38.101.62:8080/v1/login", {
        email: email.current.value,
        password: password.current.value,
      })
      .then((response) => {
        if (response.status == 200) {
          const { authorization, refresh } = response.headers;

          if (authorization && refresh) {
            localStorage.setItem("accessToken", authorization);
            localStorage.setItem("refreshToken", refresh);
            navigate("/main");
          } else {
            console.log(response.headers);
            console.warn(
              "Authorization and Refresh headers are missing in the response!"
            );
          }
        } else {
          alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("로그인에 실패했습니다.");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "1360px",
        margin: "0 auto",
        height: "920px",
        borderRight: "2px solid #dde1e6",
      }}
    >
      <div>
        <img
          src={LoginImg}
          style={{
            width: "800px",
            height: "920px",
          }}
        />
      </div>
      <div style={{ paddingTop: "110px", width: "560px", height: "920px" }}>
        {/* <Header /> */}
        {/* <StyledSpan>로그인</StyledSpan> */}
        <StyledInputDiv>
          <h1
            style={{
              display: "flex",
              color: "#000000",
              marginLeft: "30px",
              fontWeight: "bold",
              fontSize: "34px",
              marginBottom: "30px",
            }}
          >
            {" "}
            로그인
          </h1>
          <h3
            style={{
              display: "flex",
              color: "#000000",
              opacity: "0.7",
              marginLeft: "30px",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            아직 회원이 아니신가요?
          </h3>

          <h3
            style={{
              display: "flex",
              color: "#175CD3",
              marginBottom: "50px",
              marginLeft: "30px",
              cursor: "pointer",
              fontSize: "20px",
              fontWeight: "700",
            }}
            onClick={() => navigate("/signup")}
          >
            회원가입 하러가기!
          </h3>
          <div>
            <span style={{ display: "flex", fontSize: "20px" }}>Email</span>
            <input
              style={{ display: "flex" }}
              type="email"
              ref={email}
              placeholder="이메일을 입력해주세요."
              autoFocus
            />
          </div>
          <div>
            <span style={{ display: "flex", fontSize: "20px" }}>Password</span>
            <input
              style={{ display: "flex" }}
              type="password"
              ref={password}
              placeholder="비밀번호를 입력해주세요."
            />
            <div className="error_message"></div>
          </div>
        </StyledInputDiv>
        <StyledButtonDiv>
          <StyledInput
            onClick={() => {
              if (email.current.value === "") {
                email.current.focus();
                document.querySelector(".error_message").innerHTML =
                  "이메일을 입력해주세요.";
              } else if (password.current.value === "") {
                password.current.focus();
                document.querySelector(".error_message").innerHTML =
                  "비밀번호를 입력해주세요.";
              } else {
                onLogin();
              }
            }}
            value="로그인"
          />
        </StyledButtonDiv>
      </div>
    </div>
  );
};

const StyledInputDiv = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  color: #aaa;
  margin: 5vh auto 20px;
  margin-top: 70px;
  padding: 20px 10px;
  width: 460px;
  border-radius: 15px;

  input {
    width: 380px;
    height: 30px;
    margin: 8px 5px;
    margin-left: 30px;
    margin-bottom: 30px;
    color: #000000;
    opacity: 0.8;
    font-size: 20px;
    font-weight: bold;
    outline: none;
    border: none;
    border-bottom: 1px solid #ddd;
  }
  span {
    font-family: "Do Hyeon", sans-serif;
    font-size: 20px;
    font-weight: bold;

    margin: 2px;
    margin-left: 30px;
    color: #98a2b3;
    opacity: 0.9;
  }
  .error_message {
    color: red;
    font-size: 18px;
  }
`;
//?왜 밑에꺼랑 이거랑 둘 다 가입하기 버튼 수정하는지?
const StyledInput = styled.input`
  font-size: 25px;
  font-family: "Do Hyeon", sans-serif;
  width: 430px;
  height: 40px;
  border: none;
  font-weight: bold;
  text-align: center;
  background-color: transparent;
  margin: 10px;
  color: #fff;
  cursor: pointer;
`;
//현재 로그인 버튼
const StyledButtonDiv = styled.div`
  border-radius: 32px;
  display: flex;
  width: 400px;
  align-items: center;
  background-color: #175cd3;
  color: #fff;
  box-shadow: 0.5px 0.5px 12px grey;
  margin: ${(props) => props.margin || "auto"};
`;

export default Login;

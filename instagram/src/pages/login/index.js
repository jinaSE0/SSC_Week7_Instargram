import React from "react";
import "../login/index.css";
import { useRef, useState } from "react";
import axios from "axios";

const Main = (props) => {
  const [login, setLogin] = useState(true);

  const usernameInput = useRef();
  const passwordInput = useRef();
  const passwordConfirmInput = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    //login 상태 확인해서 삼항연산자로 하면될까?
    // const enteredUsername = usernameInput.current.value;
    // const enteredPassword = passwordInput.current.value;
    // const enteredpasswordConfirm = passwordConfirmInput.current.value;

    // console.log(enteredUsername);
    // console.log(enteredPassword);
    // console.log(enteredpasswordConfirm);

    // 유효성검사어떻게할건데...
    //axios 회원가입 /api/users/signup 로그인 /api/users/login

    // POST 요청 전송
    if (login === true) {
      //로그인 버튼
      //login 상태 확인해서 삼항연산자로 하면될까?
      const enteredUsername = usernameInput.current.value;
      const enteredPassword = passwordInput.current.value;

      axios
        .post(
          "/users/login",
          {
            username: enteredUsername,
            password: enteredPassword,
          },
          {
            "Content-Type": "application/json",
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          alert("나 로그인 버튼");
          console.log(error);
        });
    } else {
      //login 상태 확인해서 삼항연산자로 하면될까?
      const enteredUsername = usernameInput.current.value;
      const enteredPassword = passwordInput.current.value;
      const enteredpasswordConfirm = passwordConfirmInput.current.value;
      //회원가입 버튼
      axios
        .post(
          "/users/signup",
          {
            username: enteredUsername,
            password: enteredPassword,
            passwordComfirm: enteredpasswordConfirm,
          },
          { "Content-Type": "application/json" }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          alert("나 회원가입 버튼");
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div className="contentsWrap">
        <div className="loginWindow">
          {login ? (
            <form onSubmit={submitHandler}>
              <div className="loginvalues">
                <img src="img/logo_text.png" className="imgsize"></img>
                <input
                  type="text"
                  placeholder="아이디"
                  className="inlineToBlock"
                  name="username"
                  ref={usernameInput}
                ></input>
                <input
                  type="text"
                  placeholder="비밀번호"
                  className="inlineToBlock"
                  name="password"
                  ref={passwordInput}
                ></input>
                <button className="inlineToBlock ordinaryLogin unactivatedLoginColor">
                  로그인
                </button>
              </div>
              <br></br>
              <div>
                <p>
                  계정이 없으신가요?
                  <button
                    onClick={() => {
                      setLogin(false);
                    }}
                    className="haveAccount"
                  >
                    가입하기
                  </button>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={submitHandler}>
              <div className="loginvalues">
                <img src="img/logo_text.png" className="imgsize"></img>
                <input
                  type="text"
                  placeholder="아이디"
                  className="inlineToBlock"
                  ref={usernameInput}
                ></input>
                <button className="goback">아이디 확인</button>
                <input
                  type="text"
                  placeholder="비밀번호"
                  className="inlineToBlock"
                  ref={passwordInput}
                ></input>
                <input
                  type="text"
                  placeholder="비밀번호 확인"
                  className="inlineToBlock"
                  ref={passwordConfirmInput}
                ></input>
                <button className="inlineToBlock ordinaryLogin unactivatedLoginColor">
                  회원가입
                </button>
                <button
                  onClick={() => {
                    setLogin(true);
                  }}
                  className="goback"
                >
                  뒤로가기
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;

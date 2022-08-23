import React from "react";
import "../login/index.css";
import { useRef, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import { setCookies } from "../../shared/Cookies";
import { useNavigate } from "react-router-dom";

const Main = (props) => {
  const [login, setLogin] = useState(true);

  const usernameInput = useRef();
  const passwordInput = useRef();
  const passwordConfirmInput = useRef();

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();


  //useRef로 가져오고
  //post요청 true이면 사용가능 메시지 받아오고 false 이면 존재하는 아이디 메시지띄우기
  const idCheck = (e) => {
    const enteredUsername = usernameInput.current.value;

    axios
      .post(
        "http://3.38.212.192/api/users",
        {
          username: enteredUsername
        },
        {
          "Content-Type": "application/json",
        }
      )
      .then(function (response) {
        const id = response.data.success

        if (id === false) {
          alert('사용불가한 ID입니다!')
        } else {
          alert('사용가능한 ID입니다!')
        }
        console.log(id);
      })
      .catch(function (error) {
        alert("통신실패");
        console.log(error);
      });


  }

  const submitHandler = (event) => {
    event.preventDefault();

    // POST 요청 전송
    if (login === true) {
      //로그인 버튼
      const enteredUsername = usernameInput.current.value;
      const enteredPassword = passwordInput.current.value;

      axios
        .post(
          "http://3.38.212.192/api/users/login",
          {
            username: enteredUsername,
            password: enteredPassword,
          },
          {
            "Content-Type": "application/json",
          }
        )
        .then(function (response) {
          const accessToken = response.data.data.token.accessToken
          const refreshToken = response.data.data.token.refreshToken
          const username = response.data.data.username
          console.log(accessToken, refreshToken, username);

          setCookies("accessToken", accessToken, { path: "/" })
          setCookies("refreshToken", refreshToken, { path: "/" })
          setCookies("username", username, { path: "/" })

          navigate("/");

        })
        .catch(function (error) {
          alert("나 로그인 버튼 에러");
          console.log(error);
        });

    } else {
      //회원가입 버튼
      const enteredUsername = usernameInput.current.value;
      const enteredPassword = passwordInput.current.value;
      const enteredpasswordConfirm = passwordConfirmInput.current.value;
      console.log(enteredUsername);
      console.log(enteredPassword);
      console.log(enteredpasswordConfirm);

      //회원가입 버튼

      axios
        .post(
          "http://3.38.212.192/api/users/signup",
          {
            username: enteredUsername,
            password: enteredPassword,
            passwordConfirm: enteredpasswordConfirm,
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
                  type="password"
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
                <button className="goback" onClick={idCheck}>아이디 확인</button>
                <input
                  type="password"
                  placeholder="비밀번호"
                  className="inlineToBlock"
                  ref={passwordInput}
                ></input>
                <input
                  type="password"
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

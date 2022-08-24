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
    if (enteredUsername ==="" ){
      alert("ID를 입력해주세요")
      return 
    }

    axios
      .post(
        "http://3.38.212.192/api/users",
        {
          username: enteredUsername,
        },
        {
          "Content-Type": "application/json",
        }
      )
      .then(function (response) {
        const id = response.data.success;

        if (id === false) {
          alert("사용불가한 ID입니다!");
          usernameInput.current.value =""
        } else {
          alert("사용가능한 ID입니다!");
        }
        console.log(id);
      })
      .catch(function (error) {
        alert("통신실패");
        console.log(error);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // POST 요청 전송
    if (login === true) {
      //로그인 버튼
      const enteredUsername = usernameInput.current.value;
      const enteredPassword = passwordInput.current.value;

      if(enteredUsername==="" ||enteredPassword===""){
        alert("ID, PW를 입력해주세요")
        return false
      }

      axios
        .post(
          // "http://3.38.212.192/api/users/login",
          "http://3.38.212.192:8080/api/users/login",
          {
            username: enteredUsername,
            password: enteredPassword,
          },
          {
            "Content-Type": "application/json",
          }
        )
        .then(function (response) {
          const accessToken = response.data.data.token.accessToken;
          const refreshToken = response.data.data.token.refreshToken;
          const username = response.data.data.username;
          
          setCookies("accessToken", accessToken, { path: "/" });
          setCookies("refreshToken", refreshToken, { path: "/" });
          setCookies("username", username, { path: "/" });

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
      
        if(enteredUsername===""||enteredPassword===""||enteredpasswordConfirm===""){
            alert("값을 입력해주세요")
            return
        }

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
          setLogin(true)
          usernameInput.current.value = ""
          passwordInput.current.value = ""
          passwordConfirmInput.current.value =""
        })
        .catch(function (error) {
          alert("나 회원가입 버튼");
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div className="container">
        {login ? (
          <form onSubmit= {submitHandler}>
            <div className="box">
              <div className="loginvalues">
                <div class="heading"></div>
                {/* <img src="img/logo_text.png" className="imgsize"></img> */}

                <div className="login-form">
                  <div className="field">
                    <input
                      className="input"
                      type="text"
                      placeholder="아이디"
                      name="username"
                      ref={usernameInput}
                    ></input>
                  </div>

                  <div className="field">
                    <input
                      type="password"
                      placeholder="비밀번호"
                      className="inlineToBlock"
                      name="password"
                      ref={passwordInput}
                    ></input>
                  </div>

                  <button className="login-button">로그인</button>

                  <div class="separator">
                    <div class="line"></div>
                    <p>또는</p>
                    <div class="line"></div>
                  </div>

                  <div class="other">
                    <button class="fb-login-btn" type="button">
                      <i class="fa fa-facebook-official fb-icon"></i>
                      <span class="">Log in with Facebook</span>
                    </button>
                    <p class="forgot-password">Forgot password?</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="box">
              <p>
                계정이 없으신가요?
                <button
                  onClick={() => {
                    setLogin(false);
                    usernameInput.current.value = "";
                    passwordInput.current.value = "";
                  }}
                  className="signup"
                >
                  가입하기
                </button>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="container">
              <div className="box">
                <div class="heading"></div>

                <div>
                  <div className="field">
                    <input
                      type="text"
                      placeholder="아이디"
                      className="inlineToBlock"
                      ref={usernameInput}
                    ></input>
                  </div>

                  <button className="signup" onClick={idCheck}>
                    아이디 확인
                  </button>

                  <div className="field">
                    <input
                      type="password"
                      placeholder="비밀번호"
                      className="inlineToBlock"
                      ref={passwordInput}
                    ></input>
                  </div>

                  <div className="field">
                    <input
                      type="password"
                      placeholder="비밀번호 확인"
                      className="inlineToBlock"
                      ref={passwordConfirmInput}
                    ></input>
                  </div>

                  <button className="login-button">회원가입</button>
                </div>
              </div>

              <div className="box">
                <p>
                  계정이 있으신가요?
                  <button
                    onClick={() => {
                      setLogin(true);
                        usernameInput.current.value = "";
                        passwordInput.current.value = "";
                        passwordConfirmInput.current.value = "";
                    }}
                    className="signup"
                  >
                    로그인
                  </button>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Main;

import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import './Join.css';

class Join extends Component {
    constructor(props){
        super(props);
        this.state={
            id:'', //아이디
            pw:'', //비밀번호
            pw2:'', //비밀번호확인
            idcheck:'',
            pwcheck:'',
        }

    
    this.goback = this.goback.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkid = this.checkid.bind(this);
    this.checkpw = this.checkpw.bind(this);
    }

    goback(){
        this.props.history.goBack();
    }
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value,

          });
    }

    onSubmit(e){
        e.preventDefault();
        const post = {
            id:this.state.idcheck,
            pw:this.state.pwcheck,
        }
        if(this.state.idcheck==='')
        {
            alert("아이디 중복체크를 하세요");
        }
        else if(this.state.pwcheck===''){
            alert("비밀번호 확인 하세요.");
        }
        else{//post전송
            fetch('http://localhost:3001/log',{
                method : "post",
                headers : {
                    'content-type':'application/json'
                },
                body:JSON.stringify(post)
            })
            .then(alert("회원가입을 축하드립니다."))
            .then(window.setTimeout(this.props.history.goBack(), 2000))
        }
    }

    checkid(e){  //아이디 중복검사
        var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
        e.preventDefault();
        if(this.state.id==='')
        {
            alert("아이디를 입력하세요.");
            this.setState({
                checking1:false
            })
        }
        else if((special_pattern.test(this.state.id)===true)||(this.state.id.search(/\s/) != -1)||this.state.id.length < 5||this.state.id.length > 20)
        {
           alert("5~20자의 영문숫자만 사용 가능합니다.");
        }
        else{
            const post = {
                id:this.state.id
            }
      
                fetch('http://localhost:3001/idcheck',{
                method:"post",
                headers : {
                    'content-type':'application/json'
                },
                body:JSON.stringify(post)
            })
            .then(res => res.json())
            .then(json => {
              if (json[0] === undefined) {
                alert("사용할수있는 아이디입니다.");
                this.setState({
                    checking1:true,
                    idcheck:this.state.id
                })
                }
               else {
                alert("이미있는 아이디입니다.");
                this.setState({
                    checking1:false
                })
              }
            });
            
        }
    }
        checkpw(e){
            e.preventDefault();
            var pattern1 = /[0-9]/;	 //숫자
            var pattern2 = /[a-zA-Z]/;//영어
            var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;//특수문자
            if(this.state.pw==='')
            {
                alert("비밀번호를 입력하세요.");
                this.setState({
                    checking3:false
                })
            }
            else if(!pattern1.test(this.state.pw) || !pattern2.test(this.state.pw) || !pattern3.test(this.state.pw) || this.state.pw.length < 8)
            {
                alert("비밀번호 형식은 8자리 이상 특수문자 영문자 숫자로 구성되어야합니다!")
                this.setState({
                    checking3:false
                })
            }
            else{
    
               
                if(this.state.pw===this.state.pw2)
                {
                    alert("비밀번호가 일치합니다.");
                    this.setState({
                    pwdiv: '비밀번호가 일치합니다',
                    pwinput:false,
                    pwcheck:this.state.pw,
                    checking3:true
                })
                }else{
                    alert("비밀번호가 일치하지않습니다.");
                    this.setState({
                        pwdiv: '비밀번호가 일치하지않습니다.',
                        checking3:false
                    })
                }
            }   
        }

    render(){
        const {id,pw,pw2} = this.state;
        const {onSubmit,onChange} = this;
        return(
            <div className = "join">
                <form onSubmit = {onSubmit}>
                <Paper className = "join_backgroud" >
                <div>
                    <TextField
                    className = "join_id"
                    label = "아이디 입력"
                    variant = "outlined"
                    type="id"
                    name="id"
                    value={id}
                    onChange={onChange}
                    >
                    </TextField>
                    <Button className="join_id" variant="outlined" onClick={this.checkid}>중복체크</Button>
                </div>
                <div>
                    <TextField
                    className = "join_pw"
                    label = "비밀번호 입력"
                    variant = "outlined"
                    type="password"
                    name="pw"
                    value={pw}
                    onChange={onChange}
                    >
                    </TextField>
                    
                </div>
                <div>
                    <TextField
                    className = "join_pw_confirm"
                    label = "비밀번호 확인"
                    variant = "outlined"
                    type="password"
                    name="pw2"
                    value={pw2}
                    onChange={onChange}
                    >
                    </TextField>
                    <Button  className = "join_pw_confirm" variant="outlined" onClick={this.checkpw}>확인</Button>
                </div>
                
                <div>
                    <Button
                    className = "join_cancel"
                    variant='outlined'
                    onClick={this.goback}
                    >
                        취소
                    </Button>
                    <Button
                    className = "join_join"
                    variant='outlined'
                    type="submit"
                    id="submit"
                    >
                        회원가입
                    </Button>
                </div>
                </Paper>
                </form>
            </div>
            )
    }
}

export default Join;
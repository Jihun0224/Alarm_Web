import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Helmet from 'react-helmet';
import './Home.css';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            id:'', //아이디
            pw:'', //비밀번호
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange(e){
        this.setState({
            [e.target.name]: e.target.value,

          });
    }

    onSubmit(e){
        e.preventDefault();
        const post ={
            id:this.state.id,
            pw:this.state.pw
        }
        fetch('http://localhost:3001/login',{
            method: "post",
            headers : {
                'content-type':'application/json'
            },
            body:JSON.stringify(post)
        })
        .then(res => res.json())
        .then(json =>{
            if(json.boolean===false)
            {
                this.setState({
                    admin:false
                })
                alert('아이디비번다시확인!');
            }else if(json.boolean===true){
                this.setState({
                    admin:true,
                    open:false,
                    
                })
                const user = json;
                
                localStorage.setItem('user',JSON.stringify(user));
                alert(user.id+"환영합니다."); 
                console.log()
                console.log(JSON.parse(localStorage.getItem('user')).key)
                document.location.href = "/alarm"
            }
        })
    }

    render(){
        const {id,pw} = this.state;
        const {onChange,onSubmit} = this;
        return(
            
            <div className ="login">
                <Helmet bodyAttributes={{style: 'background-color : #f3f3f3'}}/> 
                <form onSubmit={onSubmit}>
                <Paper className = "login_paper" elevation={3}>

                    <Typography className = "connect" variant= "h6" align= "center">
                        Wellcome
                    </Typography>
                    <div className = " id_input">
              
                    <TextField
                    id="outlined-password-input"
                    label="ID"
                    type="ID"
                    autoComplete="current-ID"
                    variant="outlined"
                    name="id" 
                    value={id} 
                    onChange={onChange}
                    />
                    </div>
                   <div className = " pw_input">
                   <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    name="pw"  
                    value={pw} 
                    onChange={onChange}
                    />
                   </div>
                   
                    <div className = "buttons">
                    <Button className="login_button" variant="outlined" type="submit">로그인</Button>
                    <Button className="join_button" variant="outlined" href="/Join">회원가입</Button>

                    </div>

                </Paper>
                </form>
            </div>

        )
    }
}

export default Home;
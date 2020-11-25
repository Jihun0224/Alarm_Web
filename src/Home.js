import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Helmet from 'react-helmet';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './Home.css';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "", //아이디
            pw: "", //비밀번호
            open: false,
        };
        this.onChange = this.onChange.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        this.handleopen = this.handleopen.bind(this);
        this.handleClose = this.handleClose.bind(this);
      }
    onChange(e) {
        this.setState({
          [e.target.name]: e.target.value,
        });
      }
    handleopen(e) {
        this.setState({
          open: true,
        });
      }
      handleClose(e) {
        this.setState({
          open: false,
        
        });
      }
    //   onSubmit(e) {
    //     e.preventDefault();
    //     const post = {
    //       id: this.state.id,
    //       pw: this.state.pw,
    //     };
    //     fetch("api/admin", {
    //       method: "post",
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //       body: JSON.stringify(post),
    //     })
    //       .then((res) => res.json())
    //       .then((json) => {
    //         if (json.boolean === false) {
    //           this.setState({
    //             admin: false,
    //           });
    //           alert("아이디비번다시확인!");
    //         } else if (json.boolean === true) {
    //           this.setState({
    //             admin: true,
    //             open: false,
    //           });
    //           const user = json;
    //           this.props.authsubmit(true);
    //           this.props.handleClose();
    
    //           localStorage.setItem("user", JSON.stringify(user));
    //           localStorage.setItem("admin", true);
    //           console.log(JSON.parse(localStorage.getItem("user")).id);
    //         }
    //       });
    //   }
    render(){
        const { onChange, onSubmit, handleClose, handleopen } = this;

        return(
            
            <div className ="login">
                <Helmet bodyAttributes={{style: 'background-color : #f3f3f3'}}/> 
                <Paper className = "login_paper" elevation={3}>

                    <Typography className = "connect" variant= "h6" align= "center">
                        Wellcome
                    </Typography>
                   
                    {/* <form onSubmit={onSubmit}> */}
                        <div className = "id_input">

                        <TextField
                        id="outlined-id-input"
                        label="ID"
                        type="ID"
                        variant="outlined"
                        label="ID"
                        name="id"
                        value={this.state.id}
                        onChange={onChange}
                        />
                        </div>
                    <div className = "pw_input">
                        <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        variant="outlined"
                        name="pw"
                        value={this.state.pw}
                        onChange={onChange}
                        />
                    </div>
                   {/* </form> */}

                    <div className = "buttons">
                    <Button className="login_button" variant="outlined" >Login</Button>
                  
                    
                    <Button className="join_button" variant="outlined" onClick={this.handleopen}>Join</Button>
                    
                    <Dialog
                    open={this.state.open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">f</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    <div className = "id_input">

                    <TextField
                    id="outlined-id-input"
                    label="ID"
                    type="ID"
                    variant="outlined"
                    label="ID"
                    name="id"
                    value={this.state.id}
                    onChange={onChange}
                    />
                    </div>
                    <div className = "pw_input">
                    <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    variant="outlined"
                    name="pw"
                    value={this.state.pw}
                    onChange={onChange}
                    />
                    </div>

                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                    </Dialog>
                    </div>
                </Paper>
            </div>

        )
    }
}

export default Home;
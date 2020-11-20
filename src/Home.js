import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Helmet from 'react-helmet';
import './Home.css';
class Home extends Component {

    render(){
        return(
            
            <div className ="login">
                <Helmet bodyAttributes={{style: 'background-color : #f3f3f3'}}/> 
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
                    />
                    </div>
                   <div className = " pw_input">
                   <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    />
                   </div>
                   
                    <div className = "buttons">
                    <Button className="login_button" variant="outlined">Login</Button>
                    <Button className="join_button" variant="outlined">Join</Button>

                    </div>

                </Paper>
            </div>

        )
    }
}

export default Home;
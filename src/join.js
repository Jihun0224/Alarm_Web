import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class Join extends Component {

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
    render(){
        const { onChange, onSubmit, handleClose, handleopen } = this;

        return(
            
                <Dialog
                open={this.state.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
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
        )
    }


}
export default Join;
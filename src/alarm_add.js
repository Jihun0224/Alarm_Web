import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Error from '@material-ui/icons/Error';
import Check from '@material-ui/icons/Check';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './alarm_add.css'



class Alarm_Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
          alarm_time:'12:00',
          mon:false,
          tues:false,
          wed:false,
          thu:false,
          fri:false,
          sat:false,
          sun:false,

        };
        this.onChange = this.onChange.bind(this);
        this.mon_onClick = this.mon_onClick.bind(this);
        this.tues_onClick = this.tues_onClick.bind(this);
        this.wed_onClick = this.wed_onClick.bind(this);
        this.thu_onClick = this.thu_onClick.bind(this);
        this.fri_onClick = this.fri_onClick.bind(this);
        this.sat_onClick = this.sat_onClick.bind(this);
        this.sun_onClick = this.sun_onClick.bind(this);
        this.goback = this.goback.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.logout = this.logout.bind(this);
      }
      onSubmit(e) {
        e.preventDefault();

        const post = {
            alarm_time:this.state.alarm_time,
            mon:this.state.mon,
            tues:this.state.tues,
            wed:this.state.wed,
            thu:this.state.thu,
            fri:this.state.fri,
            sat:this.state.sat,
            sun:this.state.sun,
            user_key: JSON.parse(localStorage.getItem("user")).key,
        };        
        //선택된 요일이 없을 때 
        if (this.state.mon == false && this.state.tues == false && this.state.wed == false 
            && this.state.thu == false && this.state.fri == false && this.state.sat == false 
            && this.state.sun == false) {
          toast.error(
            <div>
              <div className="toast">
                <Error />
                <p>요일을 선택하세요</p>
              </div>
            </div>
          );
        } 
        else{
          fetch("http://localhost:3001/alarm_add", {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(post),
          })
          .then(res => res.json())        
          .then(res => { 
            if(res == false){
              toast.error(
                <div>
                  <div className="toast">
                    <Error />
                    <p>이미 존재하는 알람입니다.</p>
                  </div>
                </div>
              );
            }
            else{
              
                toast.success(
                  <div>
                    
                    <div className="toast">
                    <Check />
                      <p>알람이 등록되었습니다.</p>
                    </div>
                  </div>
                )
                                
                  this.props.history.goBack();

            }
           }) 
          }
      }
      mon_onClick(e){

        if(this.state.mon==false){
            this.setState({mon:true});

        }
        else{
            this.setState({mon:false});

        }
     }
     tues_onClick(e){

        if(this.state.tues==false){
            this.setState({tues:true});

        }
        else{
            this.setState({tues:false});

        }
     }      
     wed_onClick(e){

        if(this.state.wed==false){
            this.setState({wed:true});

        }
        else{
            this.setState({wed:false});

        }
     }      
     thu_onClick(e){

        if(this.state.thu==false){
            this.setState({thu:true});

        }
        else{
            this.setState({thu:false});

        }
     }     
     fri_onClick(e){

        if(this.state.fri==false){
            this.setState({fri:true});

        }
        else{
            this.setState({fri:false});

        }
     }      
     sat_onClick(e){

        if(this.state.sat==false){
            this.setState({sat:true});

        }
        else{
            this.setState({sat:false});

        }
     }      
     sun_onClick(e){

        if(this.state.sun==false){
            this.setState({sun:true});

        }
        else{
            this.setState({sun:false});

        }
     }
      onChange(e) {
        this.setState({ alarm_time: e.target.value });
      }
      goback(e){
        this.props.history.goBack();
        
      }

      logout(){
        localStorage.clear();
      }
    render(){
        const {onChange,mon_onClick, tues_onClick, wed_onClick, thu_onClick, fri_onClick, sat_onClick, sun_onClick,goback,onSubmit,logout } = this;

        return(
            <div className = "alarm_add">
                <Paper className = "alarm_paper" elevation={3}>
                <Typography className = "alarm_title" variant= "h6" align= "left">
                        Alarm
                    </Typography>
                    <Button className="Logout"  href="/" onClick={logout}>
                        Logout
                    </Button>
                    <div>
                      
                    </div>

                    <form onSubmit={onSubmit}>
                    <div className ="week">
                        <Button className = "mon" variant="contained" onClick={mon_onClick} color={this.state.mon ? "primary":"gray"}>
                            월
                        </Button>

                        <Button className = "tues" variant="contained" onClick={tues_onClick} color={this.state.tues ? "primary":"gray"}>
                            화
                        </Button>

                        <Button className = "wed" variant="contained" onClick={wed_onClick} color={this.state.wed ? "primary":"gray"}>
                            수
                        </Button>

                        <Button className = "thu" variant="contained" onClick={thu_onClick} color={this.state.thu ? "primary":"gray"}>
                            목
                        </Button>

                        <Button className = "fri" variant="contained" onClick={fri_onClick} color={this.state.fri ? "primary":"gray"}>
                            금
                        </Button>

                        <Button className = "sat" variant="contained" onClick={sat_onClick} color={this.state.sat ? "primary":"gray"}>
                            토
                        </Button>

                        <Button className = "sun" variant="contained" onClick={sun_onClick} color={this.state.sun ? "primary":"gray"}>
                            일
                        </Button>
                    </div>

                    <div className ="clock">
                        <TextField
                        id="time"
                        label="Alarm clock"
                        type="time"
                        value={this.state.alarm_time}
                        className="clock"
                        onChange={onChange}
                        
                        
                        />
                    </div>
              
                   <div className ="button_group">
                    <Button className = "add" variant="outlined" color ="primary" type="submit">
                            저장                     
                    </Button>
                    
                    <Button className = "delete" variant="outlined" color ="secondary" onClick={goback}>
                            취소
                    </Button>
                    
                   </div>
                   </form>
                   <ToastContainer />
                
                </Paper>
            </div>

        )
    }
}

export default Alarm_Add;
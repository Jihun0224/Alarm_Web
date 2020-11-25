import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import AddIcon from '@material-ui/icons/Add';
import Iconbutton from '@material-ui/core/Iconbutton';
import { Link, Router } from "react-router-dom";
import './alarm.css'
import Check from '@material-ui/icons/Check';
import Error from '@material-ui/icons/Error';
import { ToastContainer, toast } from "react-toastify";

function alarm_print(props){
    var alarm1 = "";
    if(props.mon == true){
        alarm1 = "월 "
    }
    if(props.tues == true){
        alarm1 = alarm1 + "화 ";
    }if(props.wed == true){
        alarm1 = alarm1 + "수 ";
    }if(props.thu == true){
        alarm1 = alarm1 + "목 ";
    }if(props.fri == true){
        alarm1 = alarm1 + "금 ";
    }if(props.sat == true){
        alarm1 = alarm1 + "토 ";
    }
    if(props.sun == true){
        alarm1 = alarm1 + "일";
    }
    return(
        
        <ListItemText>
            {alarm1}  ({props.time})
        </ListItemText>
        
    )
}

class Alarm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          alarm_time:'12:00',
          mon:'false',
          tues:'false',
          wed:'false',
          thu:'false',
          fri:'false',
          sat:'false',
          sun:'false',
          alarm_lists:[],
          alarm_count: 0,
          alarm_key:'',

        };
        this.onChange = this.onChange.bind(this);
        this.mon_onClick = this.mon_onClick.bind(this);
        this.tues_onClick = this.tues_onClick.bind(this);
        this.wed_onClick = this.wed_onClick.bind(this);
        this.thu_onClick = this.thu_onClick.bind(this);
        this.fri_onClick = this.fri_onClick.bind(this);
        this.sat_onClick = this.sat_onClick.bind(this);
        this.sun_onClick = this.sun_onClick.bind(this);
        this.modify_onClick = this.modify_onClick.bind(this);
        this.delete_onClick = this.delete_onClick.bind(this);
        this.alarm_onClick = this.alarm_onClick.bind(this);
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

      alarm_onClick(e){
        
        console.log(e.currentTarget.dataset.alarm_pk);
        const post ={
            alarm_pk : e.currentTarget.dataset.alarm_pk,
        }
        fetch("http://localhost:3001/current_alarm", {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(post),
          })
          .then(res => res.json())
          .then(res => {
              this.setState({mon:res[0].mon, tues:res[0].tues,
                 wed:res[0].wed, thu:res[0].thu, fri:res[0].fri, sat:res[0].sat, 
                 sun:res[0].sun, alarm_time:res[0].time, alarm_key:res[0].alarm_pk})
          })
        
        

           
      }
    modify_onClick(e){
        const post={
            alarm_key : this.state.alarm_key,
            alarm_time:this.state.alarm_time,
            mon:this.state.mon,
            tues:this.state.tues,
            wed:this.state.wed,
            thu:this.state.thu,
            fri:this.state.fri,
            sat:this.state.sat,
            sun:this.state.sun,          
        }
        fetch("http://localhost:3001/alarm_modify", {
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
                      <p>알람이 수정되었습니다.</p>
                    </div>
                  </div>
                )                          
                window.location.reload();
            }
           })
         } 
          
    
    
    delete_onClick(e){
        const post={
            alarm_key : this.state.alarm_key
        }
        fetch("http://localhost:3001/alarm_delete", {
            method: "post",
            headers: {
            "content-type": "application/json",
            },
            body: JSON.stringify(post),
        })

        window.location.reload();
    }
    componentWillMount(){

        const post = {
            user_key : 1,
        //  user_key: JSON.parse(localStorage.getItem("user")).user_pk,
    }

        fetch("http://localhost:3001/alarm_list_count", {
            method: "post",
            headers: {
            "content-type": "application/json",
            },
            body: JSON.stringify(post),
        })
        .then(res => res.json())
        .then((res) => {
            this.setState({ alarm_count: res[0].count });
            if(this.state.alarm_count != 0){

                fetch("http://localhost:3001/alarm_list", {
                    method: "post",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(post),
                  })
                  .then(res => res.json())
                  .then(res => {
                      this.setState({alarm_lists:res, mon:res[0].mon, tues:res[0].tues,
                         wed:res[0].wed, thu:res[0].thu, fri:res[0].fri, sat:res[0].sat, 
                         sun:res[0].sun, alarm_time:res[0].time, alarm_key:res[0].alarm_pk})
                  })
                }
                else{
                    document.location.href = "/alarm/add"
                }
          });

        


      }

    render(){
        const {alarm_onClick, delete_onClick, modify_onClick, onChange,mon_onClick, tues_onClick, wed_onClick, thu_onClick, fri_onClick, sat_onClick, sun_onClick } = this;

        return(
            <div className = "alarm">
                <Paper className = "alarm_paper" elevation={3}>
                    <Typography className = "alarm_title" variant= "h6" align= "left">
                            Alarm
                    </Typography>

                    <Button className="Logout" >
                        Logout
                    </Button>

                    <span className ="week">
                        <Button className = "mon" variant="contained" onClick={mon_onClick} color={this.state.mon == false ? "gray" : "primary"}>
                            월
                        </Button>

                        <Button className = "tues" variant="contained" onClick={tues_onClick} color={this.state.tues== false ? "gray" : "primary"}>
                            화
                        </Button>

                        <Button className = "wed" variant="contained" onClick={wed_onClick} color={this.state.wed== false ? "gray" : "primary"}>
                            수
                        </Button>

                        <Button className = "thu" variant="contained" onClick={thu_onClick} color={this.state.thu== false ? "gray" : "primary"}>
                            목
                        </Button>

                        <Button className = "fri" variant="contained" onClick={fri_onClick} color={this.state.fri== false ? "gray" : "primary"}>
                            금
                        </Button>

                        <Button className = "sat" variant="contained" onClick={sat_onClick} color={this.state.sat== false ? "gray" : "primary"}>
                            토
                        </Button>

                        <Button className = "sun" variant="contained" onClick={sun_onClick} color={this.state.sun== false ? "gray" : "primary"}>
                            일
                        </Button>
                    </span>


                    <div className="alarm_list">
                        <div className ="add_button">
                        <Iconbutton color="primary" variant="contained">
                            <Link to = "./alarm/add"><AddIcon/></Link>
                        </Iconbutton>
                    </div>
                        <List className = "list">
                        {this.state.alarm_lists.map((alarm) => (
                            <Button key ={alarm.alarm_pk} data-alarm_pk={alarm.alarm_pk} onClick ={alarm_onClick}>
                        <ListItem key={alarm.alarm_pk}>
                            {alarm_print(alarm)}
                        </ListItem>    
                        </Button>
                        ))}      
                        </List>
                        
                    </div>

                    <span className ="clock">
                        <TextField
                        id="time"
                        label="Alarm clock"
                        type="time"
                        value={this.state.alarm_time}
                        className="clock"
                        onChange={onChange}
                        
                        
                        />
                    </span>

                   <span className ="button_group">
                
                    <Button className = "modify" variant="outlined" color="primary" onClick={modify_onClick}>
                            수정
                    </Button>
                    <Button className = "delete" variant="outlined" color="secondary" onClick={delete_onClick}>
                            삭제
                    </Button>
                   </span>

                   <ToastContainer />
                </Paper>
            </div>

        )
    }
}

export default Alarm;
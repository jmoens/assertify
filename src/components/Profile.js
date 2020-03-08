import React, { Component } from 'react';
import './Styles.css'

class Profile extends Component {
    state ={
        fullName:"Lisa",
        userName: "lisa1234",
        email:"lisa@email.com",
        statsLabel: "Show Statistics"
    }

    onClick = (e) => {
        if(this.state.statsLabel === "Show Statistics"){
            this.setState({
                statsLabel: "Hide Statistics"
            })
            
        } else {
            this.setState({
                statsLabel: "Show Statistics"
            })
        }
        
    }

    render() {
        let statistics = <div/>
        if(this.state.statsLabel === "Hide Statistics"){
            statistics = <p>This will Show Statistics When the time is right</p>
        }
        return(
            <div className="container">
                <div className="card deep-purple lighten-4">
                    <h4 className="center-align">Profile</h4>
                    <p>
                        <span className="bold">Name:</span> {this.state.fullName}
                    </p>
                    <p>
                    <span className="bold">UserName:</span> {this.state.userName}
                    </p>
                    <p>
                    <span className="bold">Email:</span>  {this.state.email}
                    </p>
                    <div className="center-align">
                        <a className="waves-effect btn deep-purple lighten-2 waves-light" onClick={this.onClick}>
                            <i className="material-icons left">insert_chart</i>
                            {this.state.statsLabel}
                        </a>
                    </div>
                    {statistics}
                </div>
            </div>
        )
    }
}

export default Profile;
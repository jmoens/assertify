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
            const xhr = new XMLHttpRequest();

            const url = "http://127.0.0.1:8080/stats/" + localStorage.getItem("sid");

            xhr.open('GET', url);

            xhr.send();

            xhr.onreadystatechange = (e) => {
                if (xhr.readyState === 4) {
                    let json = JSON.parse(xhr.responseText);
                    console.log(json);
                    console.log(json["tones"]);
                    console.log(json["words"]);
                    this.setState({
                        statsLabel: "Hide Statistics"
                    });
                }
            }
        } else {
            this.setState({
                statsLabel: "Show Statistics"
            });
        }
    }

    render() {
        let statistics = <div/>
        if(this.state.statsLabel === "Hide Statistics"){
            statistics = <p>This will Show Statistics When the time is right</p>
        }
        return(
            <div className="container">
                <div className="card darkYellow">
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
                        <a className="waves-effect btn mediumGold black-text" onClick={this.onClick}>
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

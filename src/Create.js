import React, { Component } from 'react';
import firebase from 'firebase';
import { Nav } from './Polling';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: [{
                id: "",
                name: "",
                ques: "",
                op1: "",
                op2: "",
                op3: "",
                op4: "",
                editCheck: false,
                totalVotes: 0,
                op1Votes: 0,
                op2Votes: 0,
                op3Votes: 0,
                op4Votes: 0,
                junk: 0
            }]
        }
        this.submit = this.submit.bind(this);
    }

    componentWillMount(){
        this.thanks = 'hidden';
    }

    submit(val) {
        this.setState({
            [val.target.name]: val.target.value
        });
    }


    getVal() {

        if (this.quesIn.value === '' || this.op1In.value === '' || this.op2In.value === '' || this.nameIn.value === '') {
            alert('Please enter required fields')
        }
        else if(this.op3In.value === '' && this.op4In.value !== ''){
            var polls = {
                name: this.state.name,
                ques: this.state.ques,
                op1: this.state.op1,
                op2: this.state.op2,
                op3: this.state.op4,
                totalVotes: 0,
                op1Votes: 0,
                op2Votes: 0,
                op3Votes: 0,
                op4Votes: 0,
                editCheck: false,
            }
        }
        else if(this.op3In.value === '' && this.op4In.value === ''){
            var polls = {
                name: this.state.name,
                ques: this.state.ques,
                op1: this.state.op1,
                op2: this.state.op2,
                totalVotes: 0,
                op1Votes: 0,
                op2Votes: 0,
                op3Votes: 0,
                op4Votes: 0,
                editCheck: false,
            }
        }
        else if(this.op4In.value === ''){
            var polls = {
                name: this.state.name,
                ques: this.state.ques,
                op1: this.state.op1,
                op2: this.state.op2,
                op3: this.state.op3,
                totalVotes: 0,
                op1Votes: 0,
                op2Votes: 0,
                op3Votes: 0,
                op4Votes: 0,
                editCheck: false,
            }
        }
        else{
            var polls = {
                name: this.state.name,
                ques: this.state.ques,
                op1: this.state.op1,
                op2: this.state.op2,
                op3: this.state.op3,
                op4: this.state.op4,
                totalVotes: 0,
                op1Votes: 0,
                op2Votes: 0,
                op3Votes: 0,
                op4Votes: 0,
                editCheck: false,
            }
        }

        firebase.database().ref('/').child("pollVote").push(polls);
        console.log(polls);
        
        this.hide = 'none';
        this.thanks = 'visible';

        this.setState({junk: this.state.junk + 1})

    }


    render() {

        return (
            <div>
                <Nav />
               
                <div className="container p-4 bg-light rounded" style={{ borderLeft: '5px solid #27AE60', display: this.hide}}>
                    <div className='container col-8'>
                        <h1 className='display-4 text-dark text-center'>Poll creator</h1>
                        <p className='text-dark mb-2'>Enter Poll Name:</p>
                        <textarea type="text" name='name' ref={inp => this.nameIn = inp} placeholder='Enter a poll name' className="form-control mb-3" onChange={this.submit} />
                        <p className='text-dark mb-2'>Enter a Poll:</p>
                        <textarea type="text" name='ques' ref={inp => this.quesIn = inp} placeholder='Enter a poll question' className="form-control mb-3" onChange={this.submit} />
                        <div className='container'>
                            <p className='text-dark mb-2'>Options:</p>
                            <input type="text" name='op1' ref={inp => this.op1In = inp} placeholder='Enter option 1 *' className="form-control mb-1" onChange={this.submit} />
                            <input type="text" name='op2' ref={inp => this.op2In = inp} placeholder='Enter option 2 *' className="form-control mb-1" onChange={this.submit} />
                            <input type="text" name='op3' ref={inp => this.op3In = inp} placeholder='Enter option 3 (optional)' className="form-control mb-1" onChange={this.submit} />
                            <input type="text" name='op4' ref={inp => this.op4In = inp} placeholder='Enter option 4 (optional)' className="form-control mb-3" onChange={this.submit} />
                            <center>
                                <button className='btn btn-success container col-7' onClick={this.getVal.bind(this)}>Ask</button>
                            </center>
                        </div>
                    </div>
                </div>
                <div class="alert alert-success container" role="alert" style={{ visibility: this.thanks }}>
                    <h4 class="alert-heading">Success!</h4>
                    <p>Poll has been created successfully. Go to the Homepage to see your poll</p>
                    <hr />
                    <p class="mb-0">Note: You can only edit untill it has zero votes.</p>
                </div>
            </div>
        )
    }
}
export default Create;
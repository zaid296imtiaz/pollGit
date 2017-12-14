import React, { Component } from 'react';
import firebase from 'firebase';
import {
    Link
} from 'react-router-dom';

export class Nav extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
                    <a className="navbar-brand" href="/">Polling System</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to='/'>Home <span className="sr-only">(current)</span></Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">

                            <Link className='nav-link' to='/create'><button className="btn btn-primary my-2 my-sm-0" type="submit">Create Poll</button></Link>

                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}


class Polling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idd: [],
            name: [],
            question: [],
            op1: [],
            op2: [],
            op3: [],
            op4: [],
            totalVotes: [],
            op1Votes: [],
            op2Votes: [],
            op3Votes: [],
            op4Votes: [],
            editCheck: []
        }

        firebase.database().ref('/').child("pollVote").on('child_added', (snap) => {
            var obj = snap.val();
            obj.id = snap.key;

            this.state.idd.push(obj.id);
            this.state.name.push(obj.name);
            this.state.question.push(obj.ques);
            this.state.op1.push(obj.op1);
            this.state.op2.push(obj.op2);
            this.state.op3.push(obj.op3);
            this.state.op4.push(obj.op4);
            this.state.totalVotes.push(obj.totalVotes);
            this.state.op1Votes.push(obj.op1Votes);
            this.state.op2Votes.push(obj.op2Votes);
            this.state.op3Votes.push(obj.op3Votes);
            this.state.op4Votes.push(obj.op4Votes);
            this.state.editCheck.push(obj.editCheck);
            this.setState({
                idd: this.state.idd,
                name: this.state.name,
                question: this.state.question,
                op1: this.state.op1,
                op2: this.state.op2,
                op3: this.state.op3,
                op4: this.state.op4,
                totalVotes: this.state.totalVotes,
                op1Vote: this.state.op1Vote,
                op2Vote: this.state.op2Vote,
                op3Vote: this.state.op3Vote,
                op4Vote: this.state.op4Vote,
                editCheck: this.state.editCheck,
            })
        })
    }

    delete(inde, val) {
        firebase.database().ref('/').child('pollVote/' + this.state.idd[inde]).remove();

        this.state.idd.splice(inde, 1);
        this.state.name.splice(inde, 1);
        this.state.question.splice(inde, 1);
        this.state.op1.splice(inde, 1);
        this.state.op2.splice(inde, 1);
        this.state.op3.splice(inde, 1);
        this.state.op4.splice(inde, 1);
        this.state.totalVotes.splice(inde, 1);
        this.state.op1Votes.splice(inde, 1);
        this.state.op2Votes.splice(inde, 1);
        this.state.op3Votes.splice(inde, 1);
        this.state.op4Votes.splice(inde, 1);
        this.setState({
            idd: this.state.idd,
            name: this.state.name,
            question: this.state.question,
            op1: this.state.op1,
            op2: this.state.op2,
            op3: this.state.op3,
            op4: this.state.op4,
            totalVotes: this.state.totalVotes,
            op1Votes: this.state.op1Votes,
            op2Votes: this.state.op2Votes,
            op3Votes: this.state.op3Votes,
            op4Votes: this.state.op4Votes,
        })
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="alert alert-warning container alert-dismissible fade show" role="alert">
                    <strong>Editing is only allowed if a poll has zero votes.</strong> If no polls are available create a new poll.
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <center>
                    <h1 className='display-4 text-dark'>Current Polls</h1>

                    {this.state.name.map((val, index) => {
                        return <div className='container row'>

                            <Link className='nav-link p-0 mb-2 col-10'
                                to={{
                                    pathname: '/showPoll',
                                    state: {
                                        tkey: this.state.idd[index],
                                        name: this.state.name[index],
                                        ques: this.state.question[index],
                                        op1: this.state.op1[index],
                                        op2: this.state.op2[index],
                                        op3: this.state.op3[index],
                                        op4: this.state.op4[index],
                                        totalVotes: this.state.totalVotes[index],
                                        op1Votes: this.state.op1Votes[index],
                                        op2Votes: this.state.op2Votes[index],
                                        op3Votes: this.state.op3Votes[index],
                                        op4Votes: this.state.op4Votes[index],
                                        editCheck: this.state.editCheck[index],
                                    }
                                }}>
                                <button className="btn btn-light text-left col-12" style={{ borderLeft: '5px solid #2980B9' }} key={index}>{val}</button>
                            </Link>

                            {((this.state.editCheck[index])) ?
                                <Link ref='editLink' className='nav-link p-0 mb-2 col-0'
                                    to={{
                                        pathname: '/',
                                        state: {
                                            tkey: this.state.idd[index],
                                            name: this.state.name[index],
                                            ques: this.state.question[index],
                                            op1: this.state.op1[index],
                                            op2: this.state.op2[index],
                                            op3: this.state.op3[index],
                                            op4: this.state.op4[index],
                                            editCheck: this.state.editCheck[index],
                                        }
                                    }}>
                                    {/* {(this.state.editCheck[index]) ? <button className="btn btn-outline-warning mb-2" ref={inp => this.editButton = inp} disabled>Edit</button> : <button className="btn btn-outline-warning mb-2" ref={inp => this.editButton = inp}>Edit</button>} */}
                                    <button className="btn btn-outline-secondary mb-2" ref={inp => this.editButton = inp} disabled>Edit</button>
                                </Link>
                                :
                                <Link ref='editLink' className='nav-link p-0 mb-2 col-0'
                                    to={{
                                        pathname: '/editPoll',
                                        state: {
                                            tkey: this.state.idd[index],
                                            name: this.state.name[index],
                                            ques: this.state.question[index],
                                            op1: this.state.op1[index],
                                            op2: this.state.op2[index],
                                            op3: this.state.op3[index],
                                            op4: this.state.op4[index],
                                            editCheck: this.state.editCheck[index],
                                        }
                                    }}>
                                    {/* {(this.state.editCheck[index]) ? <button className="btn btn-outline-warning mb-2" ref={inp => this.editButton = inp} disabled>Edit</button> : <button className="btn btn-outline-warning mb-2" ref={inp => this.editButton = inp}>Edit</button>} */}
                                    <button style={{ disabled: this.hideButton }} className="btn btn-outline-warning mb-2" ref={inp => this.editButton = inp}>Edit</button>
                                </Link>}

                            <Link to='/'>
                                <button className="btn btn-outline-danger mb-2" onClick={this.delete.bind(this, index)}>Delete</button>
                            </Link>
                        </div>

                    })}
                </center>
            </div>
        )

    }
}

export default Polling; 

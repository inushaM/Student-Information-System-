import React,{Component} from 'react';
import axios from "axios";
export default class ExamAdd extends Component{

    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state= {
            Name: '',
           endDate:'',
            email:'',
            Courses:[],
            course:''
        }
    };


    onChangeName(e){
        this.setState({
            Name  : e.target.value
        });
    }
    onChangeEndDate(e){
        this.setState({
            endDate  : e.target.value
        });
    }
    onChangeEmail(e){
        this.setState({
            email  : e.target.value
        });
    }



    onSubmit(e){
        e.preventDefault();

        const newIns={
            Name: this.state.Name,
            endDate: this.state.endDate,
            course: this.state.course,
            email:this.state.email
        };

        console.log(newIns);
        axios.post('http://localhost:3001/exam/add', newIns)
            .then(res => {
                    console.log(res);
                    alert(`Exam has added successfully`);
                }
            );


        this.state= {
            Name: '',
            endDate:'',
            course:'',
            email:''
        };




    }
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    componentDidMount() {
        axios.get('http://localhost:3001/course/').then(
            data => {
                this.setState({
                    Courses: data.data
                })
            }
        )
    }


    render() {
        return(
            <div style={{background:'#1488BA'}}>
                <div className="container" style={{width:700,background:'#1488BA',color:'white'}}>
                    <h3 align="center">Create Exam</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name : </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.Name || ''}
                                onChange={this.onChangeName}
                            />
                        </div>
                        <div className="form-group">
                            <label>End Date : </label>
                            <input
                                type="date"
                                className="form-control"
                                value={this.state.endDate || ''}
                                onChange={this.onChangeEndDate}
                            />
                        </div>

                        <div className="form-group">
                            <label>Course</label>
                            <select name="course" className="form-control" onChange={this.handleInputChange} value={this.state.course}>
                                {
                                    this.state.Courses.map(sub => {
                                        return (
                                            <option key={sub._id} value={sub._id}>{sub.Name}</option>
                                        )
                                    })
                                }
                            </select>

                            <div className="form-group">
                                <label>Email : </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.email || ''}
                                    onChange={this.onChangeEmail}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <input style={{marginLeft:"250px"}} type="submit" value="Create" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
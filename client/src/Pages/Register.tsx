import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import React, { useState } from 'react';
import { toast } from 'react-hot-toast'
interface person {
    fname: string
    lname: string
    dateofbirth: string
    gender: string
    phno: string
    email: string
    state: string
    pass: string
    conpassword: string
}
let initialState: person = {
    fname: "",
    lname: "",
    gender: "",
    dateofbirth: "",
    phno: "",
    email: "",
    state: "",
    pass: "",
    conpassword: ""
}
const Register = () => {
    const [person, setPerson] = useState<person>(initialState)

    const inp:HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName('input');
    const submitdata = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const valid = () => {
            let count:number = 0;
            for (let i in inp) {
                if (inp[i].value === "") {
                    count++;
                    inp[i].focus();
                    inp[i].className = "form-control form-control-lg is-invalid";
                    break;
                }
                else {
                    if (inp[7].name === "phno") {
                        let phno = document.getElementById("phoneNumber") as HTMLInputElement;
                        let phnorror: HTMLElement | null = document.getElementById("phnoerror") as HTMLElement;
                        let phone: string = phno.value;
                        const regx: RegExp = /^[6-9]\d{9}$/;
                        if (regx.test(phone)) {
                            phnorror.innerText = "";
                        }
                        else {
                            phnorror.style.color = "red";
                            phnorror.innerText = "wrong format";
                            count++;
                        }
                    }
                    else if (inp[i].type === "text" || inp[i].type === "Date" || inp[i].type === "password") {
                        inp[i].className = "form-control form-control-lg";
                    }
                }
            }
            const sel = document.getElementById('state') as HTMLSelectElement;
            let selerr = document.getElementById('selerr') as HTMLElement;
            if (sel.value === "") {
                selerr.innerHTML = "select state"
                count++;
            }
            else {
                selerr.innerHTML = ""
            }
            const passerr = document.getElementById('passerror') as HTMLElement;
            const passRegex:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
                if (passRegex.test(person.pass) && passRegex.test(person.conpassword)) {
                    if (person.pass !== person.conpassword) {
                        count++;
                        passerr.innerHTML = "match password"
                    }
                    else{
                        passerr.innerHTML = ""
                    }
                }
                else{
                    passerr.innerHTML = `<ul><li>Min 1 uppercase</li><li>Min 1 lowercase letter</li><li>Min 1 special character</li><li>Min 1 number</li><li>Min 8 characters</li><li>Max 30 characters</li></ul>`;
                }
            return count;
        }
        if (valid() === 0) {
            console.log("posted");
            axios.post<string>('http://localhost:5050/reg_data',person)
                .then((response) => {
                    if (response.data === "success") {
                        let selele = document.getElementById("state") as HTMLSelectElement;
                        selele.selectedIndex = 0;
                        setPerson(initialState);
                        toast.success('registered Successfully!')
                    }
                    else if(response.data === "exist"){
                        toast.error("Already Registerd")
                    }
                    else{
                        toast.error("Registration Failed")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    const oninpChangeHandler = (event: HTMLInputElement) => {

        const { name, value } = event
        setPerson((prev) => {
            return { ...prev, [name]: value }
        })
        for (let i in inp) {
            if (inp[i].type === "text" || inp[i].type === "Date" || inp[i].type === "password") {
                if (inp[i].value !== "") {
                    inp[i].className = "form-control form-control-lg"
                }
            }
        }
    }
    const onselChangeHandler = (event: HTMLSelectElement) => {
        const { name, value } = event
        setPerson((prev) => {
            return { ...prev, [name]: value }
        })
        const sel = document.getElementById('state') as HTMLSelectElement;
        let selerr = document.getElementById('selerr') as HTMLElement;
        if (sel.value == "") {
            selerr.innerHTML = "select state"
        }
        else {
            selerr.innerHTML = ""
        }
    }
    return (
        <>
            <section className="vh-100">
                <div className='vh-100 gradient-custom'>
                    <div className="container py-5 h-100">
                        <div className="row justify-content-center align-items-center h-100">
                            <div className="col-12 col-lg-9 col-xl-7">
                                <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px", border: "1px solid #BFBFBF", backgroundColor: "white", boxShadow: "10px 10px 5px #aaaaaa" }}>
                                    <div className="card-body p-4 p-md-5">
                                        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                                        <form id='form' onSubmit={submitdata}>

                                            <div className="row">
                                                <div className="col-md-6 mb-4">

                                                    <div data-mdb-input-init className="form-outline">
                                                        <input name="fname" type="text" id="firstName" value={person.fname} className="form-control form-control-lg" onChange={(e) => oninpChangeHandler(e.target)} />
                                                        <label className="form-label" htmlFor="firstName">First Name</label>
                                                    </div>

                                                </div>
                                                <div className="col-md-6 mb-4">

                                                    <div data-mdb-input-init className="form-outline">
                                                        <input name="lname" type="text" id="lastName" value={person.lname} className="form-control form-control-lg" onChange={(e) => oninpChangeHandler(e.target)} />
                                                        <label className="form-label" htmlFor="lastName">Last Name</label>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4 d-flex align-items-center">

                                                    <div data-mdb-input-init className="form-outline datepicker w-100">
                                                        <input name="dateofbirth" value={person.dateofbirth} type="Date" className="form-control form-control-lg" id="birthdayDate" onChange={(e) => oninpChangeHandler(e.target)} />
                                                        <label htmlFor="birthdayDate" className="form-label">Date of Birth</label>
                                                    </div>

                                                </div>
                                                <div className="col-md-6 mb-4">

                                                    <h6 className="mb-2 pb-1">Gender: </h6>

                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="gender" id="femaleGender"
                                                            value="Female" onChange={(e) => oninpChangeHandler(e.target)} />
                                                        <label className="form-check-label" htmlFor="femaleGender">Female</label>
                                                    </div>

                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="gender" id="maleGender"
                                                            value="Male" onChange={(e) => oninpChangeHandler(e.target)} />
                                                        <label className="form-check-label" htmlFor="maleGender">Male</label>
                                                    </div>

                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="gender" id="otherGender"
                                                            value="Other" onChange={(e) => oninpChangeHandler(e.target)} />
                                                        <label className="form-check-label" htmlFor="otherGender">Other</label>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4 pb-2">

                                                    <div data-mdb-input-init className="form-outline">
                                                        <input name="email" type="email" id="emailAddress" value={person.email} className="form-control form-control-lg" onChange={(e) => oninpChangeHandler(e.target)} />
                                                        <label className="form-label" htmlFor="emailAddress">Email</label>
                                                    </div>

                                                </div>
                                                <div className="col-md-6 mb-4 pb-2">

                                                    <div data-mdb-input-init className="form-outline">
                                                        <input name="phno" type="text" id="phoneNumber" value={person.phno} className="form-control form-control-lg" onChange={(e) => oninpChangeHandler(e.target)} />
                                                        <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                                                        <div id='phnoerror'></div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12">

                                                    <label className="form-label select-label" style={{ fontSize: "25px" }}>State : </label>
                                                    <select id="state" name="state" className="select form-control-lg " onChange={(e) => onselChangeHandler(e.target)}>
                                                        <option value="">State</option>
                                                        <option value="Gujrat">Gujrat</option>
                                                        <option value="Maharashtra">Maharashtra</option>
                                                        <option value="Punjab">Punjab</option>
                                                    </select>
                                                    <div id='selerr'></div>
                                                </div>
                                            </div>

                                            <div className="row mt-4 pt-2">
                                                <div className="col-md-6 mb-4 pb-2">

                                                    <div data-mdb-input-init className="form-outline">
                                                        <input name="pass" type="password" id="pass" value={person.pass} className="form-control form-control-lg" onChange={(e) => oninpChangeHandler(e.target)} />
                                                        <label className="form-label" htmlFor="pass">Password</label>
                                                    </div>

                                                </div>
                                                <div className="col-md-6 mb-4 pb-2">

                                                    <div data-mdb-input-init className="form-outline">
                                                        <input name="conpassword" type="password" id="conpassword" value={person.conpassword} className="form-control form-control-lg" onChange={(e) => oninpChangeHandler(e.target)} />
                                                        <label className="form-label" htmlFor="conpassword">Confirm Password</label>
                                                        <div id='passerror' className='text-danger'></div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="mt-4 pt-2">
                                                <input data-mdb-ripple-init className="btn btn-primary btn-lg" value="Submit" type='submit' />
                                            </div>
                                            <div> Already Registered ? <a href='/login'>LOGIN</a></div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Register;
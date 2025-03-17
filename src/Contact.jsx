import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [responseMsg, setResponseMsg] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost/product-backend/contact.php", form)
            .then(response => {
                setResponseMsg(response.data.message); // Show success message
                setForm({ name: "", email: "", message: "" }); // Clear form fields
            })
            .catch(error => console.error("Error submitting form:", error));
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Contact Us</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 shadow-sm">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Your Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    className="form-control" 
                                    placeholder="Enter your name" 
                                    value={form.name} // Bind value to state
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Your Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    className="form-control" 
                                    placeholder="Enter your email" 
                                    value={form.email} // Bind value to state
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Your Message</label>
                                <textarea 
                                    name="message" 
                                    className="form-control" 
                                    rows="4" 
                                    placeholder="Enter your message" 
                                    value={form.message} // Bind value to state
                                    onChange={handleChange} 
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Send Message</button>
                        </form>
                        {responseMsg && <p className="alert alert-success mt-3">{responseMsg}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;

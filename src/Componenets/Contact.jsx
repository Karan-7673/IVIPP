import React, { forwardRef, useRef, useState } from 'react';
import contactus from "../assets/contact-us.jpg"
// import ReCAPTCHA from 'react-google-recaptcha';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'
import Mainmap from "./Map/Mainmap";
import Navbar from './Navbar';

const Contact = forwardRef((props, ref) => {
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const recaptchaRef = useRef(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleRecaptchaChange = (value) => {
        setRecaptchaValue(value);
    };
    const notify = () => toast("Wow so easy!");

    const initialData = {
        name: '',
        mobile: '',
        email: '',
        message: '',
        photo: null,
    };

    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({ ...prevState, [name]: value }));
        setErrors((prevState) => ({ ...prevState, [name]: '' }));



        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setErrors((prevState) => ({ ...prevState, [name]: 'Enter a valid email address' }));
            }
        }
    };

    const formSubmit = async (formData) => {
        const formPayload = new FormData();
        formPayload.append('first_name', formData.name);
        formPayload.append('email', formData.email);
        formPayload.append('phone', formData.mobile);
        formPayload.append('attachment', formData.photo);
        formPayload.append('note', formData.message);
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}api/v1/public/contact-us`, {
                method: 'POST',
                body: formPayload,
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            console.log(data);
            // toast.success("Thank You for your contact");
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    const handlePhoneChange = (value) => {
        setFormData(prevState => ({
            ...prevState,
            mobile: value,
        }));
    };

    const handlePhotoChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };
    const validateForm = () => {
        let newErrors = {};
        if (!formData.mobile || !isPossiblePhoneNumber(formData.mobile)) newErrors.mobile = 'Valid phone number is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!validateForm()) {
                toast.error('Please enter a valid phone number');
            }
            // if (!recaptchaValue) {
            //     toast.error('Please complete the reCAPTCHA');
            //     setIsLoading(false);
            //     return;
            // }

            // Validate the form data again before submitting
            let hasError = false;
            Object.keys(formData).forEach((key) => {

                if (key !== 'photo' && !formData[key]) {
                    setErrors((prevState) => ({ ...prevState, [key]: `Please enter ${key}` }));
                    hasError = true;
                }
            });
            if (hasError) {
                setIsLoading(false);
                return;
            }
            await formSubmit(formData);
            setIsSubmitted(true);
            toast.success('Thank you for contacting us, We will reach back to you very soon!',
                {
                });
            console.log("Success")
            setFormData(initialData);
            setRecaptchaValue(null);
            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
            }
        } catch (error) {
            // toast.error('Error submitting form: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="py-5" >
                <Mainmap />
            </div>
            <div className="bg-light " id='contact-us' ref={ref}>
                <div className=" container">
                    <div className=' py-5 '>
                        <div className='row justify-content-center'>
                            <div className='col-lg-5   col-md-8 d-flex align-items-center'>
                                <img src={contactus} alt="" className="w-100 rounded-3 " />
                            </div>
                            <div className='col-lg-5 col-md-10 pt-3 mx-2'>
                                <h1 className='text-green'>Get In Touch <span className='text-black'> With Us </span></h1>
                                <p className='fw-semibold'>
                                    Contact iVipp, we can link you with our growing list of lifestyle service providers
                                </p>
                                <form onSubmit={handleSubmit}>
                                    <div className="d-flex flex-column py-1">
                                        <label className="fs-7" htmlFor="name">
                                            Name:
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="p-1 border rounded"
                                            required
                                        />
                                        {errors.name && <p className="text-danger">{errors.name}</p>}
                                    </div>
                                    <div className="py-1 d-flex flex-column">
                                        <label className="fs-7" htmlFor="email">
                                            Email:
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}

                                            onChange={handleChange}
                                            className=" border p-1 rounded"
                                            required
                                        />
                                        {errors.email && <p className="text-danger">{errors.email}</p>}
                                    </div>
                                    <div className="py-1 d-flex flex-column ">
                                        <label className="fs-7" htmlFor="mobile">
                                            Mobile Number:
                                        </label>

                                        <PhoneInput
                                            placeholder=""
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handlePhoneChange}
                                            className={`p-2 rounded phone-input-box  ${errors.mobile ? 'is-invalid' : ''}`}
                                        />
                                        {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}

                                    </div>
                                    <div className="py-1 d-flex flex-column">
                                        <label className="fs-7  " htmlFor="message">
                                            Message:
                                        </label>
                                        <textarea
                                            name="message"
                                            id="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className=" border p-1 rounded"
                                            required
                                        />
                                        {errors.message && <p className="text-danger">{errors.message}</p>}
                                    </div>
                                    {/* 
                            <div className="">
                                <ReCAPTCHA
                                    sitekey={import.meta.env.VITE_GOOGLE_CAPTCHA_KEY} // Replace with your reCAPTCHA site key
                                    onChange={handleRecaptchaChange}
                                    ref={recaptchaRef}
                                />
                                {errors.recaptcha && <p className="text-danger">{errors.recaptcha}</p>}
                            </div> */}
                                    <div className="d-flex justify-content-start py-3 ">
                                        <button type="submit" className=" btn btn-green border px-4" disabled={isLoading}>
                                            {isLoading ? 'Loading...' : 'Submit'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </>
    )
})
export default Contact;


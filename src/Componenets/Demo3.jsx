import Navbarimg from "../assets/logo.png";
import "regenerator-runtime/runtime";
import React, { useEffect, useState, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';
import { FaVolumeUp } from "react-icons/fa";
import { FaRegCircleStop } from "react-icons/fa6";
import { IoCopy } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import headerimage from "../assets/logo.png";
import { FcIdea } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import voiceimage from "../assets/mic-image.png"
import { MdKeyboardVoice } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { FcAssistant } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import axios from 'axios';

const Navbar = ({ section1Ref }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const targetRef = useRef(null);
    const [isListening, setIsListening] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [permissionDenied, setPermissionDenied] = useState(false);
    const timeoutRef = useRef(null);
    const [isActive, setIsActive] = useState(true);
    const [displayText, setDisplayText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [voiceIndex, setVoiceIndex] = useState(null);
    const [voices, setVoices] = useState([]);
    const [isCopyDisabled, setIsCopyDisabled] = useState(false);
    const [ishandlecard, setIshandlecard] = useState(false);
    const { speak, cancel, voices: availableVoices } = useSpeechSynthesis(true);
    const [manualTranscript, setManualTranscript] = useState('');
    const navigate = useNavigate();
    // const [speechResponse, setSpeechResponse] = useState('How can I help you?');
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY
    const cx = import.meta.env.VITE_APP_GOOGLE_CX;

    const handleNavLinkClick = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const OFFSET = 50; // Adjust this value to the desired space in pixels

        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: targetPosition - OFFSET,
                behavior: 'smooth',
            });

            if (targetRef.current && targetRef.current.classList.contains('show')) {
                targetRef.current.classList.remove('show');
            }
        }
    };
    const handleNavLinkClickHome = (e) => {

        if (targetRef.current && targetRef.current.classList.contains('show')) {
            targetRef.current.classList.remove('show');
        }
    };

    const handleClickOutside = (event) => {
        if (targetRef.current && !targetRef.current.contains(event.target)) {
            targetRef.current.classList.remove('show');
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMicrophone = () => {
        if (isListening) {
            stopListening();
            console.log('Microphone disable')
        } else {
            startListening();
            setIsSpeaking(false);
            console.log('Microphone enable')
        }
    };

    useEffect(() => {
        checkMicrophonePermissions();
    }, []);

    useEffect(() => {
        if (transcript.toLowerCase().includes("hello") && !isListening) {
            handleOpenModal();
            const responseText = 'How can I help you?';
            handleSpeechResponse(responseText);
        }
    }, [transcript]);

    // useEffect(() => {
    //     if (transcript.toLowerCase().includes("hello IV") && !isListening) {
    //         handleOpenModal();
    //         const responseText = 'How can I help you?';
    //         handleSpeechResponse(responseText);
    //     }
    // }, [transcript]);

    const checkMicrophonePermissions = async () => {
        try {
            const permissionStatus = await navigator.permissions.query({ name: "microphone" });
            if (permissionStatus.state === "denied") {
                setPermissionDenied(true);
            } else {
                // SpeechRecognition.startListening({ continuous: true });
            }
        } catch (error) {
            console.error("Error checking microphone permissions:", error);
        }
    };

    useEffect(() => {
        if (availableVoices.length > 0) {
            setVoices(availableVoices);
            const defaultVoiceIndex = 6; // Or whatever logic you want
            if (availableVoices.length > defaultVoiceIndex) {
                setVoiceIndex(defaultVoiceIndex);
            }
        }
    }, [availableVoices]);



    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true });
        setIsListening(true);
        // if (handleOpenModal === true) {
        //     setIsSpeaking(true)
        //     console.log("setIsSpeaking true");
        // } else {
        //     setIsSpeaking(false);
        //     console.log("setIsSpeaking false");
        // }
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        setIsListening(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setIsListening(true);
        setIsSpeaking(true);
        resetTranscript();
        setIsActive(!isActive);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // setIsListening(false);
        setIsSpeaking(false);
        resetTranscript();
        cancel();
        console.log("close model");
        // setIsActive(isActive);
    };


    const handleSpeechResponse = (text) => {
        if (!voices.length || voiceIndex === null) return;
        const voice = voices[voiceIndex];
        // stopListening();
        setIsSpeaking(true);
        speak({ text, voice });
        setDisplayText(text);
        setCurrentIndex(0);
        setIsActive(true);
        // setIsListening(false);
        let index = 0;
        const interval = setInterval(() => {
            setCurrentIndex(index);
            index += 1;
            if (index >= text.length) {
                clearInterval(interval);
                setIsSpeaking(false);
                setIsActive(false);
                // startListening();
            }
        }, 75);
    };

    // useEffect(() => {
    //     handleSpeechResponse(speechResponse);
    // }, [speechResponse]);


    const handleCommand = (command) => {
        let responseText = '';
        switch (command.toLowerCase()) {
            case 'hello':
            case 'hello IVIPP':
            case 'hello iv':
            case 'hello ivipp':
                handleOpenModal();
                responseText = 'How can I help you?';
                break;
            // case 'hello iv':
            //     handleOpenModal();
            //     responseText = 'How can I help you?';
            //     break;
            case 'hello hello':
                handleOpenModal();
                responseText = 'How can I help you?';
                break;
            case 'how are you':
                responseText = 'I am fine';
                break;

            case 'okay':
                responseText = 'Perfect';
                break;

            case 'what is ivipp':
            case 'what is iv ipp':
            case 'what is iv bpp':
                responseText = 'iVipp is the Ultimate Lifestyle Management resource, providing you with the best global bespoke concierge services.';
                break;

            case 'book a table':
                responseText = 'here you can book a table';
                setTimeout(() => {
                    navigate('/table-reservation');
                }, 1000);
                // handleCloseModal();
                break;

            case 'i want to book a car':
                responseText = 'Here you can book a car.';
                break;

            case 'go to contact section':
                responseText = 'Here is your contact section';
                setTimeout(() => {
                    section1Ref.current.scrollIntoView({ behavior: 'smooth' })
                }, 1000);
                handleCloseModal();
                break;

            case 'what are the membership benefits':
                responseText = 'Here are the membership benefits: 1) IVIPP PERKS, 2) TRIPS AND EVENTS, 3) TABLE RESERVATIONS MADE EASY.';
                break;

            case 'what is perrks':
                responseText = '';
                break;

            case 'go to homepage':
            case 'hoempage':
                // case 'go to homepage':
                responseText = 'moving To homepage';
                setTimeout(() => {
                    navigate('/');
                }, 1000);
                // handleCloseModal();
                break;

            case 'go to trips and event page':
            case 'go to trip and event page':

                responseText = 'moving trip and events page';
                setTimeout(() => {
                    navigate('/trips-and-events');
                }, 1000);
                // handleCloseModal();
                break;

            case 'stop ip':
            case 'stop iv':
            case 'stop IV':
            case 'stop':
                handleCloseModal();
                resetTranscript();
                break;
            default:
                responseText = 'Here are Some best Results';
                fetchGoogleSearchResults(command);
                setIsSpeaking(false);
                break;
        }
        handleSpeechResponse(responseText);
        // setSpeechResponse(responseText);
        console.log(responseText);
        // setIsActive(!isActive);
    };



    // console.log(import.meta.env.VITE_APP_GOOGLE_API_KEY);

    const fetchGoogleSearchResults = async (query) => {
        try {
            const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`);
            const data = await response.json();
            if (data.items) {
                setSearchResults(data.items);
                setSearchQuery(query);
                setIsSpeaking(false);
            } else {
                setSearchResults([]);
                setSearchQuery(query);
                setIsSpeaking(false);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
            setSearchQuery(query);
        }
    };



    useEffect(() => {
        if (isListening && transcript) {
            timeoutRef.current = setTimeout(() => {
                handleCommand(transcript);
                resetTranscript();
                setManualTranscript('');
                setSearchResults([])
            }, 1000);
        }
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [isListening, transcript]);

    const toggleSpeech = () => {
        if (isSpeaking) {
            cancel();
            // setIsSpeaking(false);
        } else {
            if (displayText.trim() !== '') {
                handleSpeechResponse(displayText);
            }
        }
    };

    // const copyToClipboard = () => {
    //     navigator.clipboard.writeText(displayText)
    //         .then(() => {
    //             setIsCopyDisabled(true);
    //             setTimeout(() => {
    //                 setIsCopyDisabled(false);
    //             }, 3000);
    //         })
    //         .catch(err => {
    //             console.error('Failed to copy text: ', err);
    //         });
    // };

    const formatText = (text, currentIndex) => {
        return text.split('').map((char, index) => (
            <span key={index} style={{ fontWeight: index <= currentIndex ? 'bold' : 'normal' }}>
                {char}
            </span>
        ));
    };
    const handleCardClick = (command, event) => {
        setManualTranscript(command);
        event.stopPropagation();
        handleCommand(command);
        setIshandlecard(false);

    };
    const handleCopy = () => {
        const resultsText = searchResults
            .slice(0, 5) // Ensure only the first 5 results are copied
            .map(item => `${item.title}\n${item.link}`)
            .join('\n\n');

        navigator.clipboard.writeText(displayText + resultsText)
            .then(() => {
                setIsCopyDisabled(true);
                setTooltipVisible(true);
                setTimeout(() => {
                    setTooltipVisible(false);
                    setIsCopyDisabled(false);
                }, 3000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };

    // console.log(isModalOpen);
    // console.log(isSpeaking)
    return (
        <>
            <nav className={`navbar p-0 navbar-expand-lg position-absolute-navbar top-0 sticky-top ${scrollPosition > 0 ? 'bg-white' : 'bg-black1'}`}>
                <nav className="navbar bg-body-tertiary"></nav>
                <div className="container-fluid   px-4 py-2 py-md-2">
                    <a className="navbar-brand d-inline d-lg-none" href="#">
                        <img src={Navbarimg} alt="Image-navs" width="50px" />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon text-white"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center text-white " id="navbarNav" ref={targetRef}>
                        <ul className="navbar-nav py-1 text-white">
                            <li className={`nav-item px-2`}>
                                <a href="#" className="">
                                    <span
                                        className={`nav-link text-decoration textunderline  ${scrollPosition > 0 ? 'text-black ' : 'text-white text-hover-green'} fs-6  fw-medium 
                                        `}
                                        onClick={handleNavLinkClickHome}
                                    >
                                        HOME
                                    </span>
                                </a>
                            </li>

                            <li className="nav-item px-2">
                                <a href="#aboutus" className={`nav-link  textunderline ${scrollPosition > 0 ? 'text-black' : 'text-white'}  fs-6  fw-medium button-hover-red `} onClick={handleNavLinkClick}>ABOUT</a>
                            </li>
                            <li className="nav-item px-2 ">
                                <a href="#services" className={`nav-link    ${scrollPosition > 0 ? 'text-black' : 'text-white'}  fs-6 textunderline fw-medium button-hover-red `}
                                    onClick={handleNavLinkClick}>SERVICES</a>
                            </li>
                            <div className="d-none d-lg-inline px-5">
                                <a className="navbar-brand px-5" href="#">
                                    <img src={Navbarimg} alt="Image-navs" width="100px" />
                                </a>
                            </div>

                            <li className={`nav-item px-2 `}>
                                <a href="#Plan"
                                    onClick={handleNavLinkClick}
                                    className={`nav-link    ${scrollPosition > 0 ? 'text-black' : 'text-white'}  textunderline fs-6 fw-medium button-hover-red `}
                                >
                                    PLANS
                                </a>
                            </li>
                            <li className="nav-item px-2 ">
                                <a href="#review"
                                    className={`nav-link    ${scrollPosition > 0 ? 'text-black' : 'text-white'}  textunderline fs-6 fw-medium button-hover-red `}
                                    onClick={handleNavLinkClick}
                                >
                                    REVIEWS
                                </a>
                            </li>
                            <li className="px-2 m-lg-auto my-1 ">
                                <a href="#contact-us"
                                    onClick={handleNavLinkClick}
                                    className={`nav-link  textunderline    ${scrollPosition > 0 ? 'text-black' : 'text-white'}  fs-6 fw-medium button-hover-red `}
                                >
                                    CONTACT
                                </a>
                            </li>


                            <div className="position-voice-search py-1 " onClick={toggleMicrophone}>
                                <div className="py-1 bg-white px-2 border-radius-50" data-toggle="tooltip" data-placement="left bottom" title="Say Hello IV" >
                                    <img src={voiceimage} alt="" className="img-fluid" width={"15px"} />
                                </div>
                                {/* <button className="text-danger bg-white rounded-2 fs-4"><MdKeyboardVoice /></button> */}
                            </div>

                        </ul>




                        <Modal show={isModalOpen} >
                            <Modal.Header className="border-0 p-1 d-flex bg-light">
                                <div className="d-flex w-50 py-3  ps-2">
                                    <img src={headerimage} alt="header-image" width={"60px"} />
                                </div>
                                <div className="fs-4 d-flex w-50  pe-2 justify-content-end">
                                    <IoMdClose onClick={handleCloseModal} className="cursor-pointer" />
                                </div>
                            </Modal.Header>
                            {permissionDenied ? (
                                <p className="text-center d-flex justify-content-center">Please allow microphone access in your browser settings.</p>
                            ) : (
                                <Modal.Body>
                                    <div className='container-fluid'>
                                        <div className='row justify-content-center'>
                                            <div className='h-100px justify-content-center d-flex col-md-12'>
                                                <div id="bars" className={isActive ? 'active' : ''}>
                                                    {[...Array(5)].map((_, i) => (
                                                        <div key={i} className="bar"></div>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className='h-20px text-center'>{transcript || manualTranscript}</p>

                                            <div className="position-voice-relative">
                                                <div className="">
                                                    <label htmlFor="voice">Voice:</label>
                                                    <select
                                                        id="voice"
                                                        value={voiceIndex}
                                                        onChange={(e) => setVoiceIndex(e.target.value)}
                                                        className='mx-2 w-75'
                                                    >
                                                        {/* <option value={voices}>Default</option> */}
                                                        {voices.map((voice, index) => (
                                                            <option key={voice.voiceURI} value={index}>
                                                                {voice.name} ({voice.lang})
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div>

                                            </div>
                                        </div>
                                        <div className='text-center '>
                                            {/* <p className="text-center pt-2">{isActive ? 'Listening...' : ' '}</p> */}
                                            <div className="row text-start  py-2">
                                                <div className="col-md-12"
                                                    style={{ whiteSpace: 'pre-wrap', outline: 'none', border: '1px solid #ddd', padding: '5px', maxHeight: '186px', overflowY: "auto", minHeight: "185px" }}
                                                > <FcAssistant /> {formatText(displayText, currentIndex)}
                                                    <ul>
                                                        {searchResults.slice(0, 5).map((item, index) => (
                                                            <li key={index}>
                                                                <a href={item.link} target="_blank" rel="noopener noreferrer" >
                                                                    {item.title}
                                                                </a>
                                                                <p>{item.snippet}</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    {/* <p className="">{transcript} </p> */}
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center ">
                                                <button className="mx-2 bg-white border-0 fs-5 cursor-pointer hover-bg-light" data-toggle="tooltip" data-placement="bottom" title="Sound" onClick={toggleSpeech} disabled={isSpeaking}
                                                    id="isSpeaking">
                                                    {isSpeaking ? <FaRegCircleStop /> : <FaVolumeUp />}
                                                </button>
                                                {/* <button className="mx-2 bg-white border-0 fs-5 hover-bg-light " data-toggle="tooltip" data-placement="bottom" title="Copy" onClick={copyToClipboard}>
                                                    {
                                                        isCopyDisabled ? <FaCheck /> : <IoCopy />
                                                    }
                                                </button> */}
                                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                                    <button
                                                        className="mx-2 bg-white border-0 fs-5 hover-bg-light"
                                                        data-toggle="tooltip"
                                                        data-placement="bottom"
                                                        title="Copy"
                                                        onClick={handleCopy}
                                                        disabled={isCopyDisabled}
                                                    >
                                                        {isCopyDisabled ? <FaCheck /> : <IoCopy />}
                                                    </button>
                                                    {tooltipVisible && (
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '5px',
                                                            left: '90%',
                                                            // transform: 'translateX(-50%)',
                                                            backgroundColor: '#000000',
                                                            color: '#e0e7eb',
                                                            textAlign: 'center',
                                                            fontSize: "10px",
                                                            padding: '5px 0px',
                                                            zIndex: '1',
                                                            width: '50px',
                                                        }}>
                                                            Copied
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container">
                                        <div className='row py-1 justify-content-center '>

                                            <h5 className='text-center'>Try Saying :</h5>

                                            <div className="col-md-12 row row-cols-lg-1 h-200px custom-scrollbar">
                                                <div className="col py-1 cursor-pointer" onClick={(event) => handleCardClick('What is ivipp', event)}
                                                    disabled={ishandlecard}>
                                                    <div className='border shadow d-flex align-content-center justify-content-center py-2 '>
                                                        <div className="fs-5 d-flex">
                                                            <FcIdea />
                                                        </div>
                                                        <div className="text-center align-content-center align-items-center">
                                                            <p className="m-0 ">What is ivipp</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col py-1 cursor-pointer" onClick={(event) => handleCardClick('what are the membership benefits', event)}
                                                    disabled={ishandlecard}>
                                                    <div className='border shadow d-flex align-content-center justify-content-center py-2 '>
                                                        <div className=" fs-5 d-flex">
                                                            <FcIdea />
                                                        </div>
                                                        <div className="text-center align-content-center align-items-center">
                                                            <p className="m-0">what are the membership benefits</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col py-1 cursor-pointer" onClick={(event) => handleCardClick('go to trips and event page', event)}
                                                    disabled={ishandlecard}>
                                                    <div className='border shadow d-flex align-content-center justify-content-center py-2 '>
                                                        <div className="px-1 fs-5 d-flex">
                                                            <FcIdea />
                                                        </div>
                                                        <div className="text-center align-content-center align-items-center">
                                                            <p className="m-0 ">Go to trips and event page</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col py-2 cursor-pointer" onClick={(event) => handleCardClick('go to contact section', event)}
                                                    disabled={ishandlecard}>
                                                    <div className='border shadow d-flex align-content-center justify-content-center py-2 '>
                                                        <div className="px-1 fs-5 d-flex">
                                                            <FcIdea />
                                                        </div>
                                                        <div className="text-center align-content-center align-items-center">
                                                            <p className="m-0 ">Go to contact section</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col py-2 cursor-pointer" onClick={(event) => handleCardClick('book a table', event)}
                                                    disabled={ishandlecard}>
                                                    <div className='border shadow d-flex align-content-center justify-content-center py-2 '>
                                                        <div className="px-1 fs-5 d-flex">
                                                            <FcIdea />
                                                        </div>
                                                        <div className="text-center align-content-center align-items-center">
                                                            <p className="m-0 ">Book a table</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col py-2 cursor-pointer" onClick={(event) => handleCardClick('what is perks', event)}
                                                    disabled={ishandlecard}>
                                                    <div className='border shadow d-flex align-content-center justify-content-center py-2 '>
                                                        <div className="px-1 fs-5 d-flex">
                                                            <FcIdea />
                                                        </div>
                                                        <div className="text-center align-content-center align-items-center">
                                                            <p className="m-0 ">what is perks</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </Modal.Body>
                            )}
                        </Modal>
                    </div>
                </div>
            </nav >
        </>
    );
}
export default Navbar;
import React, { useEffect } from 'react';
import Typed from 'react-typed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import '../css/skills.css';
import { Container, Row, Col } from 'react-grid-system';
import NextSection from '../components/nextSection';

function Skills() {

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return(
        <div className="container skills">

            <div className="landing">
                <img src={require('../images/profile.png')} alt="profile"/>
                <span id="typed">
                    <p>Hi I'm YuYing, a</p>
                    <Typed
                        strings={[
                            'Software Engineer',
                            'Full-Stack Developer',
                            'Student Innovator',
                            'Mobile App Developer'
                        ]}
                        typeSpeed={90}
                        backSpeed={50}
                        loop
                    />
                </span>
            </div>

            <div className="skills-section">
                <h2> Here are some things I can do: </h2>
                <ul className="example-skills large">
                    <li>
                        Program robust backend services in <u>Java</u>
                    </li>
                    <li>
                        Build a Robot <span role="img" aria-label="robot">🤖</span>
                        using <u>3D-modelling in Fusion 360, Arduino and C</u>
                    </li>
                    <li>
                        Make a Web App with <u>React and Angular JS</u>
                    </li>
                    <li>
                        Code up a Slackbot in <u>Python</u>
                    </li>
                    <li>
                        Create a REST API with <u>Javascript or Flask</u>
                    </li>
                    <li>
                        Design Websites and Apps in <u>Figma</u>
                    </li>
                </ul>
            </div>
            
            <div className="skills-section">
                <Container>
                    <Row>
                        <Col lg={7}>
                            <h3> Programming Languages </h3>
                            <div id="gradient"/>
                            <ul className="example-skills small">
                                <li> Java, Python </li>
                                <li> JavaScript, PHP, HTML & CSS </li>
                                <li> SQL & Relational Databases</li>
                                <li> Node, NPM, React </li>
                                <li> C & C++ </li>
                                <li> Angular </li>
                                <li> Assembly & Verilog </li>
                                <li> ROS & SLAM </li>
                            </ul>
                        </Col>
                        <Col lg={5}>
                            <h3> Skills </h3>
                            <ul className="example-skills small">
                                <li> Creating Websites and PWAs </li>
                                <li> Website and App  Mockups </li>
                                <li> Engineering Design </li>
                                <li> 3D modelling and CAD </li>
                                <li> Arduino Hardware & Programming </li>
                                <li> Cloud Development </li>
                            </ul>
                            <a id="resume" href={require('../util/Resume.pdf')} download="resume">
                                Resume 
                                <FontAwesomeIcon icon={faAngleDown}/>
                            </a>
                        </Col>
                    </Row>
                </Container>
                <br/><br/><br/><br/>
            </div>
            <NextSection 
                    image="projects.jpg"
                    nextSection="Projects"
                    caption="Have a look at what I've done in the past"/>
        </div>
    );
}

export default React.memo(Skills);

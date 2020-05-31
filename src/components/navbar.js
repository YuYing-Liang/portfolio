import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

function NavBar() {
    return(
        <nav>
            <ul className="icons">
                <li id="skills">
                    <Link to="/portfolio">
                        <p className="nav-page">skills</p>
                        <div className="icon">
                            <FontAwesomeIcon icon={faCode}/>
                        </div>
                    </Link>
                </li>
                <li id="work">
                    <Link to="/portfolio/work">
                        <p className="nav-page">projects</p>
                        <div className="icon">
                            <FontAwesomeIcon icon={faLaptop}/>
                        </div>
                    </Link>
                </li>
                <li id="game">
                    <Link to="/">
                        <p className="nav-page">game</p>
                        <div className="icon">
                            <FontAwesomeIcon icon={faGamepad}/>
                        </div>
                    </Link>
                </li>
                <li id="contact">
                    <AnchorLink href="#footer">
                        <p className="nav-page">contact</p>
                        <div className="icon">
                            <FontAwesomeIcon icon={faPhone}/>
                        </div>
                    </AnchorLink>
                </li>
            </ul>
        </nav>
    );
}

export default React.memo(NavBar)

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faCodepen } from '@fortawesome/free-brands-svg-icons';
import '../css/footer.css';

function Footer(){
    return(
        <footer id="footer">
            <p> want to work together? let's get in touch: </p>
            <ul className="socials">
                <li>
                    <a href="https://www.linkedin.com/in/yuying-liang/">
                        <FontAwesomeIcon icon={faLinkedin}/>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/yuying-liang">
                        <FontAwesomeIcon icon={faGithub}/>
                    </a>
                </li>
                <li>
                    <a href="mailto:yuying.liang00@gmail.com">
                        <FontAwesomeIcon icon={faEnvelope}/>
                    </a>
                </li>
                <li>
                    <a href="https://codepen.io/yuying-liang/">
                        <FontAwesomeIcon icon={faCodepen}/>
                    </a>
                </li>
            </ul>
        </footer>
    );
}
export default React.memo(Footer)
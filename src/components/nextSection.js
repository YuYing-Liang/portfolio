import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

function NextSection (props){
    return(
        <div className="next-section">
            <a href="/portfolio/work">
                <img src={require('../images/' + props.image)} alt={props.nextSection}/>
                <div className="text">
                    <h1>{props.nextSection}</h1>
                    <p>
                        {props.caption}
                        <FontAwesomeIcon icon={faLongArrowAltRight}/>
                    </p>
                </div>
            </a>
        </div>
    );
}

export default React.memo(NextSection);
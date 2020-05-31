import React, {useState, useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import works from '../util/work.json';
import '../css/work.css';
import Project from '../components/project';

function Work() {
    const projectWidth = 300;
    const buffer = 22;
    let maxLeft = useRef((works.length-2) * projectWidth);
    let workConWidth = useRef(1000);
    // let [cardWidth, setCardWidth] = useState(300);
    let [leftMargin, setLeftMargin] = useState(0);
    let [workObj, setWorkObj] = useState(works[0]);
    let [closeDisplay, setCloseDisplay] = useState("none");

    useEffect(() => {
        window.scrollTo(0, 0)
        workConWidth.current = document.getElementById("workList").clientWidth;
        maxLeft.current =  (works.length - 1 - Math.floor(workConWidth.current/projectWidth)) * projectWidth + (works.length * buffer);
    }, [workConWidth, projectWidth]);

    let cnt = 0;
    let work = (works != null || works !== []) ? 
        works.map(w => {
            cnt++;
            return <Project 
                size="small"
                workObj = {w}
                key={cnt}
                index={cnt}
                maximize={maximize}
            />
        }) : <div/>
        
    function scrollRight() {
        if(leftMargin <= 0 && Math.abs(leftMargin) <= maxLeft.current){
            setLeftMargin(leftMargin - projectWidth - buffer);
        }
    }

    function scrollLeft() {
        if(Math.abs(leftMargin) > 0 && leftMargin + projectWidth + buffer <= 0){
            setLeftMargin(leftMargin + projectWidth + buffer);
        }
    }

    function maximize(e){
        console.log(e.target);
        setWorkObj(works[parseInt(e.target.name) - 1]);
        setCloseDisplay("block");
    }

    function close(){
        setCloseDisplay("none");
    }

    return(
        <div className="container work">
            <p id="blah"></p>
            <h1>Projects</h1>
            <p>Check out some of my most recent work</p>
            <div className="work-carousel-container">
                <Project workObj={workObj} style={{display: closeDisplay}}/>

                <button className="scroll-buttons" id="left" onClick={scrollLeft}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <div className="carousel-container">
                    <ul id="workList" style={{marginLeft: leftMargin}}>
                        {work}
                    </ul>
                </div>
                <button className="scroll-buttons" id="right">
                    <FontAwesomeIcon icon={faAngleRight} onClick={scrollRight}/>
                </button>

                <button id="close" style={{display: closeDisplay}}>
                    <FontAwesomeIcon icon={faTimes} onClick={close}/>
                </button>
            </div>
        </div>
    );
}

export default React.memo(Work)

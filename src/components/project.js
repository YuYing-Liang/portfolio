import React from 'react'
import { Container, Row, Col } from 'react-grid-system';

export default function Project (props) {
    let obj = props.workObj;
    console.log(obj);
    let image = (obj.image != null && obj.image !== "") ? <img name={props.index} className="proj-img" src={require('../images/' + obj.image)} alt={obj.title}/> : <span/>;

    if(props.size === "small") {
        return (
            <li className="project">
                {image}
                <div className="work-text">
                    <h2> {obj.title} </h2>
                    <p> {obj.subtitle} </p>
                    <p className="date"> {obj.date} </p>
                    <button onClick={props.maximize} name={props.index}>Read more</button>
                </div>
            </li>
        );
    } else {
        let skills = obj.skills.join(", ");
        let website = (obj.website != null && obj.website !== "") ? <a href={obj.website}><h3>visit website</h3></a> : <span/>;

        return (
            <div className="max-project" style={props.style}>
                {image}
                <div className="max-proj-text">
                    <Container>
                        <Row>
                            <Col lg={6}>
                                <h2> {obj.title} </h2>
                                <p className="date"> {obj.date} </p>
                                <p> {obj.des} </p>
                            </Col>
                            <Col lg={5}>
                                <h3> Technologies used </h3>
                                <p> {skills} </p>

                                <h3> Experience in Emojis </h3>
                                <p> {obj.rating} </p>

                                {website}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}
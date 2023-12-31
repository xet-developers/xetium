import React, {useContext, useState} from 'react';
import Styles from "../../styles/navMenu.module.css";
import dot from "../../images/Ellipse.svg";
import {Link} from "react-router-dom";
import plus from "../../images/icon-plus.svg";
import {UserProjectsContext} from "../../contex/CurrentProject";

const MyProject = ({setModal}) => {
    const {userProjects, setProjects} = useContext(UserProjectsContext)
    return (
        <div>
            <div className={Styles.empty}/>
            <ul className={Styles.list}>
                {userProjects.map(project =>
                    <li key={project.name} className={Styles.listItem}>
                        <img src={dot} alt={""}/>
                        <Link to={project.name}>
                            <span>{project.name}</span>
                        </Link>
                    </li>)}

                <li className={Styles.AddProject}>
                    <img src={plus} alt={""}/>
                    <span onClick={() => {
                        setModal(true)
                    }}>Добавить проект</span>
                </li>
            </ul>
        </div>
    );
};

export default MyProject;
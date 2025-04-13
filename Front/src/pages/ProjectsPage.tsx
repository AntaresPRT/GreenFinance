import {Grid} from "@mui/joy";
import {Header} from "../component/Header";
import {ProjectCard} from "../component/ProjectCard";
import {useEffect, useState} from "react";
import {Project} from "../dto/Project";
import {getConfig} from "../config";

export const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);

    const config = getConfig();

    useEffect(() => {
        fetch(config.apiUrl + `/project-service/projects/all`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProjects(data);
            })
            .then(data => {
                console.log(projects);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <Grid container
              gap={2}
              alignItems="center"
              alignContent="center"
              justifyContent="center">
            <Grid xs={12} sm={12} mt={8}>
                <Header/>
            </Grid>
            <Grid container xs={12} sm={12}>
                {projects.map((project: Project) => (
                    <Grid md={3} xs={12} sm={12} p={1}>
                        <ProjectCard project={project}/>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};
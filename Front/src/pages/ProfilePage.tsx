import {Avatar, Button, CardContent, Grid, Stack, Typography} from "@mui/joy";
import {Header} from "../component/Header";
import Card from "@mui/joy/Card";
import {ProjectCard} from "../component/ProjectCard";
import {CompanyCard} from "../component/CompanyCard";
import {useEffect, useState} from "react";
import {AddOrganisation} from "../component/AddOrganisation";
import {Add} from "@mui/icons-material"
import {Author} from "../dto/Author";
import {Project} from "../dto/Project";
import {AddProject} from "../component/AddProject";
import {Company} from "../dto/Company";
import {getConfig} from "../config";

export const ProfilePage = () => {
    const [openOrganisation, setOpenOrganisation] = useState(false);
    const [openProject, setOpenProject] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [projects, setProjects] = useState([]);
    const [profile, setProfile] = useState<Author>();

    const config = getConfig();

    useEffect(() => {
        fetch(config.apiUrl + `/user-service/users/profile`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(prof => {
                console.log(prof)
                setProfile(prof);

                fetch(config.apiUrl + `/project-service/projects?authorId=` + prof.id, {
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
                    .catch(error => console.log(error));

                fetch(config.apiUrl + `/project-service/companies?authorId=` + prof.id, {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        setCompanies(data);
                    })
                    .catch(error => console.log(error));

            })
            .catch(error => console.log(error));
    }, [])

    return (
        <Grid container
              gap={2}
              alignItems="center"
              alignContent="center"
              justifyContent="center">
            <Grid xs={12} sm={12} mt={8}>
                <Header/>
            </Grid>
            <Grid xs={12} md={12} sm={12} p={1}>
                <Card variant={'plain'}>
                    <CardContent>
                        <Stack direction="row" spacing={2}>
                            <Avatar size={"lg"}></Avatar>
                            <Stack direction={"column"}>
                                <Typography level={'title-md'}>{profile?.username}</Typography>
                                <Typography level={'body-md'}>{profile?.description}</Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
            <Typography>Мои организации</Typography>
            <Grid xs={12} md={12} sm={12} p={1}>
                <Stack direction={"row"}
                       spacing={2}
                       sx={{
                           alignItems: "center",
                           justifyContent: 'center',
                           alignContent: 'center',
                           overflow: "auto",
                           "&::-webkit-scrollbar": {display: "none",},
                           "-ms-overflow-style": "none",
                           "scrollbar-width": "none",
                       }}>
                    {companies.map((company: Company) => (
                        <CompanyCard company={company}/>
                    ))}
                    <Button onClick={() => {
                        setOpenOrganisation(true)
                    }} startDecorator={<Add/>}
                            variant={'plain'}
                            color={'neutral'}>
                        Создать организацию</Button>
                </Stack>
            </Grid>
            <Typography>Мои проекты</Typography>
            <Grid container xs={12} sm={12}>
                {projects.map((project: Project) => (
                    <Grid md={3} xs={12} sm={12} p={1}>
                        <ProjectCard project={project}/>
                    </Grid>
                ))}
                <Grid md={3} xs={12} sm={12} p={1}>
                    <Button onClick={() => {
                        setOpenProject(true)
                    }} startDecorator={<Add/>}
                            sx={{
                                width: '100%',
                                height: '100%',
                            }}
                            variant={'plain'}
                            color={'neutral'}>
                        Создать проект</Button>
                </Grid>
            </Grid>
            <AddProject open={openProject} onClose={() => setOpenProject(false)}/>
            <AddOrganisation open={openOrganisation} onClose={() => setOpenOrganisation(false)}/>
        </Grid>
    );
};
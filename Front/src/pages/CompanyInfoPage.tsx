import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Grid, Sheet, Stack, Typography} from "@mui/joy";
import {Header} from "../component/Header";
import {Company} from "../dto/Company";
import {getConfig} from "../config";

export const CompanyInfoPage = () => {
    const {organisationId} = useParams();
    const [open, setOpen] = useState<boolean>(false);
    const [organisation, setOrganisation] = useState<Company>();
    const config = getConfig();

    useEffect(() => {
        fetch(config.apiUrl + `/project-service/companies/` + organisationId, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setOrganisation(data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <Grid container
              gap={2}
              alignItems="top"
              alignContent="center"
              justifyContent="center">
            <Grid xs={12} md={12} sm={12} mt={8}>
                <Header/>
            </Grid>
            <Grid container xs={12} md={12} sm={12} p={1}>
                <Grid xs={12} md={12} sm={12}>
                    <Sheet
                        sx={{
                            p: 2,
                            borderRadius: 'lg'
                        }}
                    >
                        <Stack spacing={3}>
                            <Typography level={'title-lg'}>
                                {organisation?.name}
                            </Typography>
                            <Typography level={'body-md'}>
                                Представительское лицо: {organisation?.author.username}
                            </Typography>
                            <div>
                                <Typography level={'title-lg'}>
                                    Контакты для связи
                                </Typography>
                                <Typography>
                                    {organisation?.author.email}
                                </Typography>
                            </div>
                            <div>
                                <Typography level={"title-lg"}>Описание</Typography>
                                <Typography level={"body-md"}>
                                    {organisation?.description}
                                </Typography>
                            </div>
                        </Stack>
                    </Sheet>
                </Grid>
            </Grid>
        </Grid>
    );
};
import {
    Button,
    CardActions,
    CardContent,
    CardOverflow,
    Grid,
    LinearProgress,
    Sheet,
    Stack,
    Typography
} from "@mui/joy";
import {Header} from "../component/Header";
import {useEffect, useState} from "react";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import {InvestingModal} from "../component/InvestingModal";
import {useParams} from "react-router-dom";
import {Project} from "../dto/Project";
import dayjs from "dayjs";
import {Transaction} from "../dto/Transaction";
import {getConfig} from "../config";

export const ProjectInfoPage = () => {
    const {projectId} = useParams();
    const [imgSrc, setImgSrc] = useState('https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286');
    const [open, setOpen] = useState<boolean>(false);
    const [project, setProject] = useState<Project>();
    const [transactions, setTransactions] = useState([])
    const config = getConfig();

    useEffect(() => {
        fetch(config.apiUrl + `/project-service/projects/` + projectId, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setProject(data);
                fetch(config.apiUrl + `/project-service/transactions/project?projectId=` + projectId, {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        setTransactions(data);
                    })
                    .catch(error => console.log(error));
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
            <Grid container xs={12} md={12} sm={12}>
                <Grid xs={12} md={5} sm={12} p={1}>
                    <Card variant={'plain'}>
                        <CardOverflow>
                            <AspectRatio minHeight="120px" maxHeight="300px" ratio={2}>
                                <img
                                    src={imgSrc}
                                    loading="lazy"
                                    alt=""
                                />
                            </AspectRatio>
                        </CardOverflow>
                        <CardContent>
                            <Stack spacing={1}>
                                <Typography level={"h3"}>{project?.title}</Typography>
                                <Typography level={"body-md"}>Заявитель: {project?.author.username}</Typography>
                                <Typography level={"body-md"}>Дата начала
                                    сборов: {dayjs(project?.createdAt!!).toDate().toLocaleString()}</Typography>
                                <Typography level={"body-md"}>Дата окончания
                                    сборов: {dayjs(project?.deadline!!).toDate().toLocaleString()}</Typography>
                            </Stack>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => setOpen(true)}>
                                Инвестировать
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid container xs={12} md={7} sm={12} p={1}>
                    <Grid xs={12} md={12} sm={12}>
                        <Sheet
                            sx={{
                                p: 2,
                                borderRadius: 'lg'
                            }}
                        >
                            <Stack spacing={3}>
                                <div>
                                    <Typography level={"h3"}>Описание</Typography>
                                    <Typography level={"body-md"}>
                                        {project?.description}
                                    </Typography>
                                </div>

                                <div>
                                    <LinearProgress determinate value={
                                        (project?.collectedAmount!! / project?.goalAmount!!) * 100
                                    }></LinearProgress>
                                    <Typography level={"body-sm"}>
                                        Собрано: {project?.collectedAmount} из {project?.goalAmount} ₽
                                    </Typography>
                                </div>
                            </Stack>
                        </Sheet>
                    </Grid>
                    <Grid xs={12} md={12} sm={12} p={1}>
                        <Typography level={"body-sm"}>История транзакций</Typography>
                    </Grid>
                    <Grid container xs={12} md={12} sm={12} gap={2}>
                        {transactions.map((transaction: Transaction) => (
                            <Grid xs={12} md={12} sm={12}>
                                <Sheet
                                    sx={{
                                        p: 2,
                                        borderRadius: 'lg'
                                    }}
                                >
                                    <Stack spacing={2}>
                                        <div>
                                            <Typography level={"body-sm"}>id: {transaction.id}</Typography>
                                            <Typography level={"body-sm"}>сумма: {transaction.amount}</Typography>
                                            <Typography level={"body-sm"}>статус: {transaction.status}</Typography>
                                        </div>

                                        <div>
                                            <LinearProgress determinate value={
                                                (transaction.amount / project?.goalAmount!!) * 100
                                            }></LinearProgress>
                                            <Typography level={"body-sm"}>
                                                : {transaction.amount} из {project?.goalAmount} ₽
                                            </Typography>
                                        </div>
                                    </Stack>
                                </Sheet>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <InvestingModal projectId={project?.id!!}
                            remainAmount={(project?.goalAmount!! - project?.collectedAmount!!)}
                            projectTitle={project?.title!!}
                            open={open}
                            onClose={() => setOpen(false)}/>
        </Grid>
    );
};
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import AspectRatio from '@mui/joy/AspectRatio';
import {Button, CardContent, CardOverflow, LinearProgress} from "@mui/joy";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Project} from "../dto/Project";
import dayjs from "dayjs";

export const ProjectCard = (props: {
    project: Project;
}) => {
    const navigate = useNavigate();
    const [imgSrc, setImgSrc] = useState('https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286');
    return (
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
            <div>
                <Typography level="title-lg">{props.project.title}</Typography>
                <Typography level="body-sm">Дата окончания: {dayjs(props.project.deadline).toDate().toLocaleString()}</Typography>
            </div>
            <LinearProgress determinate value={
                (props.project.collectedAmount / props.project.goalAmount) * 100
            }>
            </LinearProgress>

            <CardContent orientation="horizontal">
                <div>
                    <Typography level="body-xs">Собираемая сумма:</Typography>
                    <Typography sx={{fontSize: 'lg', fontWeight: 'lg'}}>{props.project.goalAmount} ₽</Typography>
                </div>
                <Button
                    onClick={() => {
                        navigate('/project/' + props.project.id);
                    }}
                    sx={{ml: 'auto', alignSelf: 'center'}}
                >
                    Читать
                </Button>
            </CardContent>
        </Card>
    );
};
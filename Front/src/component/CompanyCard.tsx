import {Button, CardActions, CardContent} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import {Company} from "../dto/Company";
import {useNavigate} from "react-router-dom";

export const CompanyCard = (
    props: {
        company: Company;
    },
) => {
    const navigate = useNavigate();
    return (
        <Card variant={'plain'}>
            <CardContent orientation="horizontal" sx={{}}>
                <div>
                    <Typography level="title-lg">{props.company.name}</Typography>
                    <Typography level="body-sm">{props.company.description}</Typography>
                </div>
            </CardContent>
            <CardActions>
                <Button
                    sx={{
                        width: "30vh",
                    }}
                    fullWidth
                    variant={'soft'}
                    onClick={() => {
                        navigate('/organisation/'+props.company.id);
                    }}
                    color={'neutral'}>
                    Читать
                </Button>
            </CardActions>
        </Card>
    );
};
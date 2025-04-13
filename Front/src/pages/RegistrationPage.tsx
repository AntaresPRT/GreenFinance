import {FormEvent, useState} from "react";
import {Button, FormControl, Grid, Input, Sheet, Stack, Textarea, Typography} from "@mui/joy";
import {Header} from "../component/Header";
import {useNavigate} from "react-router-dom";
import {getConfig} from "../config";

export const RegistrationPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [number, setNumber] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const config = getConfig()

    const handleChangeNumber = (e: FormEvent<HTMLInputElement>) => {
        setNumber(e.currentTarget.value)
    }

    const handleChangeDescription = (e: FormEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value)
    }

    const handleChangeEmail = (e: FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const handleChangeUsername = (e: FormEvent<HTMLInputElement>) => {
        setUsername(e.currentTarget.value)
    }

    const handleChangePassword = (e: FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const registration = () => {
        fetch(config.apiUrl+`/user-service/users/register`, {
            method: "POST",
            body: JSON.stringify({
                'username': username,
                'password': password,
                'email': email,
                'number': number,
                'description': description
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log("Registration Success")
                navigate('/login')
            })
            .catch(error => console.log(error));
    }

    return (
        <Grid container
              direction="row"
              gap={25}
              alignItems="center"
              alignContent="center"
              justifyContent="center"
        >
            <Grid md={12} sm={12} xs={12}>
                <Header/>
            </Grid>
            <Grid md={4} sm={12} xs={12} sx={{p: 1}}>
                <Sheet
                    sx={{
                        p: 3,
                        borderRadius: 'lg'
                    }}
                >
                    <Stack direction="column"
                           justifyContent="space-around"
                           spacing={3}
                    >
                        <div>
                            <Typography level="h4" component="h1">
                                <b>Добро пожаловать!</b>
                            </Typography>
                            <Typography level="body-sm">Введите данные для регистрации</Typography>
                        </div>
                        <FormControl>
                            <Input
                                variant={"soft"}
                                value={email}
                                onChange={handleChangeEmail}
                                name="email"
                                type="text"
                                placeholder="Электронная почта"
                                sx={{
                                    boxShadow: 'none',
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                variant={"soft"}
                                value={number}
                                onChange={handleChangeNumber}
                                name="number"
                                type="text"
                                placeholder="Номер телефона"
                                sx={{
                                    boxShadow: 'none',
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                variant={"soft"}
                                value={username}
                                onChange={handleChangeUsername}
                                name="username"
                                type="text"
                                placeholder="Имя пользователя"
                                sx={{
                                    boxShadow: 'none',
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                variant={"soft"}
                                value={password}
                                onChange={handleChangePassword}
                                name="password"
                                type="password"
                                placeholder="Пароль"
                                sx={{
                                    boxShadow: 'none',
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <Textarea
                                variant={"soft"}
                                value={description}
                                name="description"
                                placeholder={"Описание вида деятельности"}
                                sx={{
                                    boxShadow: 'none',
                                }}
                                onChange={handleChangeDescription}/>
                        </FormControl>
                        <Button
                            fullWidth
                            onClick={() => {
                                registration()
                            }}>
                            Зарестрироваться
                        </Button>
                    </Stack>
                </Sheet>
            </Grid>
        </Grid>
    );
};
import {FormEvent, useEffect, useState} from "react";
import {Button, FormControl, Grid, Input, Sheet, Stack, Typography} from "@mui/joy";
import {Header} from "../component/Header";
import {useNavigate} from "react-router-dom";
import {getConfig} from "../config";


export const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const config = getConfig();

    const handleChangeEmail = (e: FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const handleChangePassword = (e: FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const login = (email: string, password: string) => {
        fetch(config.apiUrl + `/user-service/users/login`, {
            method: "POST",
            body: JSON.stringify({'username': email, 'password': password}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("token", data.token)
                console.log("Login Success")
                navigate('/projects')
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
                            <Typography level="body-sm">Авторизируйтесь, чтобы продолжить.</Typography>
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
                        <Stack spacing={1}>
                            <Button fullWidth
                                    onClick={() => {
                                        login(email, password)
                                    }}>
                                Войти
                            </Button>
                            <Button fullWidth
                                    color={"neutral"}
                                    variant={"plain"}
                                    onClick={() => {
                                        navigate('/registration')
                                    }}
                            >
                                Регистрация
                            </Button>
                        </Stack>
                    </Stack>
                </Sheet>
            </Grid>
        </Grid>
    );
};
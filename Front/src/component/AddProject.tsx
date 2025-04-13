import {Alert, Button, Input, Modal, ModalClose, ModalDialog, Stack, Textarea, Typography} from "@mui/joy";
import {CreateProjectRequest} from "../dto/CreateProjectRequest";
import {FormEvent, useState} from "react";
import {AIResponse} from "../dto/AIResponse";
import {OverridableStringUnion} from "@mui/types";
import {ColorPaletteProp} from "@mui/joy/styles/types";
import {TypographyPropsColorOverrides} from "@mui/joy/Typography/TypographyProps";
import {getConfig} from "../config";

export const AddProject = (
    props: {
        open: boolean,
        onClose: () => void;
    }
) => {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [goalAmount, setGoalAmount] = useState<number>(0)
    const [deadline, setDeadline] = useState<string>("")
    const [esgFactors, setEsgFactors] = useState<string>("")

    const config = getConfig();

    const [open, setOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [colorAlert, setColorAlert] = useState<OverridableStringUnion<ColorPaletteProp, TypographyPropsColorOverrides>>('danger')

    const [companyTitle, setCompanyTitle] = useState<string>("")
    const [companyDescription, setCompanyDescription] = useState<string>("")

    const [response, setResponse] = useState<AIResponse>()

    const handleChangeTitle = (e: FormEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const handleChangeDescription = (e: FormEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value)
    }
    const handleChangeGoalAmount = (e: FormEvent<HTMLInputElement>) => {
        setGoalAmount(e.currentTarget.valueAsNumber)
    }
    const handleChangeDeadline = (e: FormEvent<HTMLInputElement>) => {
        setDeadline(e.currentTarget.value)
    }
    const handleChangeEsgFactors = (e: FormEvent<HTMLTextAreaElement>) => {
        setEsgFactors(e.currentTarget.value)
    }

    const handleChangeCompanyTitle = (e: FormEvent<HTMLInputElement>) => {
        setCompanyTitle(e.currentTarget.value)
    }
    const handleChangeCompanyDescription = (e: FormEvent<HTMLTextAreaElement>) => {
        setCompanyDescription(e.currentTarget.value)
    }

    const createProject = (request: CreateProjectRequest) => {
        setIsLoading(true)
        fetch(config.apiUrl + `/project-service/chat`, {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(response => response.json())
            .then(json => {
                setResponse(json)
                if (json.totalScore > 75) {
                    setColorAlert('success')
                }
                setOpen(true)
                setIsLoading(false)
            })
            .catch(error => console.log(error));
    }


    return (
        <Modal open={props.open} onClose={props.onClose}>
            <ModalDialog sx={{
                p: 3,
                borderRadius: 'lg',
                width: '90vh',
            }}>
                <ModalClose/>
                <Typography level={'title-md'}>Добавить проект</Typography>
                {
                    open ? <Alert color={colorAlert}>
                        <div>
                            <Typography level={'body-md'}>Набрано
                                баллов: {response?.totalScore}</Typography>
                            <Typography level={'body-md'}>Аннотация: {response?.annotation}</Typography>
                        </div>
                    </Alert> : null
                }
                <Input placeholder={'Название проекта'}
                       value={title}
                       onChange={handleChangeTitle}
                       fullWidth
                />
                <Input placeholder={'Собираемая сумма'}
                       startDecorator={'₽'}
                       value={goalAmount}
                       onChange={handleChangeGoalAmount}
                       type='number'
                       fullWidth
                />
                <Input fullWidth type='date' value={deadline} onChange={handleChangeDeadline}></Input>
                <Textarea placeholder={'Описание проекта'}
                          value={description}
                          onChange={handleChangeDescription}
                          minRows={10}
                ></Textarea>
                <Textarea placeholder={'ESG факторы'}
                          value={esgFactors}
                          onChange={handleChangeEsgFactors}
                          minRows={5}
                ></Textarea>
                <Button fullWidth color={'neutral'}
                        variant={'outlined'}
                        loading={isLoading}
                        onClick={() => createProject({
                            project: {
                                title: title,
                                description: description,
                                goalAmount: goalAmount,
                                deadline: deadline,
                                esgFactors: esgFactors
                            },
                            company: null
                            // company: {
                            //     title: '',
                            //     description: '',
                            // }
                        })}
                >
                    Добавить
                </Button>
            </ModalDialog>
        </Modal>
    );
};
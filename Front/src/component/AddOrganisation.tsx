import {Button, Input, Modal, ModalClose, ModalDialog, Textarea, Typography} from "@mui/joy";
import {FormEvent, useState} from "react";
import {getConfig} from "../config";

export const AddOrganisation = (
    props: {
        open: boolean,
        onClose: () => void;
    }
) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const config = getConfig();

    const handleChangeTitle = (e: FormEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const handleChangeDescription = (e: FormEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value)
    }

    const createCompany = () => {
        fetch(config.apiUrl + `/project-service/companies`, {
            method: "POST",
            body: JSON.stringify({'name': title, 'description': description}),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
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
                <Typography level={'title-md'}>Добавить организацию</Typography>
                <Input placeholder={'Название организации'}
                       value={title}
                       onChange={handleChangeTitle}
                       fullWidth
                />
                <Textarea placeholder={'Описание организации'}
                          value={description}
                          onChange={handleChangeDescription}
                          minRows={10}
                >
                </Textarea>
                <Button fullWidth color={'neutral'}
                        variant={'outlined'}
                        onClick={() => {
                            createCompany();
                        }}
                >
                    Добавить
                </Button>
            </ModalDialog>
        </Modal>
    );
};
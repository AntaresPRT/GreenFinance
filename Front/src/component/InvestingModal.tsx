import {Button, Input, Modal, ModalClose, ModalDialog, Stack, Typography} from "@mui/joy";
import {Dispatch, FormEvent, SetStateAction, useRef, useState} from "react";
import {getConfig} from "../config";

export const InvestingModal = (
    props: {
        projectId: number,
        projectTitle: string,
        remainAmount: number,
        open: boolean,
        onClose: Dispatch<SetStateAction<boolean>>
    }
) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [amount, setAmount] = useState(500);

    const config = getConfig();

    const handleChangeAmount = (e: FormEvent<HTMLInputElement>) => {
        setAmount(e.currentTarget.valueAsNumber);
    }

    const pay = () => {
        fetch(config.apiUrl + `/project-service/transactions`, {
            method: "POST",
            body: JSON.stringify({'amount': amount, 'projectId': props.projectId}),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    return (
        <Modal open={props.open} onClose={props.onClose}>
            <ModalDialog sx={{
                // alignItems: 'center',
                p: 3,
                borderRadius: 'lg',
                width: '90vh',
            }}>
                <ModalClose/>
                <Typography level={'title-md'}>Инвестирование в "{props.projectTitle}"</Typography>
                <Input placeholder={'Номер карты'} fullWidth/>
                <Stack direction={'row'} spacing={1}>
                    <Input placeholder={'Срок действия'}
                           fullWidth
                           type="date"
                    />
                    <Input placeholder={'CVV'}
                           fullWidth
                    />
                </Stack>
                <Input placeholder={'Владелец карты'}
                       fullWidth
                />
                <Input
                    fullWidth
                    value={amount}
                    type="number"
                    onChange={handleChangeAmount}
                    slotProps={{
                        input: {
                            ref: inputRef,
                            min: 1,
                            step: 1,
                        },
                    }}
                    placeholder="Сумма платежа"
                    startDecorator={'₽'}
                />
                <Typography level={'body-sm'}>
                    До полной суммы остается {props.remainAmount}
                </Typography>
                <Button fullWidth onClick={() => {
                    pay()
                }}>
                    Внести
                </Button>
            </ModalDialog>
        </Modal>
    );
};
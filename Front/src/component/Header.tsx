import {Box, IconButton, Sheet, Stack} from "@mui/joy";
import {Person} from "@mui/icons-material";
import {ExitToApp} from "@mui/icons-material";
import {ReactComponent as CISvg} from '../assets/CI.72b93c3.svg';
import {ModeToggle} from "./ModeToggle";
import {useNavigate} from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();
    return (
        <Sheet
            variant="plain"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                transition: 'transform 0.3s ease-in-out',
            }}
        >
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
            >
                <Box sx={{pl: 3, pt: 1}} onClick={() => {
                    navigate('/projects')
                }}>
                    <CISvg width={'15vh'}/>
                </Box>
                <Box alignContent={"center"} sx={{pr: 3}} gap={3}>
                    {
                        localStorage.getItem('token') ?
                            <IconButton variant={"plain"}
                                        onClick={() => {
                                            navigate('/profile')
                                        }}
                                        sx={{borderRadius: 'lg'}}>
                                <Person/>
                            </IconButton> : null
                    }
                    {
                        localStorage.getItem('token') ?
                            <IconButton variant={"plain"}
                                        onClick={() => {
                                            navigate('/')
                                            localStorage.removeItem('token');
                                        }}
                                        sx={{borderRadius: 'lg'}}>
                                <ExitToApp/>
                            </IconButton> : null
                    }
                    <ModeToggle/>
                </Box>
            </Stack>
        </Sheet>
    );
};
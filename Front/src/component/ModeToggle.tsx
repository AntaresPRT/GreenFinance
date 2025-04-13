import {IconButton, useColorScheme} from "@mui/joy";
import {useEffect, useState} from "react";
import {DarkMode, LightMode} from "@mui/icons-material";

export const ModeToggle = () => {
    const {colorScheme, setMode} = useColorScheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMode("light");
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }

    const updateStatusBarColor = () => {
        const themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
        if (themeColorMetaTag) {
            themeColorMetaTag.setAttribute('content', colorScheme === 'light' ? '#1a1d1f' : '#ffffff');
        }
    };

    return (
        <IconButton
            variant="plain"
            sx={{borderRadius: 'lg'}}
            onClick={() => {
                setMode(colorScheme === 'light' ? 'dark' : 'light');
                updateStatusBarColor();
            }}
        >
            {colorScheme === 'light' ? <LightMode/> : <DarkMode/>}
        </IconButton>
    );
};
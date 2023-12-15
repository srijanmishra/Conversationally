import { createTheme } from '@mui/material/styles';

const primary = '#A8C6F5';
const secondary = '#fcfaeb';
const background = '#343541';

const theme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#343541',
        },
        primary: {
            main: primary,
        },
        secondary: {
            main: secondary,
        },
    },
    typography: {
        fontFamily: '"Poppins"',
        h1: {
            fontSize: "8rem",
            fontWeight: 800,
        },
        h2: {
            fontSize: "4rem",
            fontWeight: 800,
        },
        h4: {
            fontWeight: 500,
        },
        allVariants: {
            color: secondary,
        },
    },
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                color: 'secondary',
                fullWidth: true,
                sx: {
                    '& .MuiTextField-root': {
                            color: secondary,
                            borderColor: secondary,
                            fontSize: "20px"
                        },
                },
            },
        },
        MuiDialog: {
            defaultProps: {
                sx: { //You can copy the code below in your theme
                    // background: '#000',
                    '& .MuiPaper-root': {
                        background: background
                    },
                    // '& .MuiBackdrop-root': {
                    // backgroundColor: 'transparent' // Try to remove this to see the result
                    // }
                }
            }
        },
        MuiButton: {
            defaultProps: {
                variant: 'contained',
                color: 'primary',
                size: 'large',
            },
        },
    }
});

export default theme;


         
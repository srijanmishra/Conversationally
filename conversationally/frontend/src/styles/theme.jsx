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
                style: {
                    fontSize: "16px",
                    backgroundImage: "linear-gradient(to right, #DA22FF 0%, #9733EE  51%, #DA22FF  100%)",
                    margin: "10px",
                    padding: "10px 45px",
                    textAlign: "center",
                    textTransform: "uppercase",
                    transition: "0.5s",
                    backgroundSize: "200% auto",
                    color: "white",            
                    boxShadow: "0 0 20px #eee",
                    borderRadius: "10px",
                    display: "block",
                    textDecoration: "none",
                }
            },
        },
    }
});

export default theme;


         
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';


const DemoPaper = styled(Paper)(({ theme }) => (
    {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        maxWidth: 300,
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        textAlign: 'center',

    }

)

);

const Testimonials = (props) => {
    return (
        <>
            <Typography variant="h3" align="center" gutterBottom sx={{ typography: { sm: "h2", xs: "h3" } }}>
                {props.headline}
            </Typography>

            <Stack direction="row" spacing={4} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                {props.testimonials.map((testimonial, index) => (
                    <DemoPaper key={index} elevation={3}>

                        {testimonial.img && (
                            <img src={testimonial.img} style={{ width: '100%', height: 'auto' }} />
                        )}

                        <Rating name={`read-only-${index}`} value={testimonial.stars} readOnly />
                        <Typography variant="h6" sx={{ margin: '10px 0' }}>
                            {testimonial.text}
                        </Typography>

                        <Typography variant="h6" sx={{ margin: '10px 0' }} style={{ fontWeight: 700 }}>
                            {testimonial.name}
                        </Typography>
                    </DemoPaper>
                ))}
            </Stack>
        </>
    );
};


export default Testimonials;

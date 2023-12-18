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
            <Typography variant="h3" align="center" style={{ marginTop: '30px', marginBottom: '30px' }} sx={{ typography: { sm: "h2", xs: "h3" } }}>
                {props.headline}
            </Typography>

            <Stack direction="row" spacing={4} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                {props.testimonials.map((testimonial, index) => (
                    <DemoPaper key={index} elevation={3} style={{ maxWidth: '400px', maxHeight: '400px', margin: '10px' }}>

                        {testimonial.img && (
                            <img src={testimonial.img} style={{ width: '100%', height: 'auto' }} />
                        )}

                        <div style={{ maxWidth: '200px', margin: '10px' }} >

                            <Rating name={`read-only-${index}`} value={testimonial.stars} readOnly />
                            <Typography variant="h4" sx={{ margin: '10px ', typography: { sm: "h4", xs: "h5" } }}>
                                {testimonial.text}
                            </Typography>

                            <Typography variant="h4" sx={{ margin: '10px ', typography: { sm: "h4", xs: "h6" } }} style={{ fontWeight: 700 }}>
                                {testimonial.name}
                            </Typography>

                        </div>

                    </DemoPaper>
                ))}
            </Stack >
        </>
    );
};


export default Testimonials;

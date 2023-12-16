import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';



const FAQs = (props) => {

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    imageContainer: {
      marginRight: '20px',
    },
    image: {
      width: '300px',
      height: 'auto',
    },
    accordionContainer: {
      flex: 1,
    },
    accordion: {
      backgroundColor: 'transparent',
    },
  };



  return (

    <div style={styles.container}>
      {props.img && (
        <div style={styles.imageContainer}>
          <img src={props.img} style={styles.image} />
        </div>
      )}

      <div style={styles.accordionContainer}>

        {props.faqs.map((faq, index) => ( // Map over the faqs array to render an Accordion for each
          <Accordion key={index} >

            <AccordionSummary
              expandIcon={<AddIcon />} // Changed to a plus icon
              aria-controls={`panel${index}a-content`}
              id={`panel${index}a-header`}
            >
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>

        ))}
      </div>
    </div>

  );

}

export default FAQs


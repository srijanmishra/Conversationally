import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Card } from '@mui/material';

const FAQs = (props) => {

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'flex-start',
      width: '100%',
      maxWidth: '1000px',
      margin: '60px',
      position: 'relative',
      flexWrap: 'wrap',
    },
    imageContainer: {
    },
    image: {
      minWidth: '350px',
      width: '30%',
      // height: 'auto',
    },
    accordionContainer: {
      minWidth: "300px",
      // minWidth: '300px',
      width: "7%",
      flexGrow: 1,
    },
  };

  const [expanded, setExpanded] = React.useState(null);

  const toggleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={styles.container}>
        {props.img && (
          // <div style={styles.imageContainer}>
            <img src={props.img} alt="FAQ Section" style={styles.image} />
          // </div>
        )}

        <div style={styles.accordionContainer}>
          {props.faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={toggleAccordion(`panel${index}`)}
            >
              <AccordionSummary
                expandIcon={
                  expanded === `panel${index}` ? <RemoveIcon /> : <AddIcon />
                }
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
              >
                <Typography variant="h4">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant='h4'>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Card>
    </div>
  );

}

export default FAQs


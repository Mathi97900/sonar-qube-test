import { ExpandMore } from '@material-ui/icons';
import { Accordion, AccordionSummary } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ReactChild } from 'react';
import { Text } from 'rebass';

interface AdvancedInputAccordianProps {
  children: ReactChild,
}

const useStyles = makeStyles(() => ({
  predictionTitle: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    lineHeight: '150%',
    background: 'rgba(89, 50, 243, 0.09) !important'
  }
}));

export default function AdvancedInputAccordian({ children }: AdvancedInputAccordianProps) {
  const classes = useStyles();
  return (
    <Accordion
      style={{
        marginTop: '33px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '0px 0px 4px 4px',
        boxShadow: '0px 0px 9px rgb(196 196 196 / 39%)'
      }}
    >
      <AccordionSummary
        className={classes.predictionTitle}
        expandIcon={<ExpandMore style={{ color: '#5932F3', marginRight: '3%', width: '100px' }} />}
        sx={{
          fontSize: '18px',
          color: '#5932F3 !important',
          height: '78px',
          width: '100%'
        }}
      >
        <Text ml="3%">Advanced input</Text>
      </AccordionSummary>
      {children}
    </Accordion>
  );
}

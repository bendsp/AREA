import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ActionsCard = () => {
    return (
        <Accordion sx={{ backgroundColor: "white", borderRadius: "5px" }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
                >
                <div className="text-xl font-bold">Actions Card</div>
            </AccordionSummary>
            <AccordionDetails>
                <div>Card content</div>
            </AccordionDetails>
        </Accordion>
    );
};

export default ActionsCard

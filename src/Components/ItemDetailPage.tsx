import { useLocation } from "react-router-dom";
import useDataStore from "../Zustand/DataStore";

//Material UI Components 
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

//CSS
import './ItemDetailPage.css'

export default function ItemDetailPage() {
    const location = useLocation();
    const id = location.state.id ? location.state.id : null;

    //data state from store
    const data = useDataStore((state) => state.data)
    const medication = data.results.find((element: any) => element.id === id)
    console.log(medication)


    return (
        <div className="medication-container">
            <div className="general-info flex-col">
                <h2>Medication Information</h2>
                <div>
                {
                    medication.openfda.brand_name !== undefined
                        ? <p><strong>Name: </strong> {medication.openfda.brand_name}</p>
                        : <p><strong>Medication ID: </strong>{medication.id}</p>
                }
                </div>
                
            </div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography>Ingredients</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className="flex-col accordion-info">
                        <p><strong>Active Ingredients: </strong>{medication.active_ingredient}</p>
                        <p><strong>Inactive ingredients: </strong>{medication.inactive_ingredient}</p>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography>Purpose</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className="flex-col accordion-info">
                        <p>{medication.purpose}</p>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel3-content"
                    id="panel2-header"
                >
                    <Typography>Dosage and usage</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className="flex-col accordion-info">
                        <p><strong>Dosage and Aministration: </strong>{medication.dosage_and_administration}</p>
                        <p><strong>Indications and Usage: </strong>{medication.indications_and_usage}</p>
                        <p><strong>Do not use when: </strong>{medication.do_not_use}</p>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <Typography>Safety Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className="flex-col accordion-info">
                        <p><strong>Stoop using when: </strong>{medication.stop_use}</p>
                        <p><strong>Pregnancy of breast feeding information:</strong>{medication.pregnancy_or_breast_feeding}</p>
                        <p><strong>Other safety information</strong>{medication.other_safety_information}</p>
                        <p><strong>Ask Doctor: </strong>{medication.ask_doctor}</p>
                        <p><strong>ask Doctor or Pharmacist: </strong>{medication.ask_doctor_or_pharmacist}</p>
                        <p><strong>Keep out of reach of children: </strong>{medication.keep_out_of_reach_of_children}</p>
                        <p><strong>Warnings: </strong>{medication.warnings}</p>

                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel5-content"
                    id="panel5-header"
                >
                    <Typography>Package information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className="flex-col accordion-info">
                        <p>{medication.package_label_principal_display_panel}</p>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
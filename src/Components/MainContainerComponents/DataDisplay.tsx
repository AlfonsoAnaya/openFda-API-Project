import { useState, useEffect } from 'react';
import PaginationController from './PaginationController';

//Material UI Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//CSS
import './DataDisplay.css';

interface DataDisplayProps {
    data: any
    skip: number
    setSkip: any
}

interface DataElement {
    package_label_principal_display_panel: string[][];
    active_ingredient: string[][];
    purpose: string[][];
    id: number
}

function createDataPoint(
    name: string[],
    activeIngredient: string[],
    purpose: string[],
    id: number
) {
    return { name, activeIngredient, purpose, id };
}

export default function DataDisplay({ data, skip, setSkip }: DataDisplayProps) {

    if (data === null || typeof data !== 'object') {
        return <p>Results of your search will show up here</p>;
    }

    const skipSize = 50;

    const dataPoints = data.results.map((element: DataElement) => createDataPoint(
        element.package_label_principal_display_panel.length > 1
            ? element.package_label_principal_display_panel[1]
            : element.package_label_principal_display_panel[0],
        element.active_ingredient[0],
        element.purpose[0],
        element.id
    ));

    const totalDataPoints = data.meta.results.total;

    return (
        <div>
            {/* Pagination Controller */}
            <PaginationController
                skip={skip}
                setSkip={setSkip}
                totalDataPoints={totalDataPoints}
                skipSize={skipSize}
            />

            {/* Table to Display Data */}
            <div className="flex-row">
                <TableContainer component={Paper} className="table-container">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Medicine Name</TableCell>
                                <TableCell align="right">Active Ingredient</TableCell>
                                <TableCell align="right">Purpose</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataPoints.map((row: any) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.activeIngredient}</TableCell>
                                    <TableCell align="right">{row.purpose}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            {/* Pagination Controller */}
            <PaginationController
                skip={skip}
                setSkip={setSkip}
                totalDataPoints={totalDataPoints}
                skipSize={skipSize}
            />

        </div>
    )
}
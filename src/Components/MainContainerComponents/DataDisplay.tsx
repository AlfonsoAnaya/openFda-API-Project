//Components
import PaginationController from './PaginationController';

//Stores
import useDataStore from '../../Zustand/DataStore';

//React Router Link
import { Link } from 'react-router-dom';

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
    skip: number
}

function createDataPoint(
    name: string,
    manufacturer: string,
    classification: string,
    id: number
) {
    return { name, manufacturer, classification, id };
}

export default function DataDisplay({ skip }: DataDisplayProps) {

    //data state from store
    const data = useDataStore((state) => state.data)

    if (data === null || typeof data !== 'object') {
        return <p>Results of your search will show up here</p>;
    }

    const skipSize = 50;

    const dataPoints = data.results.map((element: any) => {
        let name:string = '';
        let manufacturer:string = '';
        let classification:string = '';
        let id:number = 0;
    
        if (element.openfda.brand_name !== undefined) {
            name = element.openfda.brand_name[0] || '';
            manufacturer = element.openfda.manufacturer_name? element.openfda.manufacturer_name[0] : 'No manufacturer found';
            classification = element.openfda.pharm_class_cs? element.openfda.pharm_class_cs[0] : 'No classification found';
            id = element.id;
        } else {
            name = `Name not found. Purpose of medication: ${element.purpose}`
            manufacturer = "No manufacturer found"
            classification = "No classification found"
            id = element.id;
        }
    
        return createDataPoint(name, manufacturer, classification, id);
    });
    
    const totalDataPoints = data.meta.results.total;

    if (totalDataPoints.length === 0) return <p>Your search yielded no results. Try using a different query.</p>

    return (
        <div>
            {/* Pagination Controller */}
            <PaginationController
                skip={skip}
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
                                <TableCell align="right">Manufacturer</TableCell>
                                <TableCell align="right">Classification</TableCell>
                                <TableCell align="right">More Information</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataPoints.map((row: any) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        textDecoration: 'none', // Remove default link styling
                                        color: 'inherit', // Inherit text color
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.manufacturer}</TableCell>
                                    <TableCell align="right">{row.classification}</TableCell>
                                    <TableCell align="right">
                                    <Link 
                                        className="link"
                                        to={`/item/${row.id}`} 
                                        state={{ id: row.id }}
                                    >
                                        See More
                                    </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            {/* Pagination Controller */}
            <PaginationController
                skip={skip}
                totalDataPoints={totalDataPoints}
                skipSize={skipSize}
            />

        </div>
    )
}
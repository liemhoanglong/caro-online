import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Crown from '../IconSVG/Crown';
import userAPI from '../../Util/userAPI';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#CFD8DC",
        color: "black",
        fontWeight: 'bold',
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function Leaderboard(props) {
    const [rows, setRows] = useState([]);
    console.log(rows)
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await userAPI.getAll();
                const temp = res.data.sort((a, b) => (a.elo < b.elo) ? 1 : ((b.elo < a.elo) ? -1 : 0))
                const temp1 = temp.slice(0, 10);
                setRows(temp1);
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        fetchAll();
    }, [])

    const classes = useStyles();
    return (
        <Container>
            <Link to="/" style={{ textDecoration: 'none', color: "inherit" }}>
                <Button style={{textTransform: "none", marginRight: 10, marginTop: 10}} size="large" variant="contained" color="primary">
                    <ArrowBackIosIcon fontSize="small"/>
                    Back</Button>
            </Link>
            <h1 style={{ textAlign: "center" }}>Leaderboard<Crown width='40px' height='40px' style={{transform: "rotate(45deg)"}}/></h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Rank</StyledTableCell>
                            <StyledTableCell>Player</StyledTableCell>
                            <StyledTableCell>Elo</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, i) => (
                            <StyledTableRow key={row.i}>
                                <StyledTableCell component="th" scope="row">{i+1}</StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell>{row.elo}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

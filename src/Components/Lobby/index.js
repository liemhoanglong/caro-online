import React, {useState} from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell,
        TableContainer, TableHead, TableRow,
        Paper, Grid, Avatar, Button, Typography} from '@material-ui/core';
import {Redirect} from "react-router-dom"

import SearchRoom from "./searchRoom";
import ListUser from '../ListUser/index'
import {socket} from "../../Context/socket"

const useStyles = makeStyles(() =>
    createStyles({
        table: {
            minWidth: 500,
        }
    })
);

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

function createData(ID: string, name: string, numberOfUser: number) {
    return { ID, name, numberOfUser};
}

const rows = [
    createData('R001', "Phòng 1", 1),
    createData('R002', "Phòng 2", 1),
    createData('R003', "Phòng 3", 2),
];

const table = (classes) =>
{
    return(
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID phòng</StyledTableCell>
                            <StyledTableCell align="right">Tên</StyledTableCell>
                            <StyledTableCell align="right">Số lượng</StyledTableCell>
                            <StyledTableCell align="right">Chơi ngay</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.ID}>
                                <StyledTableCell component="th" scope="row">
                                    {row.ID}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.name}</StyledTableCell>
                                <StyledTableCell align="right">{row.numberOfUser}</StyledTableCell>
                                {row.numberOfUser === 1 ?
                                    <StyledTableCell align="right">
                                        <Button variant="contained" color="primary" disableElevation>
                                            Play
                                        </Button>
                                    </StyledTableCell>
                                    :
                                    <StyledTableCell align="right">
                                        <Button variant="contained" color="primary" disableElevation disabled>
                                            Play
                                        </Button>
                                    </StyledTableCell>
                                }
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

export default function Lobby() {
    const [isDirectPage, setIsDirectPage] = useState(false);
    const classes = useStyles();


    const playNow = () =>
    {
        socket.emit("join-room");
        setIsDirectPage(true);
    }

    if(isDirectPage)
        return(
            <Redirect to="/game"/>
        )

    return (
        <Grid container>
            <Grid container item alignContent="flex-end" justify="flex-end" style={{margin: 5}}>
                <SearchRoom/>
                <Button variant="contained" color="primary" disableElevation onClick={playNow}>
                    Chơi ngay
                </Button>
                <Button variant="contained" color="primary" disableElevation>
                    Tạo phòng
                </Button>
            </Grid>
            <Grid container item  style={{margin: 5}}>
                <Grid item xs={9}>
                    {table(classes)}
                </Grid>
                <Grid direction="row" alignContent="center" container item xs = {3} >
                    <Grid item xs={12}>
                        <Avatar style={{width: 200, height: 200, fontSize: 100}}>H</Avatar>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Điểm: 1609</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ListUser/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    );
}

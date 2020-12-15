import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Grid, Avatar} from "@material-ui/core";
import SearchRoom from "../../Main/searchRoom";
import Button from "@material-ui/core/Button";
import ListUser from "../../ListUser";
import Typography from "@material-ui/core/Typography";

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
                                        <Button variant="contained" color="primary" disableElevation disabled={true}>
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
    const classes = useStyles();

    return (
        <Grid container>
            <Grid container item alignContent={"flex-end"} justify={"flex-end"} style={{margin: 5}}>
                <SearchRoom/>
                <Button variant="contained" color="primary" disableElevation>
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
                <Grid direction={"row"} alignContent={"center"} container item xs = {3} >
                    <Grid item xs={12}>
                        <Avatar style={{width: 200, height: 200, fontSize: 100}}>H</Avatar>
                    </Grid>
                    <Grid items xs={12}>
                        <Typography>Điểm: 1609</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Người chơi đang online</Typography>
                        <ListUser/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    );
}

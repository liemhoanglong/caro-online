import React, {useEffect, useState} from "react";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles";

import getListRoom from "./service";

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
            fontSize: 18,
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

const roomName = [
    "Chiến đê",
    "So tài cao thấp caro nè",
    "Caro cho cao thủ", "Solo đê bạn ơi",
    "Gà vcl",
]

export default function ListRoom()
{
    const classes = useStyles();
    const [listRoom, setListRoom] = useState([]);

    useEffect(() => {
        const fetchData = async () =>
        {
            const res = await getListRoom();
            console.log(res);
            setListRoom(res.data);
        }
        fetchData();
    },[])

    const userInRoom = (row) =>
    {
        let user = 0;
        if(row.playerX != null )
            user++;
        if(row.playerO != null)
            user++;
        return user;
    }

    const audienceInRoom = (row) =>
    {
        let audience = row.audience.length;
        if(row.playerX != null )
            audience--;
        if(row.playerO != null)
            audience--;
        return audience;
    }

    return(
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell width = "10%" align="center">ID phòng

                            </StyledTableCell>
                            <StyledTableCell width = "45%" align="center">Tên</StyledTableCell>
                            <StyledTableCell width = "15%" align="center">Người chơi</StyledTableCell>
                            <StyledTableCell width = "15%" align="center">Khán giả</StyledTableCell>
                            <StyledTableCell width = "15%" align="center">Chơi ngay</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listRoom.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row" width = "10%" align="center">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell width = "45%" align="center">
                                    {roomName[Math.floor(Math.random() * roomName.length)]}
                                </StyledTableCell>
                                <StyledTableCell width = "15%" align="center">
                                    {`${userInRoom(row)} / 2`}
                                </StyledTableCell>
                                <StyledTableCell width = "15%" align="center">{audienceInRoom(row)}</StyledTableCell>
                                {row.numberOfUser === 1 ?
                                    <StyledTableCell width = "15%" align="center">
                                        <Button variant="contained" color="primary" disableElevation>
                                            Play
                                        </Button>
                                    </StyledTableCell>
                                    :
                                    <StyledTableCell width = "15%" align="center">
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
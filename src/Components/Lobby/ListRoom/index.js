import React, {useEffect, useState} from "react";
import {Button, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TablePagination} from "@material-ui/core";
import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles";
import {Redirect} from "react-router-dom"

import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import {getListRoom} from "../service";
import {socket} from "../../../Context/socket";
import EnterPassword from "./enterPassword";

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
            backgroundColor: "#2CB895",
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 16,
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

const rowPerPage = 6;

export default function ListRoom({search})
{
    const classes = useStyles();
    const [listRoom, setListRoom] = useState([]);
    const [page, setPage] = useState(0);
    const [isEnterPassword, setIsEnterPassword] = useState(false);
    const [selectedRow, setSelectedRow] = useState("");
    const [isDirect, setIsDirect] = useState(false);

    useEffect(() => {
        const fetchData = async () =>
        {
            const res = await getListRoom();
            setListRoom(res.data);
        }
        fetchData();
    },[])

    useEffect(() => {
        const eventHandler = (data) =>
        {
            setListRoom(data);
        }

        socket.on("lobby-change", eventHandler);

        return () => socket.off("lobby-change", eventHandler);
    },[listRoom])

    const userInRoom = (row) =>
    {
        let user = 0;
        if(row.playerX)
            user++;
        if(row.playerO)
            user++;
        return user;
    }

    const audienceInRoom = (row) =>
    {
        let audience = row.audience.length;
        if(row.playerX)
            audience--;
        if(row.playerO)
            audience--;
        return audience;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleCloseEnterPass = () =>
    {
        setIsEnterPassword(false);
        setSelectedRow("")
    }

    const handleAgreeEnterPass = (result) =>
    {
        if(result) //true
        {
            setIsEnterPassword(false);
            socket.emit("join-room-id", selectedRow);
            setIsDirect(true);
        }
    }

    const joinRoom = (row) =>
    {
        setSelectedRow(row.id);
        if(row.password)
        {
            setIsEnterPassword(true);
        }
        else
        {
            setIsDirect(true);
            socket.emit("join-room-id", row.id);
        }
    }

    if(isDirect)
        return(
            <Redirect to={`/game/${selectedRow}`}/>
        )

    return(
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell width= "5%"/>
                            <StyledTableCell width = "15%" align="center">Room ID</StyledTableCell>
                            <StyledTableCell width = "25%" align="center">Name</StyledTableCell>
                            <StyledTableCell width = "15%" align="center">Player</StyledTableCell>
                            <StyledTableCell width = "10%" align="center">Audience</StyledTableCell>
                            <StyledTableCell width = "15%" align="center">Status</StyledTableCell>
                            <StyledTableCell width = "15%" align="center">Join</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listRoom.filter(room => room.id.toLowerCase().includes(search.toLowerCase()))
                            .slice(page*rowPerPage, page * rowPerPage+ rowPerPage)
                            .map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell width="5%" align="center">
                                    {row.password ?
                                        <LockIcon/>
                                        :
                                        <LockOpenIcon/>
                                    }
                                </StyledTableCell>
                                <StyledTableCell width = "15%" align="center">
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell width = "25%" align="center">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell width = "15%" align="center">
                                    {`${userInRoom(row)} / 2`}
                                </StyledTableCell>
                                <StyledTableCell width = "10%" align="center">
                                    {audienceInRoom(row)}
                                </StyledTableCell>
                                {row.isStart ?
                                    <React.Fragment>
                                        <StyledTableCell width = "15%" align="center">
                                            Đã chơi
                                        </StyledTableCell>
                                        <StyledTableCell width = "15%" align="center">
                                            <Button variant="contained" color="primary"
                                                    disableElevation disabled style={{fontsize: 12}}>
                                                Started
                                            </Button>
                                        </StyledTableCell>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <StyledTableCell width = "15%" align="center">
                                            Waiting
                                        </StyledTableCell>
                                        <StyledTableCell width = "15%" align="center">
                                            <Button variant="contained" color="primary"
                                                    disableElevation
                                                    onClick={() => joinRoom(row)}
                                            >
                                                Join now
                                            </Button>
                                        </StyledTableCell>
                                    </React.Fragment>
                                }
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[6]}
                    count = {listRoom.length}
                    page={page}
                    onChangePage={handleChangePage}
                    rowsPerPage={rowPerPage}
                />
            </TableContainer>
            <EnterPassword open={isEnterPassword}
                           handleClose={handleCloseEnterPass}
                           handleAgree={handleAgreeEnterPass}
                           id = {selectedRow}
            />
        </React.Fragment>
    );
}
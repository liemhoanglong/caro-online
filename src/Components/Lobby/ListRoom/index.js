import React, {useEffect, useState} from "react";
import {Button, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TablePagination} from "@material-ui/core";
import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles";

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
            backgroundColor: theme.palette.common.black,
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

export default function ListRoom()
{
    const classes = useStyles();
    const [listRoom, setListRoom] = useState([]);
    const [page, setPage] = useState(0);
    const [isEnterPassword, setIsEnterPassword] = useState(false);
    const [selectedRow, setSelectedRow] = useState("");

    useEffect(() => {
        const fetchData = async () =>
        {
            const res = await getListRoom();
            console.log(res);
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
        }
    }

    const joinRoom = (row) =>
    {
        if(row.password)
        {
            setSelectedRow(row.id);
            setIsEnterPassword(true);
        }
        else
        {
            socket.emit("join-room-id", row.id);
        }
    }

    return(
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell width= "5%"/>
                            <StyledTableCell width = "15%" align="center">ID phòng</StyledTableCell>
                            <StyledTableCell width = "25%" align="center">Tên phòng</StyledTableCell>
                            <StyledTableCell width = "15%" align="center">Người chơi</StyledTableCell>
                            <StyledTableCell width = "10%" align="center">Khán giả</StyledTableCell>
                            <StyledTableCell width = "15%" align="center">Trạng thái</StyledTableCell>
                            <StyledTableCell width = "15%" align="center">Tham gia</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listRoom.slice(page*rowPerPage, page * rowPerPage+ rowPerPage)
                            .map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell width="5%" align="center">
                                    {row.password ?
                                        <LockIcon/>
                                        :
                                        <LockOpenIcon/>
                                    }
                                </StyledTableCell>
                                <StyledTableCell width = "15%">
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell width = "25%" align="left">
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
                                                Đã bắt đầu
                                            </Button>
                                        </StyledTableCell>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <StyledTableCell width = "15%" align="center">
                                            Đang chờ
                                        </StyledTableCell>
                                        <StyledTableCell width = "15%" align="center">
                                            <Button variant="contained" color="primary"
                                                    disableElevation
                                                    onClick={() => joinRoom(row)}
                                            >
                                                Tham gia
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
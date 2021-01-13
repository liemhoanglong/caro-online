import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import './history.css'
import War from '../IconSVG/War';
import gameAPI from '../../Util/gameAPI';
import userAPI from '../../Util/userAPI';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'playerX', numeric: false, disablePadding: false, label: 'Player 1 Vs Player 2' },
    { id: 'result', numeric: false, disablePadding: false, label: 'Winner' },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
                <StyledTableCell key='10' align={'right'} style={{ paddingRight: 30 }}>
                    View
                </StyledTableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

//------------------Custom header TableCell-------------------
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#CFD8DC',
        fontWeight: 'bold',
    },
}))(TableCell);

//------------------Custom odd even TableRow-------------------
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

// const handleClick = (id) => {
//     console.log(id)
//     return (<Redirect to={`/game/${id}`}/>)
// };

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>RETURN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export default function History(props) {
    const classes = useStyles();

    const [reset, setReset] = useState(false);
    const [rows, setRows] = useState([]);
    const [won, setWon] = useState(0);
    const [elo, setElo] = useState(0);
    // console.log(elo)
    // console.log(localStorage.getItem("id"))

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await gameAPI.getAll();
                setRows(res.data.room);
                setWon(res.data.won);
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        fetchAll();
    }, [reset])

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await userAPI.profile();
                setElo(res.data.user.elo);
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        fetchAll();
    }, [reset])

    //-----------------------------------
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    if(!rows) return <></>
    return (
        <Container className={classes.root}>
            <Link to="/" style={{ textDecoration: 'none', color: "inherit" }}>
                <Button style={{textTransform: "none", marginRight: 10, marginTop: 10}} size="large" variant="contained" color="primary">
                    <ArrowBackIosIcon fontSize="small"/>
                    Back</Button>
            </Link>
            <h1 style={{ textAlign: "center" }}>History</h1>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <h3 className={classes.paper}>Elo score: {elo}</h3>
                </Grid>
                <Grid item xs={6}>
                    <h3 className={classes.paper}>Matches played: {rows.length}</h3>
                </Grid>
                <Grid item xs={6}>
                    <h3 className={classes.paper} style={{marginTop:0, marginBottom:40}}>Won matches: {won}</h3>
                </Grid>
                <Grid item xs={6}>
                    <h3 className={classes.paper} style={{marginTop:0, marginBottom:40}}>Winning Rate: {Math.floor(won/rows.length*100)}%</h3>
                </Grid>
            </Grid>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <StyledTableRow
                                            hover
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            <TableCell>{row.gamePlay.slice(0, 10)}</TableCell>
                                            <TableCell>
                                                {row.playerX.username + ' '}
                                                <War style={{ padding: 5 }} width='20px' height='20px' />
                                                {' ' + row.playerO.username}
                                            </TableCell>
                                            <TableCell>{row.result === "X" ? "player1" : row.result === "O" ? "player2" : "Draw"}</TableCell>
                                            {/* <TableCell>{
                                                row.result.includes("Draw") ?
                                                    "Draw" :
                                                    row.result.includes("X") ?
                                                        row.playerX.userID.includes(localStorage.getItem("id")) ? "Win" : "Lose"
                                                        :
                                                        row.playerO.userID.includes(localStorage.getItem("id")) ? "Win" : "Lose"
                                            }
                                            </TableCell> */}
                                            <TableCell align={'right'}>
                                                <Link to={`/history-room/${row._id}`} className='view'>
                                                    <VisibilityIcon className='view-icon' style={{ color: 'gray' }} />
                                                </Link>
                                            </TableCell>
                                        </StyledTableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            {/* {
                rows.map((row,i)=>{
                    return <li key={i}>{row._id}</li>
                })
            } */}
        </Container>
    );
}
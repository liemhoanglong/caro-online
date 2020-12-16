import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 'auto',
            maxWidth: 360,
            maxHeight: 300,
            overflow: "auto",
            backgroundColor: theme.palette.background.paper,
        },
        paper:{
            maxWidth: 360,
        }
    }),
);

export default function InsetList() {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} elevation={4}>
            <Typography variant="h6">
                Online users
            </Typography>
            <List component="nav" className={classes.root} aria-label="contacts">
                <ListItem button disabled style={{backgroundColor: "#f3f3f3"}}>
                    <ListItemIcon>
                        <FiberManualRecordIcon />
                    </ListItemIcon>
                    <ListItemText primary="Chelsea Otakan" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <FiberManualRecordIcon style={{fill: "green"}} />
                    </ListItemIcon>
                    <ListItemText primary="Eric Hoffman" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Eric Hoffman" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Eric Hoffman" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Eric Hoffman" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Eric Hoffman" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Eric Hoffman" />
                </ListItem>
            </List>
        </Paper>

    );
}

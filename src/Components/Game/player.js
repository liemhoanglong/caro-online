import {Avatar, Card, CardActionArea, Grid, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        maxHeight: 200,
        width: "100%",
    },
});

export default function Player({status, type, player})
{
    const classes = useStyles();
    if(status === 0)
    {
        return (
            <Grid container item xs={12} >
                <Card  elevation={3} className={classes.root}>
                    <CardActionArea style={{paddingTop: 50, paddingBottom: 50}}>
                        <Grid justify="center" alignContent="center" container>
                            <Typography variant="h5">Waiting player</Typography>
                        </Grid>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }
    else if(status === -1)
    {
        return (
            <Grid container item xs={12} >
                <Card  elevation={3} className={classes.root}>
                    <CardActionArea style={{paddingTop: 50, paddingBottom: 50}}>
                        <Grid justify="center" alignContent="center" container>
                            <Typography variant="h5">Player left room</Typography>
                            <Typography variant="h6">Waiting for reconnect...</Typography>
                        </Grid>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }
    else {
        const character = player.username.charAt(0);
        return (
            <Grid container item xs={12}>
                <Card className={classes.root} elevation={2}>
                    <CardActionArea>
                        <Grid container direction="row" spacing={2}>
                            <Grid container item xs={12} >
                                <Grid container item xs={6} justify="center" alignItems="center">
                                    <Avatar style={{width: 100, height: 100, fontSize: 64}}>{character}</Avatar>
                                </Grid>
                                <Grid container item xs={6} justify="center" alignItems="center">
                                    <Grid container item xs={12} justify="center" alignItems="center">
                                        <Typography><b>{player.username}</b></Typography>
                                    </Grid>
                                    <Grid container item xs={12} justify="center" alignItems="center">
                                        <Typography>{`Elo: ${player.elo}`}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item container justify="center" alignItems="center">
                                <Typography variant="h6">
                                    {type}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }
}
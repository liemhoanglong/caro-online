import {Avatar, Card, CardActionArea, CardContent, Grid, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        maxHeight: 150,
        width: "100%",
    },
});

export default function Player({status, type, elo, username})
{
    const classes = useStyles();
    if(status === 0)
    {
        return (
            <Grid container item xs={12}>
                <Card className={classes.root} elevation={3}>
                    <CardActionArea>
                        <CardContent>
                            Đang chờ ...
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }
    else {
        const character = username.charAt(0);
        return (
            <Grid container item xs={12}>
                <Card className={classes.root} elevation={3}>
                    <CardActionArea>
                        <Grid container direction="row">
                            <Grid container item xs={12}>
                                <Grid container item xs={6} justify="center" alignItems="center">
                                    <Avatar style={{width: 100, height: 100, fontSize: 64}}>{character}</Avatar>
                                </Grid>
                                <Grid container item xs={6} justify="center" alignItems="center">
                                    <Grid container item xs={12} justify="center" alignItems="center">
                                        <Typography><b>{username}</b></Typography>
                                    </Grid>
                                    <Grid container item xs={12} justify="center" alignItems="center">
                                        <Typography>{`Elo: ${elo}`}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container justify="center" alignItems="center" item>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {type}
                                    </Typography>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }
}
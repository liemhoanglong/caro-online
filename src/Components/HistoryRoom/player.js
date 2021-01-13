import { Avatar, Card, CardActionArea, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    maxHeight: 190,
    width: "100%"
  },
});

export default function Player({ type, elo, username }) {
  const classes = useStyles();
  const character = username.charAt(0);
  return (
    <Grid container item xs={12}>
      <Card className={classes.root} elevation={3} style={{backgroundColor:'#F5F5F5'}}>
        <CardActionArea>
          <Grid container direction="row" style={{marginTop:20}}>
            <Grid container item xs={12}>
              <Grid container item xs={6} justify="center" alignItems="center">
                <Avatar style={{ width: 100, height: 100, fontSize: 64 }}>{character}</Avatar>
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
                  {'Player ' + type}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
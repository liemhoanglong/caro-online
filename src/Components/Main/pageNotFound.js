import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    main: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

export default function NotFoundPage()
{
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <CssBaseline />
                <Container component="main" className={classes.main} >
                    <Typography variant="h1" component="h1" gutterBottom>
                        404 not found :(
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        {'Page not exist or unavailable. Please check again!'}
                    </Typography>
                </Container>
            </div>
        </React.Fragment>
    );
}
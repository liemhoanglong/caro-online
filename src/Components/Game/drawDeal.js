import React, {useState} from "react"
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import {Box, Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import {socket} from "../../Context/socket";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function DrawDeal({isStart})
{
    const [open, setOpen] = useState(false);

    const handleClose = () =>
    {
        setOpen(false);
    }

    const handleOpen = () =>
    {
        setOpen(true);
    }

    const handleAgree = () =>
    {
        setOpen(false);
        socket.emit("draw-deal");
    }

    return(
        <React.Fragment>
            {isStart ?
                <Button variant="contained" color="primary" onClick={handleOpen}>Draw deal</Button>
                :
                <Button variant="contained" color="primary" disabled>Draw deal</Button>
            }
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    <Box fontWeight='fontWeightBold' display='inline'>Draw Deal</Box>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6">Are you sure want to give a draw deal with your rival?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={handleAgree} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
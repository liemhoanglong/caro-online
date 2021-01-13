import React, {useState} from "react"
import {Button} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import {socket} from "../../Context/socket";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function GiveUp({isStart})
{
    const [open, setOpen] = useState(false);
    const [isClick, setClick] = useState(false);

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
        setClick(true);
        socket.emit("give-up");
        handleClose();
    }

    return(
        <React.Fragment>
            {isStart && !isClick ?
                <Button variant="contained" color="primary" onClick={handleOpen}>Give up</Button>
                :
                <Button variant="contained" color="primary" disabled>Give up</Button>
            }
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Give up</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">Are you sure? You will lose this game!</Typography>
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
    );
}
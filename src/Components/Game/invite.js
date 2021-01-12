import React, {useState} from "react";
import {Button} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import UserList from "../ListUser";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function InviteFriend({id})
{
    const [open, setOpen] = useState(false);

    const handleOpen = () =>
    {
        setOpen(true);
    }

    const handleClose = () =>
    {
        setOpen(false);
    }

    const user = JSON.parse(localStorage.getItem("user"));

    return(
        <React.Fragment>
            <Button variant="contained" color="primary" disableElevation onClick={handleOpen}>Invite friend</Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"

            >
                <DialogTitle id="alert-dialog-slide-title">Invite friends</DialogTitle>
                <DialogContent>
                    <UserList type={1} id={id} invitee={user.username} handleClose={handleClose}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
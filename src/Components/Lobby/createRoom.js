import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateRoom({open, handleClose, handleAgree})
{
    const [password, setPassword] = useState("");
    const [isCheck, setIsCheck] = useState(false);

    const handleCheckBox = () =>
    {
        setIsCheck(!isCheck);
    }

    const agreeCreate = () =>
    {
        handleAgree(password);
        setPassword("");
        setIsCheck(false);
    }

    return(
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Tạo phòng chơi mới</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={3}>
                            Password:
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                autoComplete="off"
                                variant="standard"
                                type={isCheck? "text": "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox name="show password" checked={isCheck} onChange={handleCheckBox} />}
                                label="Hiện password"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={agreeCreate} color="primary">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
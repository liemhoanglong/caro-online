import React, {useState} from "react"
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {DialogContentText} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import {checkPasswordRoom} from "../service";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EnterPassword ({open, handleClose, handleAgree, id})
{
    const [password, setPassword] = useState("");
    const [isCheck, setIsCheck] = useState(false);
    const [alert, setAlert] = useState(false);

    const handleCheckBox = () =>
    {
        setIsCheck(!isCheck);
    }

    const closePass = () =>
    {
        setPassword("");
        setIsCheck(false);
        handleClose();
    }
    const agreePass = async () =>
    {
        const res = await checkPasswordRoom({id, password});
        if(res.data.msg) // true
        {
            setPassword("");
            setIsCheck(false);
            setAlert(false);
            handleAgree(true);
        }
        else
        {
            setAlert(true);
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={closePass}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Nhập mật khẩu</DialogTitle>

                <DialogContent>
                    <DialogContentText>Phòng này đã bị khóa, nhập mật khẩu để tham gia</DialogContentText>
                    <Collapse in={alert}>
                        <Alert severity="error"
                               action={
                                   <IconButton
                                       aria-label="close"
                                       color="inherit"
                                       size="small"
                                       onClick={() => {
                                           setAlert(false);
                                       }}
                                   >
                                       <CloseIcon fontSize="inherit" />
                                   </IconButton>
                               }
                        >
                            Sai mật khẩu, thử lại!
                        </Alert>
                    </Collapse>

                    <Grid container spacing={2}>
                        <Grid item style={{paddingTop: 15}}>
                            Password:
                        </Grid>
                        <Grid item>
                            <TextField
                                autoComplete="off"
                                variant="standard"
                                type={isCheck? "text": "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                control={<Checkbox name="show password" checked={isCheck} onChange={handleCheckBox} />}
                                label="Hiện password"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closePass} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={agreePass} color="primary">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
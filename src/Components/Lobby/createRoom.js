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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateRoom({open, handleClose, handleAgree})
{
    const [password, setPassword] = useState("");
    const [isCheck, setIsCheck] = useState(false);
    const [isSwitch, setIsSwitch] = useState(false);

    const handleCheckBox = () =>
    {
        setIsCheck(!isCheck);
    }

    const closeCreate = () =>
    {
        setPassword("");
        setIsCheck(false);
        handleClose();
    }

    const agreeCreate = () =>
    {
        handleAgree(password);
        setPassword("");
        setIsCheck(false);
    }

    const handleClickSwitch = () =>
    {
        if(isSwitch)
        {
            setPassword("");
            setIsCheck(false)
        }
        setIsSwitch(!isSwitch)
    }

    return(
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={closeCreate}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Create a new room</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        onClick={handleClickSwitch}
                                        color="primary"
                                    />
                                }
                                label="Password"
                            />
                        </Grid>
                        <Collapse in={isSwitch}>
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
                                        label="Show password"
                                    />
                                </Grid>
                            </Grid>
                        </Collapse>
                        <Grid item style={{paddingTop: 5, paddingRight: 10}}>
                            Time for moving (second):
                        </Grid>
                        <Grid item>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value="45"
                            >
                                <MenuItem value={30}>30</MenuItem>
                                <MenuItem value={45}>45</MenuItem>
                                <MenuItem value={60}>60</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeCreate} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={agreeCreate} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
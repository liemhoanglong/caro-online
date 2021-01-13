import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { activateService } from "./Service/authService";
import {Button,} from '@material-ui/core';

export default function Activate(props) {
    const [alert, setAlert] = useState(false);
    const [flag, setFlag] = useState(false);

    const handleActivated = async () => {
        // setAlert("Your account have been activated!")
        let res = await activateService(props.match.params.id)
        console.log(res.data);
        setAlert(res.data.msg);
    }

    if(flag) return (<Redirect to="/login"/>)
    return (
        <div style={{ textAlign: "center" }}>
            {alert ?
                <>
                    <h2 style={{ color: "green" }}>Your account had been {alert}.</h2>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={()=>setFlag(true)}
                    >
                        Login
                    </Button>
                </>
                :
                <>
                    <h2>Please click the link below!</h2>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleActivated}
                    >
                        Activate
                    </Button>
                </>
            }
        </div>
    );
}
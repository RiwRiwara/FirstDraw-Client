import { useNavigate } from "react-router-dom";
import {
    Typography, Link, Breadcrumbs
} from '@mui/material';

const PageTitle = (props) => {
    const navigate = useNavigate()
    return (
        <>

            <h2 className="fw-bold ">{props.title}</h2>
            <div >
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover"
                        style={{ cursor: 'pointer' }}
                        color="inherit" onClick={() => { navigate(-1); }}>
                        Back
                    </Link>
                    <Typography color="text.primary">{props.title}</Typography>
                </Breadcrumbs>
            </div>
        </>

    );
};

export default PageTitle;

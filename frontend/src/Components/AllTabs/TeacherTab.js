import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Box, Fab, Modal, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

const teacher = {
    id: "",
    name: "",
    email: "",
    subject: "",
    salary: ""
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    transition: "transform 0.4s",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    boxSizing: "border-box",
    width: "90%",
    height: "auto",
    maxWidth: "400px",
    maxHeight: "80vh",
    display: "block",
    padding: "40px",
    borderRadius: "40px",
};

const styleMessage = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    transition: "transform 0.4s",
    p: 4,
    boxSizing: "border-box",
    width: "80%",
    maxWidth: "400px",
    height: "30vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "60px",
};

const TeacherTab = ({ parentCallback }) => {
    const [loading, setLoading] = React.useState(false);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [openMessage, setOpenMessage] = React.useState(false);
    const [data, setData] = React.useState(teacher);
    const [msg, setMsg] = React.useState();


    const loadUsers = async () => {
        const result = await axios.get("https://picayune-cover-production.up.railway.app/getTeacher");
        setUsers(result.data);
    }

    const saveTeacher = async () => {
        setLoading(true);
        parentCallback(true);
        await axios.post("https://picayune-cover-production.up.railway.app/addTeacher", data)
            .then(setMsg(data.id ? "Teacher Updated!" : "Teacher Added!"))
        setTimeout(() => {
            setLoading(false);
            parentCallback(false);
            handleClose();
            setData(teacher);
            handleOpenMessage();
        }, 3000);
    }

    const editTeacher = async (id) => {
        setLoading(true);
        parentCallback(true);
        setTimeout(() => {
            setLoading(false);
            parentCallback(false);
            setOpen(true);
        }, 3000);
        const teacherData = await axios.get(`https://picayune-cover-production.up.railway.app/getTeacherById/${id}`)
        setData(teacherData.data);
    }

    const deleteTeacher = async (id) => {
        setLoading(true);
        parentCallback(true);
        setTimeout(() => {
            setLoading(false);
            parentCallback(false);
            handleOpenMessage();
        }, 3000);
        await axios.delete(`https://picayune-cover-production.up.railway.app/deleteTeacher/${id}`)
            .then(setMsg("Teacher Deleted!"));
        loadUsers();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        });
    }

    const handleOpen = () => {
        setLoading(true);
        parentCallback(true);
        setTimeout(() => {
            setLoading(false);
            parentCallback(false);
            setOpen(true);
        }, 1000);
    };
    const handleClose = () => {
        setOpen(false);
        setData(teacher);
    }

    const handleOpenMessage = () => setOpenMessage(true);
    const handleCloseMessage = () => setOpenMessage(false);

    useEffect(() => {
        loadUsers();
    }, [open]);

    return (
        <>
            <div className="container" style={{ height: "450px" }}>
                <h4>Teachers Data</h4>
                <div className="py-2 table-container">
                    <Table responsive style={{ color: "white", maxHeight: "100%", overflow: "auto" }}>
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Salary</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((data, index) => (
                                    <tr key={data.id}>
                                        <th key={index}>{index + 1}</th>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.subject}</td>
                                        <td>{data.salary}</td>
                                        <td>
                                            <Fab color="secondary" aria-label="edit" size='medium' onClick={() => editTeacher(data.id)}>
                                                <EditIcon />
                                            </Fab>
                                            <Fab className='m-2' color="error" size='medium' ria-label="add" onClick={() => deleteTeacher(data.id)}>
                                                <DeleteIcon />
                                            </Fab>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    <div className="float">
                        <Fab className="float" color="primary" aria-label="add" onClick={handleOpen}>
                            <AddIcon />
                        </Fab>
                    </div>
                </div>
                <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={style} className="popup">
                        <h1 style={{ textAlign: "center" }}>{data.id ? "Update Teacher" : "Add Teacher"}</h1>
                        <TextField id="standard-basic" label="Name" fullWidth name="name" variant="standard" value={data.name} onChange={(e) => handleChange(e)} />
                        <TextField id="standard-basic" margin="dense" fullWidth label="Email" name="email" variant="standard" value={data.email} onChange={(e) => handleChange(e)} />
                        <TextField id="standard-basic" margin="dense" fullWidth label="Subject" name="subject" variant="standard" value={data.subject} onChange={(e) => handleChange(e)} />
                        <TextField id="standard-basic" margin="dense" fullWidth label="Salary" name="salary" variant="standard" value={data.salary} onChange={(e) => handleChange(e)} />
                        <LoadingButton
                            className="button"
                            color="secondary"
                            onClick={saveTeacher}
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                        >
                            <span>{data.id ? "Update Teacher" : "Save Teacher"}</span>
                        </LoadingButton>
                    </Box>
                </Modal>
            </div>
            <Modal
                keepMounted
                open={openMessage}
                onClose={handleCloseMessage}
            >
                <Box sx={styleMessage}>
                    <div className="msg">
                        <span>{msg}</span>
                    </div>
                </Box>
            </Modal>
        </>
    )
};

export default TeacherTab;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Box, Fab, Modal, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

const student = {
    id: "",
    name: "",
    email: "",
    stream: "",
    fess: ""
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

const StudentTab = () => {
    const [loading, setLoading] = React.useState(false);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [openMessage, setOpenMessage] = React.useState(false);
    const [data, setData] = React.useState(student);
    const [msg, setMsg] = React.useState();
    
    console.log("Loding",loading);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/getStudent");
        setUsers(result.data);
    }

    const saveStudent = async () => {
        await axios.post("http://localhost:8080/addStudent", data)
            .then(setLoading(false))
            .then(handleClose)
            .then(handleOpenMessage)
            .then(setMsg(data.id ? "Student Updated!" : "Student Added!"))
            .then(setData(student));
    }

    const editStudent = async (id) => {
        console.log("edit", id);
        const studentData = await axios.get(`http://localhost:8080/getStudentById/${id}`)
        setData(studentData.data);
        setOpen(true);
    }

    const deleteStudent = async (id) => {
        await axios.delete(`http://localhost:8080/deleteStudent/${id}`)
            .then(handleOpenMessage)
            .then(setMsg("Student Deleted!"));
        loadUsers();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        });
    }
    console.log(data);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenMessage = () => setOpenMessage(true);
    const handleCloseMessage = () => setOpenMessage(false);

    useEffect(() => {
        loadUsers();
    }, [open]);

    return (
        <>
            <div className="container" style={{ height: "450px" }}>
                <h4>Students Data</h4>
                <div className="py-2 table-container">
                    <Table responsive style={{ color: "white", maxHeight: "100%", overflow: "auto" }}>
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Stream</th>
                                <th>Fess</th>
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
                                        <td>{data.stream}</td>
                                        <td>{data.fess}</td>
                                        <td>
                                            <Fab color="secondary" aria-label="edit" size='medium' onClick={() => editStudent(data.id)}>
                                                <EditIcon />
                                            </Fab>
                                            <Fab className='m-2' color="error" size='medium' ria-label="add" onClick={() => deleteStudent(data.id)}>
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
                        <h1 style={{ textAlign: "center" }}>{data.id ? "Update Student" : "Add Student"}</h1>
                        <TextField id="standard-basic" label="Name" fullWidth name="name" variant="standard" value={data.name} onChange={(e) => handleChange(e)} />
                        <TextField id="standard-basic" margin="dense" fullWidth label="Email" name="email" variant="standard" value={data.email} onChange={(e) => handleChange(e)} />
                        <TextField id="standard-basic" margin="dense" fullWidth label="Stream" name="stream" variant="standard" value={data.stream} onChange={(e) => handleChange(e)} />
                        <TextField id="standard-basic" margin="dense" fullWidth label="Fess" name="fess" variant="standard" value={data.fess} onChange={(e) => handleChange(e)} />
                        <LoadingButton
                            className="button"
                            color="secondary"
                            onClick={()=>{setLoading(true);saveStudent()}}
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                        >
                            <span>{data.id ? "Update Student" : "Save Student"}</span>
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

export default StudentTab;
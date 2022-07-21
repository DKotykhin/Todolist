import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import { removeUser } from "store/userSlice";
import { GetLogout } from "api/userrequests";
import { selectUser } from "store/selectors";

import "./style.scss";

const settings = ["Profile", "Change password", "Logout"];

const NavBar = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { userdata } = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const username = userdata.token ? userdata.user.name : "";

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const Logout = () => {
        GetLogout(userdata.token)
            .then(function (response) {
                // console.log('Logout response', response)
                dispatch(removeUser());
                navigate("/login");
                localStorage.removeItem("rememberMe");
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    };

    const handleSettingMenu = (e) => {
        switch (e) {
            case "Profile":
                navigate("/profile");
                break;
            case "Change password":
                navigate("/password");
                break;
            case "Logout":
                Logout();
                break;
            default:
                navigate("/login");
        }
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl" className="navbar">
                <Toolbar disableGutters>
                    <AssignmentTurnedInIcon sx={{ mr: 1 }} />
                    <Typography
                        component={RouterLink}
                        to="/"
                        className="link_text"
                    >
                        TodoList
                    </Typography>
                    <Typography sx={{ mr: 3 }}>{username}</Typography>
                    {username && (
                        <Box>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        alt={username || "TodoList"}
                                        src={`https://api-nodejs-todolist.herokuapp.com/user/${userdata.user._id}/avatar`}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <Box
                                    sx={{ display: "block" }}
                                    onClick={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <Typography
                                            key={setting}
                                            sx={{
                                                padding: "5px 15px",
                                                cursor: "pointer",
                                                color: '#808080',
                                                ":hover": {color: '#2b2b2b'}
                                            }}
                                            onClick={() =>
                                                handleSettingMenu(setting)
                                            }
                                        >
                                            {setting}
                                        </Typography>
                                    ))}
                                </Box>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;

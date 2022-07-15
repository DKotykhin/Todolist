import { useEffect, useState } from "react";
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
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import { removeUser } from "store/userSlice";
import { GetAvatar } from "api/userrequests";

import "./style.scss";

const settings = ["Profile", "Change password", "Logout"];

const NavBar = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const { userdata } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const username = userdata.token ? userdata.user.name : "";
    const userid = userdata.token ? userdata.user._id : "";

    useEffect(() => {
        if (userid) {
            GetAvatar(userid)
                .then(response => {
                    // console.log(response.data)
                    setAvatar(response.data);
                })
                .catch(function (error) {
                    console.log(error.message);
                });
        }
    }, [userid]);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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
                dispatch(removeUser());
                navigate("/login");
                break;
            default:
                navigate("/login");
        }
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl" className="navbar">
                <Toolbar disableGutters>
                    <AssignmentTurnedInIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
                    <Typography
                        component={RouterLink}
                        to="/"
                        className="link_text"
                        sx={{
                            display: { xs: "none", md: "flex" },
                            flexGrow: 1,
                        }}
                    >
                        TodoList
                    </Typography>
                    <AssignmentTurnedInIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        component={RouterLink}
                        to="/"
                        className="link_text"
                        sx={{
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                        }}
                    >
                        TodoList
                    </Typography>
                    <Typography sx={{ mr: 3 }}>{username}</Typography>
                    {username && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        alt={username || "TodoList"}
                                        src={avatar}
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
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={handleCloseUserMenu}
                                    >
                                        <Typography
                                            textAlign="center"
                                            onClick={() =>
                                                handleSettingMenu(setting)
                                            }
                                        >
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;

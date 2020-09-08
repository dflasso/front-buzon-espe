import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectionItemAction } from '../../redux/actions/resourcesActions';
import { makeStyles } from '@material-ui/core/styles';
import {
    IconButton, SwipeableDrawer, List, ListItem, ListItemIcon,
    ListItemText,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';
import DraftsIcon from '@material-ui/icons/Drafts';
import AssignmentIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles(theme => ({
    list: {
        width: 250,
        color: 'rgba(0,83,28,1)'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

export default function SwipeableTemporaryDrawer() {
    const classes = useStyles();
    const [openMenu, setOpenMenu] = useState(false);
    const dispatch = useDispatch();
    const resources = useSelector(state => state.resources.items);

    const selectionItem = itemSelected => dispatch(selectionItemAction(itemSelected));

    const handleOpenMenu = () => {
        setOpenMenu(true);
    }

    const handleCloseMenu = () => {
        setOpenMenu(false);
    }

    const handleSelectionItem = item => {
        selectionItem(item);
        setOpenMenu(false);
    }

    const RenderIconItemMenu = (idItem) => {
        switch (idItem) {
            case "Inicio":
                return <HomeIcon style={{ color: 'rgba(0,83,28,1)' }} />;
            case "Sugerencias":
                return <DraftsIcon style={{ color: 'rgba(0,83,28,1)' }} />;
            case "Denuncias":
                return <EmailIcon style={{ color: 'rgba(0,83,28,1)' }} />;
            case "Admin. Denuncias": case "Admin. Sugerencias":
                return <AssignmentIcon style={{ color: 'rgba(0,83,28,1)' }} />;
            default:
                return null;
        }
    }

    const list = () => {
        const itemsMenu = resources.sort((a, b) => b.idResource - a.idResource);
        return (
            <div
                className={classes.list}
                onClick={handleOpenMenu}
                onKeyDown={handleCloseMenu}
            >
                <List>
                    {
                        itemsMenu.map(item => (
                            <ListItem button key={item.idResource} onClick={() => handleSelectionItem(item)}>
                                <ListItemIcon>{RenderIconItemMenu(item.name)}</ListItemIcon>
                                <ListItemText primary={item.name} color="rgba(0,83,28,1)" />
                            </ListItem>
                        ))
                    }

                </List>
            </div>);
    };

    return (
        <div>
            <React.Fragment >
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                    onClick={handleOpenMenu} >
                    <MenuIcon style={{ color: 'rgba(0,83,28,1)' }} />
                </IconButton>

                <SwipeableDrawer
                    anchor="left"
                    open={openMenu}
                    onClose={handleCloseMenu}
                    onOpen={handleOpenMenu}
                >
                    {list()}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}

import React from'react'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

export default function TodoAppBar() {
    return (
        <AppBar position="static">
            <ToolBar>
                <Typography variant="h6">RPC TODO App</Typography>
            </ToolBar>
        </AppBar>
    );
}
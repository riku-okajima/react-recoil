import React, { useState } from 'react'
import { Box, Button, createStyles, Fab, makeStyles, Theme, Typography } from '@material-ui/core'
import RegisterDialog from './RegisterDialog';
import { useRecoilValue } from 'recoil';
import { tasksState } from '../atmos/Tasks';
import TodoTable from './TodoTable';
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        button: {
         '&:hover': {
             backgroundColor: '#6666ff'
         }   
        },
        fab: {
            position: 'absolute',
            bottom: '2rem',
            right: '2rem',
            '&:hover': {
                backgroundColor: '#6666ff'
            }
        }
    })
);

export default function TodoList() {
    const classes = useStyles();
    
    const tasks = useRecoilValue(tasksState);
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Box padding="2rem" textAlign="center">
                {/* 三項演算子でタスクの存在有無で画面表示を切り分け */}
                {tasks.length !== 0 ? (
                    <>
                        <TodoTable />
                        <Fab
                            className={classes.fab}
                            onClick={handleOpen}
                            color="primary"
                            aria-label="add"
                        >
                            <AddIcon />
                        </Fab>
                    </>
                ) : (
                    <>
                        <Typography variant="subtitle1" gutterBottom>
                            登録されたタスクはありません
                        </Typography>
                        <Button
                            className={classes.button}
                            onClick={handleOpen}
                            variant="contained"
                            color="primary"
                        >
                            タスクを登録する
                        </Button>
                    </>
                    )
                }
            </Box>
            <RegisterDialog open={open} onClose={handleClose} />
        </>
    );
}
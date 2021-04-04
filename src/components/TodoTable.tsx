import React, { useState } from "react";
import { Checkbox, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { tasksState } from "../atmos/Tasks";
import { format } from "date-fns";
import DeleteIcon from "@material-ui/icons/Delete"

const sortTasks = (
    arr: { content: string; deadline: any; priority: number }[],
    sortBy: 'deadline' | 'priority',
    order: 'asc' | 'desc'
) => arr.sort(
    (
        a: {content: string; deadline: any; priority: number},
        b: {content: string; deadline: any; priority: number}
    ) => (order === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy])
);

export default function TodoTable() {
    const [tasks, setTasks] = useRecoilState(tasksState);
    const [selected, setSelected] = useState<number[]>([]);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<'deadline' | 'priority' | ''>('');

    const handleSort = (sortBy: 'deadline' | 'priority') => (e: React.MouseEvent) => {
        let newOrder: 'asc' | 'desc' =
            orderBy === sortBy ? (order === 'asc' ? 'desc' : 'asc') : 'asc';
            setOrderBy(sortBy);
            setOrder(newOrder);
            setTasks(sortTasks(tasks.concat(), sortBy, newOrder));
    };

    // 全選択
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelected([...Array(tasks.length).keys()]);
            return;
        }
        setSelected([]);
    }

    // 特定のタスクの選択
    const handleCheck =(e:React.ChangeEvent<HTMLInputElement>,i: number) => {
        const selectedIndex = selected.indexOf(i);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, i);
        }　else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    }

    // 選択したタスクの削除
    const handleDelete = () => {
        let newTasks = tasks.filter(
            (e: object, i: number) => selected.indexOf(i) === -1
        );
        setTasks(newTasks);
        setSelected([]);
    }
    return(
        <>
            <IconButton
                onClick={handleDelete}
                disabled={selected.length === 0}
                aria-label="delete"
                >
                <DeleteIcon />
            </IconButton>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={tasks.length > 0 && tasks.length === selected.length}
                                    onChange={handleSelectAll}
                                />
                            </TableCell>
                            <TableCell>タスク</TableCell>
                            <TableCell align="center">
                                <TableSortLabel
                                    active={orderBy === 'deadline'}
                                    direction={order === 'asc' ? 'asc' : 'desc'}
                                    onClick={handleSort('deadline')}
                                >
                                    期日
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">
                                <TableSortLabel
                                    active={orderBy === 'priority'}
                                    direction={order === 'asc' ?  'asc' : 'desc'}
                                    onClick={handleSort('priority')}
                                >
                                    優先度
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task: any,index: number) => (
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selected.indexOf(index) !== -1}
                                        onChange={(e: any) => handleCheck(e, index)}
                                    />
                                </TableCell>
                                <TableCell>{task.content}</TableCell>
                                <TableCell align="center">
                                    {/* 形式を指定して表示 */}
                                    {format(task.deadline, 'yyyy/MM/dd')}
                                </TableCell>
                                <TableCell align="center">{task.priority}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
import React from 'react'
import { useRecoilState,  useSetRecoilState } from 'recoil'
import { taskContentState, taskDeadlineState, taskPriorityState } from '../atmos/RegisterDialogContent'
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import { DialogContent, DialogContentText, Grid, Input, Slider, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'

export default function RegisterDialogContent() {
    const setContent = useSetRecoilState(taskContentState);
    const [deadline, setDeadline] = useRecoilState(taskDeadlineState);
    const [priority, setPriority] = useRecoilState(taskPriorityState);

    // タスクの内容が変更された時に発火
    const handleContentChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setContent(e.target.value)
    };

    const handleDeadlineChange = (date: any) => {
        setDeadline(date);
    }

    const handleSliderChange = (e: React.ChangeEvent<{}>, newValue: any) => {
        setPriority(newValue);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPriority(Number(e.target.value));
    }

    const handleBlur = () => {
        if(priority < 1) {
            setPriority(1);
        } else if (priority > 5) {
            setPriority(5);
        }
    }

    return (
        // このタグ内にある部分が　pickers のカバーする範囲
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DialogContent>
                <DialogContentText>
                    登録するタスクの情報を入力してください
                </DialogContentText>
                <Grid container spacing={6} direction="column">
                    <Grid item>
                        <TextField
                            onChange={handleContentChange}
                            margin="dense"
                            id="name"
                            label="内容"
                            // 横幅いっぱいにする
                            fullWidth
                        />
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="yyyy/MM/dd"
                            minDate={new Date()}
                            margin="normal"
                            id="date-picker-inline"
                            label="期限"
                            value={deadline}
                            onChange={ date => handleDeadlineChange(date)}
                            invalidDateMessage="無効な形式です"
                            minDateMessage="昨日以前の日付は指定できません"
                        />
                    </Grid>
                    <Grid container item spacing={2}>
                        <Grid item xs={2}>
                            <DialogContentText>優先度</DialogContentText>
                        </Grid>
                        <Grid item xs={8}>
                            <Slider
                                value={priority}
                                onChange={handleSliderChange}
                                // デフォルト値
                                defaultValue={1}
                                aria-valuetext=""
                                aria-labelledby="discrete-slider"
                                // 数字の吹き出し表示
                                valueLabelDisplay="on"
                                // 変動幅
                                step={1}
                                // 境界に印
                                marks     
                                // 最小値
                                min={1}  
                                // 最大値 
                                max={5}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Input
                                value={priority}
                                margin="dense"
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                inputProps={{
                                    step: 1,
                                    min: 1,
                                    max: 5,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider'
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
        </MuiPickersUtilsProvider>
    )
}
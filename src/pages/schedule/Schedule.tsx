import { Add } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Badge, BadgeProps, Calendar } from "antd"
import { Dayjs } from "dayjs";

const getListData = (value: Dayjs) => {
    let listData;
    switch (value.date()) {
        case 25:
            listData = [
                {
                    startDate: '09h:30',
                    endDate: '10h:00',
                    patientsName: 'Gabriel Furlan Fogaça',
                    type: 'warning'
                }
            ]
            break;
        case 10:
            listData = [
                {
                    startDate: '14h:30',
                    endDate: '15h:00',
                    patientsName: 'Tiago da Silva',
                    type: 'success'
                }
            ];
            break;
        case 15:
            listData = [
                {
                    startDate: '08h:30',
                    endDate: '09h:00',
                    patientsName: 'Dionatan Tietzmann',
                    type: 'error'
                }
            ];
            break;
        default:
    }
    return listData || [];
};

export const Schedule = () => {
    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {listData.map((item) => (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{item.startDate} - {item.endDate}</span>
                            <span><Badge status={item.type as BadgeProps['status']} /></span>
                        </Box>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>{item.patientsName}</Typography>
                    </>
                ))}
            </ul>
        );
    };

    const getMonthData = (value: Dayjs) => {
        if (value.month() === 8) {
            return 1394;
        }
    }

    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }


    return (
        <>
            <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Agenda</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add sx={{ color: 'white' }} />}
                    size="small"
                    sx={{ textTransform: 'none', fontWeight: 600, color: 'white' }}
                >
                    Adicionar
                </Button>
            </Box>
            <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
        </>
    )
}

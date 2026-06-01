import { Box } from "@mui/material";
import PageTitle from "../../components/PageTitle";
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import PageDivider from "../../components/PageDivider";

function Movements() {

    return (
        <Box>
            <PageTitle text="Histórico de Movimentações" icon={HistoryRoundedIcon} />
            <PageDivider />
        </Box>
    )

}

export default Movements;
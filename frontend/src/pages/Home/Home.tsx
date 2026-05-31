import { Box } from "@mui/material";
import PageTitle from "../../components/PageTitle";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

function Home() {

    return (
        <Box>
            <PageTitle text="Bem-vindo, usuário!" icon={HomeRoundedIcon} />
        </Box>
    )

}

export default Home;
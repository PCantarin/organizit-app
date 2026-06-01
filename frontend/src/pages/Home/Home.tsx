import { Box } from "@mui/material";
import PageTitle from "../../components/PageTitle";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { getUserFirstName } from "../../services/userService";

function Home() {

    return (
        <Box>
            <PageTitle text={`Bem-vindo, ${getUserFirstName()}!`} icon={HomeRoundedIcon} />
        </Box>
    )

}

export default Home;
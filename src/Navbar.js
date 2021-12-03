import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/system";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const StyledNav = styled(AppBar)`
  background-color: rgba(0, 0, 0, 0);
  box-shadow: none;
  color: black;
`;

export default function ButtonAppBar(props) {
  const { musicConnected, autoScroll, setAutoScroll } = props;
  
  function toggleAutoScroll() {
    setAutoScroll(!autoScroll);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledNav position="fixed">
        <Toolbar>
          <h1 className="app_logo">Tabify</h1>
          <img src="tabify_logo.png" />
          {musicConnected && (
            <FormGroup>
              <FormControlLabel
                onChange={toggleAutoScroll}
                control={<Switch />}
                checked={autoScroll}
                label="Autoscroll"
              />
            </FormGroup>
          )}
        </Toolbar>
      </StyledNav>
    </Box>
  );
}

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Switch from "@mui/material/Switch";
import Icon from "./Icon";

const THEME = createTheme({
  typography: {
    fontFamily: ` source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace`,
  },
});

const StyledNav = styled(AppBar)`
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: none;
  color: black;
`;

const StyledSwitch = styled(Switch)`
  color: "#1db954";
`;

const StyledForm = styled(FormGroup)`
  position: absolute;
  top: 10px;
  right: 60px;
`;

export default function ButtonAppBar(props) {
  const { musicConnected, autoScroll, setAutoScroll } = props;

  function toggleAutoScroll() {
    setAutoScroll(!autoScroll);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledNav>
        <Toolbar>
          <h1 className="app_logo">Tabify</h1>
          <Icon />
          {musicConnected && (
            <StyledForm>
              <MuiThemeProvider theme={THEME}>
                <FormControlLabel
                  onChange={toggleAutoScroll}
                  control={<Switch color="success" />}
                  checked={autoScroll}
                  label=""
                />
                <div>Autoscroll</div>
              </MuiThemeProvider>
            </StyledForm>
          )}
        </Toolbar>
      </StyledNav>
    </Box>
  );
}

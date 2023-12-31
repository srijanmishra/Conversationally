import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
  const { logout } = useAuth0();

  const onClick = () =>
    logout({
      logoutParams: { returnTo: window.location.origin + "/Conversationally" },
    })

  return (
    <div style={{margin: "5px"}}>
        <Button onClick={onClick} variant="text" size="large" color="secondary">
            <div style={{fontSize: "14px"}}>
                Logout
            </div>
            <LogoutIcon style={{fontSize: "16px", marginLeft: "10px"}} />
        </Button>
    </div>
  );
};

export default LogoutButton;

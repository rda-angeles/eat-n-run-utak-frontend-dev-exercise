import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";

import FastfoodIcon from "@mui/icons-material/Fastfood";

const DrawerItem = () => {
  return (
    <div className="bg-c-secondary text-white h-full  shadow-none">
      <div className="flex items-center flex-col p-4">
        <FastfoodIcon
          sx={{ color: "#fff", fontSize: 80, marginBottom: "1rem" }}
        />
        <h1 className="text-3xl pt-1 font-bold ml-1">Eat-n-Run</h1>
      </div>
      <Divider />
      <List>
        {["Sales"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
};

export default DrawerItem;

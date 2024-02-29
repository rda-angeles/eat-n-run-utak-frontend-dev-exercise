import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
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

      <Divider />
      <List sx={{ marginTop: "2rem" }}>
        {["Dashbooard"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <h1 className="font-bold text-md">{text}</h1>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DrawerItem;

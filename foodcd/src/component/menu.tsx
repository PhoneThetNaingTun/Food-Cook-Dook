import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./menu.css";
import { MenuTwoTone } from "@mui/icons-material";

interface Menus {
  id: number;
  name: string;
  price: number;
}

const Menu = () => {
  const [menus, setMenus] = useState<Menus[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [newMenu, setNewMenu] = useState({ name: "", price: 0 });
  useEffect(() => {
    getMenus();
  }, []);
  const getMenus = async () => {
    const response = await fetch("http://localhost:5000/menus");
    const data = await response.json();
    setMenus(data);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const setNewMenus = async () => {
    await fetch("http://localhost:5000/menus", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newMenu),
    });
    setOpen(false);
  };
  const deleteMenu = async (key: number) => {
    await fetch("http://localhost:5000/menus", {
      method: "DELETE",
      body: JSON.stringify(key),
    });
  };
  return (
    <div className="menuMainContainer">
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", padding: "30px" }}
      >
        <Button variant="contained" onClick={handleClick}>
          Creat Menu
        </Button>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "50px",
        }}
      >
        {menus.map((items) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                width: "200px",
                height: "200px",
                borderRight: "3px solid rgb(83,88,253)",
                borderBottom: "3px solid rgb(83,88,253)",
              }}
              key={items.id}
            >
              <Typography variant="h4">{items.name}</Typography>
              <Typography variant="h4">{items.price}</Typography>
              <Box>
                <Button variant="contained" sx={{ margin: "5px" }}>
                  Edit
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "red", m: "5px" }}
                  onClick={() => deleteMenu(items.id)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          );
        })}
        <Dialog onClose={() => setOpen(false)} open={open}>
          <DialogTitle>Create New Menu</DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              variant="outlined"
              label="name"
              sx={{ mb: "20px", mt: "20px" }}
              onChange={(event) => {
                setNewMenu({ ...newMenu, name: event.target.value });
              }}
            ></TextField>
            <TextField
              variant="outlined"
              label="password"
              sx={{ mb: "20px" }}
              type="number"
              onChange={(event) => {
                setNewMenu({ ...newMenu, price: Number(event.target.value) });
              }}
            ></TextField>
            <DialogActions>
              <Button variant="contained" onClick={setNewMenus}>
                Create
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Box>
    </div>
  );
};

export default Menu;

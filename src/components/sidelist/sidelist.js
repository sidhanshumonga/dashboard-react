import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import "./sidelist.css"

export default function SideList(props) {
  const [checked, setChecked] = React.useState(props.data);
  const [type, settype] = React.useState(props.type);
  const [clicked, setClicked] = React.useState(false);
  const data = props.data;
  const handleToggle = (value) => () => {
    setClicked(true);
    const currentIndex = checked.findIndex((i) => i.id === value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.onSelect(newChecked);
    setClicked(false);
  };

  React.useEffect(() => {
    if (type !== props.type) {
      setChecked(props.data);
    }
  }, [props.type]);

  return (
    <div
      style={{
        border: "1px solid #008dc9",
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 6,
      }}
    >
      <div className="p-2" style={{ background: "#008dc9", color: "white" }}>
        {props.type}
      </div>
      <List
        style={{
          height: "250px",
          overflow: "auto",
        }}
      >
        {props.data.map((value, index) => {
          return (
            <ListItem
              key={index}
              role={undefined}
              dense
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  inputProps={{ "aria-label": "primary checkbox" }}
                  disableRipple
                  checked={checked.findIndex((j) => j.id === value.id) !== -1}
                />
              </ListItemIcon>
              {value.name}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

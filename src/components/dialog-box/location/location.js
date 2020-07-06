import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function Location(props) {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = React.useState("");

  const updateNode = (e, v) => {
    setSelectedItem(v);
    props.onSelect(v);
  };

  return (
    <TreeView
      {...props}
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      selected={selectedItem}
      onNodeSelect={updateNode}
    >
      <TreeItem nodeId="Applications" label="Applications">
        <TreeItem nodeId="Calendar" label="Calendar" />
        <TreeItem nodeId="Chrome" label="Chrome" />
        <TreeItem nodeId="Webstorm" label="Webstorm" />
      </TreeItem>
      <TreeItem nodeId="Documents" label="Documents">
        <TreeItem nodeId="OSS" label="OSS" />
        <TreeItem nodeId="Material" label="Material-UI">
          <TreeItem nodeId="src" label="src">
            <TreeItem nodeId="index" label="index.js" />
            <TreeItem nodeId="tree" label="tree-view.js" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
}

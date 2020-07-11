import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import './location.css';

const useStyles = makeStyles({
  root: {
    height: 350,
    flexGrow: 1,
    maxWidth: 400,
  },
  selected: {
    content : {
      background: 'blue'
    }
  }
});

const renderTree = (nodes, func, classes) => (
  <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onLabelClick={(e) => func(e, nodes)} classes={{selected: classes.selected}}>
    {Array.isArray(nodes.children)
      ? nodes.children.map((node) => renderTree(node, func, classes))
      : null}
  </TreeItem>
);

export default function Location(props) {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = React.useState({});

  const updateNode = (e,v) => {
    e.preventDefault()
    setSelectedItem(v);
    props.onSelect(v);
  }
 

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(props.tree, updateNode, classes)}
    </TreeView>
  );
}

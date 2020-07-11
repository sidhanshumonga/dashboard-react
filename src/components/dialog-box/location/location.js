import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import * as urls from "../../../urls.js";

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const renderTree = (nodes, func) => (
  <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onLabelClick={(e) => func(e, nodes)}>
    {Array.isArray(nodes.children)
      ? nodes.children.map((node) => renderTree(node, func))
      : null}
  </TreeItem>
);

export default function Location(props) {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = React.useState({});
  const [tree, setData] = React.useState({});

  const updateNode = (e,v) => {
    e.preventDefault()
    setSelectedItem(v);
    props.onSelect(v);
  }
  React.useEffect(() => {
    (async () => {
      const response = await fetch(urls.orgunits);
      const result = await response.json();
      const tree = result.organisationUnits.filter((ou) => ou.level === 1)[0];
      setData(tree);
    })();
  }, []);

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(tree, updateNode)}
    </TreeView>
  );
}

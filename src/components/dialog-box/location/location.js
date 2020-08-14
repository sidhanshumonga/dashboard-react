import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import "./location.css";
import ReactDOM from "react-dom";

const useStyles = makeStyles({
  root: {
    height: 350,
    flexGrow: 1,
    maxWidth: 400,
  },
  selected: {
    content: {
      background: "red",
    },
  },
});

const renderTree = (nodes, func, classes, inputEl) => (
  <TreeItem
    key={nodes.id}
    nodeId={nodes.id}
    label={nodes.name}
    ref={(ref) => inputEl.current.push({ id: nodes.id, ref: ref })}
    onLabelClick={(e) => func(e, nodes)}
  >
    {Array.isArray(nodes.children)
      ? nodes.children.map((node) => renderTree(node, func, classes, inputEl))
      : null}
  </TreeItem>
);

export default function Location(props) {
  const inputEl = React.useRef([]);
  const classes = useStyles();
  const [selectedItems, setSelectedItems] = React.useState([]);

  const updateNode = (e, v) => {
    e.preventDefault();
    let prevArr = selectedItems;
    var node = ReactDOM.findDOMNode(
      inputEl.current.filter((x) => x.id === v.id)[0].ref
    );
    if (prevArr.indexOf(v.id) === -1) {
      prevArr.push(v.id);
      node.classList.add("Mui-selected");
    } else {
      prevArr.splice(prevArr.indexOf(v.id), 1);
      node.classList.remove("Mui-selected");
    }
    setSelectedItems(prevArr);
    props.onSelect(prevArr);
  };

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
      selected={props.selected}
    >
      {renderTree(props.tree, updateNode, classes, inputEl)}
    </TreeView>
  );
}

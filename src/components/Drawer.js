import Backup from '@material-ui/icons/Backup';
import Delete from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import History from '@material-ui/icons/History';
import Label from '@material-ui/icons/Label';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MuiDrawer from '@material-ui/core/Drawer';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Print from '@material-ui/icons/Print';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Toolbar from '@material-ui/core/Toolbar';

export default function Drawer(props) {
  return (
    <MuiDrawer {...props} variant="permanent">
      <Toolbar />
      <List>
        <ListItem>
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          <ListItemText>Add New</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <History />
          </ListItemIcon>
          <ListItemText>Recently Added</ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <Label />
          </ListItemIcon>
          <ListItemText>Baptisms</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Label />
          </ListItemIcon>
          <ListItemText>Communions</ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <SaveAlt />
          </ListItemIcon>
          <ListItemText>Import</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Backup />
          </ListItemIcon>
          <ListItemText>Export</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Print />
          </ListItemIcon>
          <ListItemText>Print Certificates</ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>Deleted</ListItemText>
        </ListItem>
      </List>
    </MuiDrawer>
  );
}

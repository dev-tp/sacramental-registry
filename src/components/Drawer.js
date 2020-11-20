import { connect } from 'react-redux';
import Backup from '@material-ui/icons/Backup';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Group from '@material-ui/icons/Group';
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

import { openForm } from '../actions';

function Drawer({ className, classes, dispatch }) {
  return (
    <MuiDrawer className={className} classes={classes} variant="permanent">
      <Toolbar />
      <List>
        <ListItem>
          <Button
            color="primary"
            fullWidth
            onClick={() => dispatch(openForm())}
            startIcon={<PersonAdd />}
            variant="outlined"
          >
            Add
          </Button>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText>Registry</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <History />
          </ListItemIcon>
          <ListItemText>Recently Added</ListItemText>
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <Label />
          </ListItemIcon>
          <ListItemText>Baptisms</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Label />
          </ListItemIcon>
          <ListItemText>Communions</ListItemText>
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <SaveAlt />
          </ListItemIcon>
          <ListItemText>Import</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Backup />
          </ListItemIcon>
          <ListItemText>Export</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Print />
          </ListItemIcon>
          <ListItemText>Print Certificates</ListItemText>
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>Deleted</ListItemText>
        </ListItem>
      </List>
    </MuiDrawer>
  );
}

export default connect()(Drawer);
